#!/usr/bin/env python

import boto3
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
        venue['recommendation_count'] = int(attributes['recommendation_count'])

        venues.append(venue)
    return venues

# Updates recommendations
def update_recommendations(venues, area):
    recommendation_updated = datetime.datetime.utcnow().isoformat() + 'Z'

    for venue in venues:
        venue['recommendation_count'] += 1

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
                    'Value': recommendation_updated,
                    'Replace': True
                }
            ]
        )

        # TODO Write recommendations to S3
        print json.dumps(venue, indent=2)

def lambda_handler(event, context):
    for area in config.areas:
        venues = flatten_structures(pick_recommended_venues(area))
        update_recommendations(venues, area)

        # TODO Get venue_info and top_beers from remote


if __name__ == '__main__':
    lambda_handler({},{})
