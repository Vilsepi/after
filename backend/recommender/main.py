#!/usr/bin/env python

import boto3
import json
import datetime
import config
import random

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
    print "Final recommendations:"
    for venue in recommended_venues:
        name = venue['Name']
        attributes = venue['Attributes']
        print name
        recommendation_count = 0
        for attribute in attributes:
            if attribute['Name'] != 'json_object':
                print "  {}: {}".format(attribute['Name'], attribute['Value'])
            if attribute['Name'] == 'recommendation_count':
                recommendation_count = int(attribute['Value'])

        response = simpledb.put_attributes(
                DomainName=config.storage['table_venue'],
                ItemName=name,
                Attributes=[
                    {
                        'Name': 'recommendation_count',
                        'Value': str(recommendation_count + 1).zfill(7),
                        'Replace': True
                    },
                    {
                        'Name': 'recommendation_updated',
                        'Value': datetime.datetime.utcnow().isoformat() + 'Z',
                        'Replace': True
                    }
                ]
            )

    return recommended_venues

def lambda_handler(event, context):
    for area in config.areas:
        venues = pick_recommended_venues(area)


if __name__ == '__main__':
    lambda_handler({},{})
