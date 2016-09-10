
    aws sdb select --select-expression "select * from afterVenue" > cache.json
    ./banned.py cache.json
    ./banned.py cache.json --remove
