#!/usr/bin/env python

import boto3
import requests
import json
import datetime
from collections import defaultdict
import config
import banlist

s3 = boto3.resource('s3')
simpledb = boto3.client('sdb')

# Fetches latest checkins from a given geographical area
def get_checkins(area_id):
    print "Fetching latest checkins from remote for area " + area_id
    url = config.remote['base_url'] + '/thepub/local'
    params = {
        'client_id': config.remote['client_id'],
        'client_secret': config.remote['client_secret'],
        'lat': config.areas[area_id]['lat'],
        'lng': config.areas[area_id]['lng'],
        'radius': config.areas[area_id]['radius']
    }
    response = requests.get(url, params=params)
    print "Ratelimit remaining:", response.headers.get('x-ratelimit-remaining')

    if response.status_code == 200:
        return response.json().get('response').get('checkins').get('items')
    return []

# Removes uninteresting keys from data
def filter_checkins(checkins):
    for checkin in checkins:
        [checkin.pop(key, None) for key in ['comments', 'distance', 'toasts']]
        [checkin.get('user').pop(key, None) for key in ['is_private', 'is_supporter', 'relationship', 'bio', 'website']]
        [checkin.get('beer').pop(key, None) for key in ['beer_slug', 'beer_description', 'is_in_production', 'auth_rating', 'wish_list', 'beer_active']]
        [checkin.get('brewery').pop(key, None) for key in ['brewery_slug', 'brewery_active']]

        if checkin.get('venue'):
            [checkin.get('venue').pop(key, None) for key in ['venue_slug', 'is_verified']]
            [checkin.get('venue').get('venue_icon').pop(key, None) for key in ['sm', 'md']]
            [checkin.get('venue').get('location').pop(key, None) for key in ['venue_country']]
            [checkin.get('venue').get('contact').pop(key, None) for key in ['twitter']]

    return checkins

# Check venue categories to determine whether the venue is suitable
# Note: primary_category can be null, categories list can be empty
def recommendable_venue(venue):
    if venue.get('venue_id') in banlist.blacklisted_venues:
        print "Skipping venue {} {} as it is blacklisted".format(venue['venue_id'], venue['venue_name'])
        return False

    if venue.get('primary_category','') not in banlist.whitelisted_venue_primary_categories:
        print "Skipping venue {} {} as its primary category is {}".format(venue['venue_id'], venue['venue_name'], venue.get('primary_category',''))
        return False

    venueset = set([item['category_name'] for item in venue['categories']['items']])
    blacklisted = venueset.intersection(banlist.blacklisted_venue_secondary_categories)
    whitelisted = venueset.intersection(banlist.whitelisted_venue_secondary_categories)

    if blacklisted and not whitelisted:
        print "Skipping venue {} {}, blacklisted {}".format(venue['venue_id'], venue['venue_name'], blacklisted)
        return False
    elif blacklisted and whitelisted:
        print "Forgiving venue {} {}, whitelisted {}, blacklisted {}".format(venue['venue_id'], venue['venue_name'], whitelisted, blacklisted)
    return True

# Writes items to SimpleDB
def simpledb_put(items, domain, area_id):
    for item_id, item in items.iteritems():
        json_object = json.dumps(item)
        response = simpledb.put_attributes(
            DomainName=domain,
            ItemName=str(item_id),
            Attributes=[
                {
                    'Name': 'json_object',
                    'Value': json_object,
                    'Replace': True
                },
                {
                    'Name': 'json_length',
                    'Value': str(len(json_object)).zfill(5),
                    'Replace': True
                },
                {
                    'Name': 'json_updated',
                    'Value': datetime.datetime.utcnow().isoformat() + 'Z',
                    'Replace': True
                },
                {
                    'Name': 'area',
                    'Value': str(area_id),
                    'Replace': True
                }
            ]
        )
        if response['ResponseMetadata']['HTTPStatusCode'] != 200:
            print "Error while storing object to SimpleDB:", response

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
        checkins = filter_checkins(get_checkins(area_id))
        venues = defaultdict(dict)
        beers = defaultdict(dict)

        for checkin in checkins:
            venue = checkin.get('venue')
            if venue and recommendable_venue(venue):
                venues[venue.get('venue_id')] = venue
            beers[checkin.get('beer').get('bid')] = checkin.get('beer')

        save_checkins_to_s3(checkins, area_id)

        simpledb_put(beers, config.storage['table_beer'], area_id)
        simpledb_put(venues, config.storage['table_venue'], area_id)


if __name__ == '__main__':
    lambda_handler({},{})
