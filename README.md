
# # Dynamic webmap for World for Climate on Mapbox


We use [Mapbox](https://www.mapbox.com/showcase) to show the data on the map in dynamic way.

Mapbox is a location data platform that powers the maps and location services used in many popular apps. 

- One of the powerful tools of mapbox is that it includes a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles called [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) and [Mapbox Studio](https://studio.mapbox.com) which enables us to do :
-  Visualizing and animating geographic data.
-  Easy to use and there is no system dependency. Easy to run and perform changes for the data on the map in various platforms (e.g. Andriod , IOS and Web) synchronously.
-  Querying and filtering features on a map.
-  Placing the data between layers of a Mapbox style.
-  Dynamically displaying and styling custom client-side data on a map.
-  Doing 3D data visualizations and animations
-  Adding markers and popups to maps programmatically.

The database for the visualized data to be stored in GeoJSON format and stored in WFC Datacenter, The GeoJSON document must be on the same domain or accessible using [CORS](https://enable-cors.org/server.html).

We use tools like [geojson-pick](https://github.com/node-geojson/geojson-pick) to remove unused properties and [geojson-precision](https://github.com/perrygeo/geojson-precision) to limit the number of decimal places for coordinates, also to reduce the size of the datafile. Not only is the file much smaller, but the map rendering will be noticeably quicker and smoother.


- ⚠️ Mapbox has a limit for using the platform depends on the data size and how many active users using the map monthly. Up to 25000 active user monthly is free, afterwards an subscription agreement should be done. The [Pricelist](https://www.mapbox.com/pricing) shows all cases in detail.


## Setup

- git pull on the branch main for WFC_map.

The code will start to show the map index directly based on the [token](https://docs.mapbox.com/help/getting-started/access-tokens/) which enables the map to connect with the data stored in mapbox platform.
