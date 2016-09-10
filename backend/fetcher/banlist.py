
whitelisted_venue_primary_categories = [
    'Arts & Entertainment',
    'Food',
    'Nightlife Spot'
]

whitelisted_venue_secondary_categories = [
    'Bar',
    'Beach Bar',
    'Beer Bar',
    'Beer Garden',
    'Cocktail Bar',
    'Hotel Bar',
    'Nightclub',
    'Pub',
    'Whisky Bar',
    'Wine Bar'
]

blacklisted_venue_secondary_categories = [
    'Auditorium',
    'Arcade',
    'Baby Store',
    'Bakery',
    'Basketball Court',
    'Bath House',
    'Beach',
    'Boat or Ferry',
    'Building',
    'Bus Line',
    'Church',
    'City',
    'College Residence Hall',
    'Conference Room',
    'Convention Center',
    'Country',
    'Coworking Space',
    'Dance Studio',
    'Field',
    'Flea Market',
    'Fraternity House',
    'Grocery Store',
    'Gym',
    'Gym / Fitness Center',
    'Gym Pool',
    'Harbor / Marina',
    'Home (private)',
    'Hostel',
    'Hot Spring',
    'Hotel',
    'Island',
    'Lawyer',
    'Medical Center',
    'Mini Golf',
    'Monument / Landmark',
    'Moving Target',
    'Music Festival',
    'Nail Salon',
    'Neighborhood',
    'Office',
    'Park',
    'Parking',
    'Playground',
    'Plaza',
    'Road',
    'Scenic Lookout',
    'Soccer Field',
    'Sorority House',
    'Spa',
    'Theater',
    'Theme Park Ride / Attraction',
    'Train Station',
    'Train',
    'Tram Station',
    'University'
]

"""
The following categories are problematic:
- 'Art Gallery' Some bars are tagged also as galleries, e.g. Cafe Bar 9
- 'Shopping Mall' Several gastropubs are located in or near malls, e.g. Gastropub Stone's
- 'Boat or Ferry' Some bars are stationary boats docked at a pier, e.g. Little Joe
"""

blacklisted_venues = [
    '5319980' # iidan bilepalatsi
]
