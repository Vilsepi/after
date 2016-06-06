#!/usr/bin/env python

import boto3
import requests
import json
import datetime
import config
import random
from collections import defaultdict

s3 = boto3.resource('s3')
simpledb = boto3.client('sdb')

MAX_COUNT = 3
RANDOMIZATION_WINDOW = 10

# Picks new recommended venues from least recommended venues
def pick_recommended_venues(area):
    print "Building recommendation for area", area
    recommended_venues = []

    venues_never_recommended = simpledb.select(
        SelectExpression="select * from {} where recommendation_count is null and area = '{}' limit {}".format(
            config.storage['table_venue'],
            area,
            RANDOMIZATION_WINDOW)
    )
    if venues_never_recommended.get('Items'):
        count = len(venues_never_recommended.get('Items'))
        print "Number of venues never recommended:", count
        recommended_venues = random.sample(venues_never_recommended.get('Items'), min(count, MAX_COUNT))

    if len(recommended_venues) < MAX_COUNT:
        print "We have {}, which is not enough. Let's rerecommend old venues".format(len(recommended_venues))
        venues_previously_recommended = simpledb.select(
            SelectExpression="select * from {} where recommendation_count is not null and area = '{}' order by recommendation_count asc limit {}".format(
                config.storage['table_venue'],
                area,
                RANDOMIZATION_WINDOW)
        )
        if venues_previously_recommended.get('Items'):
            count = len(venues_previously_recommended.get('Items'))
            print "Number of previously recommended:", count
            recommended_venues = recommended_venues + random.sample(venues_previously_recommended.get('Items'), min(count, MAX_COUNT - len(recommended_venues)))

    print "Now we have {} and we should get {}".format(len(recommended_venues), MAX_COUNT)
    return recommended_venues

# Deserializes JSON stored in SimpleDB and flattens dictionaries
def flatten_structures(simpledb_items):
    venues = []
    for item in simpledb_items:
        venue = defaultdict(dict)
        attributes = {attr['Name']:attr['Value'] for attr in item['Attributes']}

        venue = json.loads(attributes['json_object'])

        venues.append(venue)
    return venues

# Writes Python structure to S3 as JSON
def write_to_s3(key, data):
    response = s3.Bucket(config.storage['bucket_name']).put_object(
        Key=key,
        ContentType='application/json',
        Body=json.dumps(data))
    print response

# Fetches venue details
def get_detailed_venue(venue_id):
    print "Fetching venue details from remote for venue {}".format(venue_id)
    url = "{}/venue/info/{}".format(config.remote['base_url'], venue_id)
    params = {
        'client_id': config.remote['client_id'],
        'client_secret': config.remote['client_secret']
    }
    response = requests.get(url, params=params)
    print "Ratelimit remaining:", response.headers.get('x-ratelimit-remaining')

    if response.status_code == 200:
        return response.json().get('response')
    return []

# Updates recommendations
def update_recommendations(venues, area):
    recommendations_updated = datetime.datetime.utcnow().isoformat() + 'Z'

    # TODO venue objects are actually completely unnecessary. To fetch the top
    # beers of a venue, the detailed venue_info must be fetched, which contains
    # everything and more than the basic venue objects.
    detailed_venues = []
    for venue in venues:
        venue['recommendation_count'] = int(venue.get('recommendation_count', '0')) + 1
        detailed_venues.append(get_detailed_venue(venue['venue_id']))

        # Update recommendation count and timestamp in SimpleDB
        response = simpledb.put_attributes(
            DomainName=config.storage['table_venue'],
            ItemName=str(venue['venue_id']),
            Attributes=[
                {
                    'Name': 'recommendation_count',
                    'Value': str(venue['recommendation_count']).zfill(7),
                    'Replace': True
                },
                {
                    'Name': 'recommendation_updated',
                    'Value': recommendations_updated,
                    'Replace': True
                }
            ]
        )

    # Write recommendations to S3
    write_to_s3('data/recommender-venues-{}.json'.format(area),
        {
            'recommendations_updated': recommendations_updated,
            'recommendations': detailed_venues
        })

def lambda_handler(event, context):
    for area in config.areas:
        venues = flatten_structures(pick_recommended_venues(area))
        update_recommendations(venues, area)


if __name__ == '__main__':
    lambda_handler({},{})
