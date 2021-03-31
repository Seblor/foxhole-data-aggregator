# foxhole-data-aggregator

The goal of this project is to provide the aggregated foxhole's WarAPI data in a format viable for the Map web application available at https://github.com/Seblor/foxhole-war-map

## Refresh rate

Currently, the refresh rate is hardcoded in `app.js` as :

- Every 10 seconds for the dynamic data
- Every 10 minutes for the static data

This is to ensure the WarAPI is not flooded with requests, as each refresh makes one request per region, plus one for fetching the regions list.

This could be changed in the future, if there is a need.

## Setting up

Clone this repo, and install the dependencies :

```bash
clone git@github.com:Seblor/foxhole-data-aggregator.git
cd foxhole-data-aggregator
npm i #or `npm ci` if you want to keep the transitive dependencies
```

You can then set the JSON folder output in the `.env` file.

If you are using https://github.com/Seblor/foxhole-war-map, this should be set as `web-server-directory/public/data/`. If will create the files with this pattern :

```tree
./data
├── war1
│   ├── dynamic.json
│   └── static.json
└── war2
    ├── dynamic.json
    └── static.json
```

## Running

Simply get the app running with `node app.js` or

```bash
npm start
```

Keep in mind that the app is working in the foreground, so you might want to use a Screen.