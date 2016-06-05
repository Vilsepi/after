#!/usr/bin/env python

import boto3
import requests
import json
from collections import defaultdict
import config

s3 = boto3.resource('s3')

# Fetches latest checkins from a given geographical area
def get_checkins(area):
    url = config.remote['base_url'] + '/thepub/local'
    params = {
        'client_id': config.remote['client_id'],
        'client_secret': config.remote['client_secret'],
        'lat': area['lat'],
        'lng': area['lng'],
        'radius': area['radius']
    }
    result = requests.get(url, params=params)

    if result.status_code == 200:
        print "Received OK response from remote"
        return result.json().get('response').get('checkins').get('items')
    return []

# Removes uninteresting keys from data
def filter_checkins(checkins):
    for checkin in checkins:
        [checkin.pop(key, None) for key in ['comments', 'distance', 'toasts']]
        [checkin.get('user').pop(key, None) for key in ['is_private', 'is_supporter', 'relationship', 'bio', 'website']]
        [checkin.get('beer').pop(key, None) for key in ['beer_slug', 'beer_description', 'is_in_production', 'auth_rating', 'wish_list', 'beer_active']]
        [checkin.get('brewery').pop(key, None) for key in ['brewery_slug', 'brewery_active']]
        [checkin.get('venue').pop(key, None) for key in ['venue_slug', 'is_verified']]
    return checkins

# Saves checkins, venues and beers to DynamoDB
def save_all_to_dynamodb(checkins, area_id):
    pass

# Saves checkins to S3 as JSON
def save_checkins_to_s3(checkins, area_id):
    response = s3.Bucket(config.storage['bucket_name']).put_object(
        Key='data/fetcher-checkins-{}.json'.format(area_id),
        ContentType='application/json',
        Body=json.dumps(checkins))
    print response

# Lambda handler, fetches, cleans and stores checkin data
def lambda_handler(event, context):
    for area_id, area in config.areas.iteritems():
        print "Fetching latest checkins from remote for area " + area_id
        checkins = filter_checkins(get_checkins(config.areas[area_id]))
        venues = defaultdict(dict)
        beers = defaultdict(dict)

        for checkin in checkins:
            if checkin.get('venue'):
                venues[checkin.get('venue').get('venue_id')] = checkin.get('venue')
            beers[checkin.get('beer').get('bid')] = checkin.get('beer')

        save_checkins_to_s3(checkins, area_id)


if __name__ == '__main__':
    lambda_handler({},{})
