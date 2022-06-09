# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## Test users

pass: Test1234

- Users with roleId = 1

    - ncrook0@yolasite.com
    - uatterbury2@eepurl.com
    - ameeks4@gizmodo.com
    - mbauldrey6@mayoclinic.com
    - cdevennie8@hugedomains.com
    - fguidonia@archive.org
    - abonsulc@mac.com
    - jpartingtone@washington.edu
    - jgettinsg@epa.gov
    - fhorwelli@oracle.com

- Users with roleId = 2

    - mlabern1@army.mil
    - jlabrom3@tumblr.com
    - agibling5@about.com
    - ceye7@omniture.com
    - kblanchflower9@spiegel.de
    - jstillertb@eventbrite.com
    - etookd@youtu.be
    - estichelf@dagondesign.com
    - sphillpoth@reverbnation.com
    - rwraggsj@state.tx.us