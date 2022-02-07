//-- Mapbox Connection and styles --//
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FtYWxlbGRpbiIsImEiOiJja3phYXliaDgwbnNsMnVtcXZsejM4MTFjIn0.c6RmMiXJPcaz6ohxEOpUMg'; //Unique token for the map from Mapbox

//-- plugin to support right-to-left languages such as Arabic and Hebrew --//
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true 
    );
     
//--Checking if Mapbox GL JS is supported by the browser --//
if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL');
        } else {
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11', // Map-style which could be controlled from Mapbox Studio.

//mapbox://styles/gamaleldin/ckwu58hd74tai14mk5pm02d6u  // This is the customized linked to the token above.
//mapbox://styles/mapbox/satellite-v9                  // default satelite style.. other styles are availabe and could be used.

center: [55.253, 13.911], // starting veiw position for the map [lng, lat]
zoom: 1                   // starting zoom, set to 1 to have bird veiw when the map starts
},);


// Adding Geocoded Search bar
map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
    );

//  User Geo-locattion control button
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true}) 
    );
    
// Fullscreen control button
map.addControl(new mapboxgl.FullscreenControl());

// Zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
  

// https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson

// Second step after saving the data into Geojson file : Data loading and setting thier properites //
map.on('load', () => {

    map.addSource('earthquakes', {    // Data source name
        type: 'geojson',             // Data source type format 
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson', // Data url (could be loaded externally and updated synchronously from our database)
        cluster: true,             // To activate the point_count property in the data source. 
        clusterMaxZoom: 14,       // Max zoom to cluster points on
        clusterRadius: 50        // Radius of each cluster when clustering points (defaults to 50)
    });


// Clustering and Counting process for the points (The app / website active users location get from the phone):
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes', 


 // The following refers to how many points (users) to be counted as one circle on the map and the color for the circle.
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#1CFC00', // Green color if the region has less than 100 users
                100,
                '#D7D43B', // Yellow color if the region has less than 100 users
                750,
                '#D23636' // Red color if the region has less than 100 users
            ],

            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes', // Clustered Users location data list
        filter: ['has', 'point_count'],
        
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',  // Un Clustered Users location data list
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });


// inspecting the Cluster points (users location) on click

//The following database is a sample i use to explain how to deal with the GeoJson file (which parameters to use,save)
// e.g. "mag" refers to 
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        
        const clusterId = features[0].properties.cluster_id;
        map.getSource('earthquakes').getClusterExpansionZoom( // Data source : Locations list in the Geojson file.
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });


    map.on('click', 'unclustered-point', (e) => {
        
        const coordinates = e.features[0].geometry.coordinates.slice();
        const scalerank = e.features[0].properties.scalerank;  /////////  The parameter we seek in the GeoJson file : Shows specific info about the user when clicked , this info saved alongside with her/his location (e.g.How many Questions/Comments the user participated in )
    
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }


// This is the pop-up message showed when a specifc user location is ticked
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                `This Climate Actioner Contributed with ${scalerank} Comments and votes!`   //pop-up message on the user location.
            )
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });



map.on('click', 'places', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
    });
     
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
    });
    })};