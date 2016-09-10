#!/usr/bin/env python

import boto3
import json
import sys
import time

sys.path.insert(0, '../fetcher/')
import banlist
import config

simpledb = boto3.client('sdb')

def batch_remove(items):
    print "Proceeding to remove {} items".format(len(items))
    MAX_BATCH_SIZE = 25
    while items:
        response = simpledb.batch_delete_attributes(
            DomainName=config.storage['table_venue'],
            Items=items[:MAX_BATCH_SIZE]
        )
        print response
        del(items[:MAX_BATCH_SIZE])
        time.sleep(1)

def venues_specifically_blacklisted(venues, remove):
    print "Venues specifically blacklisted"

    removable_venues = []
    for venue in venues:
        if str(venue['venue_id']) in banlist.blacklisted_venues:
            print u'{:28} {:9} {:30}'.format(venue['primary_category'], venue['venue_id'], venue['venue_name'])
            removable_venues.append({'Name': str(venue['venue_id'])})
    print "Count", len(removable_venues)

    if remove:
        batch_remove(removable_venues)


def venues_with_wrong_primary_category(venues, remove):
    print "Venues with wrong primary category"

    removable_venues = []
    for venue in venues:
        if venue['primary_category'] not in banlist.whitelisted_venue_primary_categories:
            print u'{:28} {:9} {:30}'.format(venue['primary_category'], venue['venue_id'], venue['venue_name'])
            removable_venues.append({'Name': str(venue['venue_id'])})
    print "Count", len(removable_venues)

    if remove:
        batch_remove(removable_venues)

def venues_with_bad_secondary_categories(venues, remove):
    print "Venues with bad secondary categories"

    removable_venues = []
    for venue in venues:
        for category in venue['categories']['items']:
            if category['category_name'] in banlist.blacklisted_venue_secondary_categories:
                print u'{:28} {:9} {:30} {}'.format(venue['primary_category'], venue['venue_id'], venue['venue_name'], stringify_categories(venue))
                removable_venues.append({'Name': str(venue['venue_id'])})
    print "Count", len(removable_venues)

    if remove:
        batch_remove(removable_venues)

def stringify_categories(venue):
    string = ""
    categories = [cat['category_name'] for cat in venue['categories']['items']]
    for c in categories:
        string += "[" + c + ']'
    return string

def load_from_cache(cachefile):
    items = {}
    with open(sys.argv[1], 'r') as f:
        items = json.load(f).get('Items')

    venues = []
    for item in items:
        attributes = {attr['Name']:attr['Value'] for attr in item['Attributes']}
        venue = json.loads(attributes['json_object'])
        venues.append(venue)

    return venues

if __name__ == '__main__':
    remove = False
    if len(sys.argv) > 2:
        if sys.argv[2] == "--remove":
            remove = True

    cachefile = sys.argv[1]
    venues = load_from_cache(cachefile)

    venues_with_wrong_primary_category(venues, remove)
    venues_specifically_blacklisted(venues, remove)
    venues_with_bad_secondary_categories(venues, remove)
