var atlantaLat = 33.7490;
var atlantaLng = -84.3880;
var config = {
    apiKey: 'VWGK3UUZFWBGUZ45JLO2GK4JL4WP4XTL4L2HVU41DKUP5L3G',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/',
    clientSecret: 'C52E5KAHGQJAGSVTBRWAZJWBS2WOEO0EN1DAOXTDLIGWZWUV',
};

function init() {
    initMenu();
    loadData();
}

function loadData() {
    // Query foursquare API for venue recommendations near the current location. Initialize the map after the data is loaded
    $.getJSON(config.apiUrl + 'v2/venues/explore?ll=' + atlantaLat + ',' + atlantaLng + '&client_id=' + config.apiKey + '&client_secret=' + config.clientSecret + '&v=20140601', {}, function (data) {
        var locations = [];
        var venues = data.response.groups[0].items;
        for (var i = 0; i < venues.length; i++) {
            var venue = venues[i].venue;
            var name = venue.name;
            var url = venue.url;
            var rating = venue.rating;
            var address = venue.location.address;
            var city = venue.location.city;
            var state = venue.location.state;
            var position = {
                lat: venue.location.lat,
                lng: venue.location.lng
            };
            locations.push({
                title: name,
                url: url,
                rating: rating,
                address: address,
                city: city,
                state: state,
                position: position
            });
        }
        initMap(locations);
    })
    .fail(function(){
        document.getElementById('map').innerHTML = "Failed to load location data. Please try again later.";
    });
}


function initMap(locations) {
    var latlngbounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 33.7490,
            lng: -84.3880
        },
        zoom: 8,
        mapTypeControl: false
    });
    addMarkers(locations, map, latlngbounds);
    map.fitBounds(latlngbounds);

    // Instantiate our view model only after we've already initialized the map and loaded in all of our data
    var ViewModel = function () {
        var self = this;

        // Sort all the locations in alphabetical order
        self.locations = ko.observableArray(locations).sort(function (left, right) {
            return left.title == right.title ? 0 : left.title < right.title ? -1 : 1;
        });

        self.filter = ko.observable("");

        self.filteredLocations = ko.computed(function () {
            return ko.utils.arrayFilter(self.locations(), function (location) {
                var contains = location.title.toUpperCase().includes(self.filter().toUpperCase());
                location.marker.setVisible(contains);
                // if (contains) {
                //     location.marker.setMap(map);
                // } else {
                //     location.marker.setMap(null);
                // }
                return contains;
            });
        });

        self.noMatchesFound = ko.computed(function () {
            return self.filteredLocations().length === 0;
        });

        self.clickLocation = function (location) {
            return function (location) {
                clickLocation(location)();
            };
        };
    };
    ko.applyBindings(new ViewModel());
}

function clickLocation(location) {
    // Use closure to save the reference to marker
    return function () {
        if (location.marker.getAnimation() !== null) {
            location.infoWindow.close();
            location.marker.setAnimation(null);
        } else {
            location.infoWindow.open(map, location.marker);
            location.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    };

}

function addMarkers(locations, map, latlngbounds) {
    
    locations.forEach(function (location) {

        // Dynamically set the information window for each marker through the locations values.

        var url = location.url ? location.url : "";
        var href = location.url ? 'href="' + location.url + '"' : "";
        var urlDisplay = url === "" ? "No website" : "Website";
        var contentString = '<h1>' + location.title + '</h1>' +
            '<h2>' + location.address + ' ' + location.city + ', ' + location.state + '</h2>' +
            '<h3><a target="blank"' + href + '>' + urlDisplay + '</a></h3>' +
            '<h3>Rating: ' + location.rating + '</h3>';
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        // This method adds the markers lat and longitude positions to be within the bounds of the Map.

        latlngbounds.extend(location.position);
        
        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location.position
        });

        // Here, we want to add a reference to each marker and info window with its corresponding location so we can refer to them later.
        location.marker = marker;
        location.infoWindow = infoWindow;

        // Stop the marker from animating if the info window button is closed.
        google.maps.event.addListener(location.infoWindow, 'closeclick', function () {
            if (location.marker.getAnimation() !== null) {
                location.marker.setAnimation(null);
            }
        });

        location.marker.addListener('mousedown', clickLocation(location));
    });
}

/*
Set all the menu listeners needed to get the side menu to open and close on different viewports
*/
function initMenu() {
    var menuButton = document.getElementById('menu');
    var menuCloseButton = document.getElementById('menu-close');
    var sideNav = document.getElementById('list-view');
    menuCloseButton.addEventListener('mousedown', function () {
        toggleOpen(sideNav);
    });
    menuButton.addEventListener('mousedown', function () {
        toggleOpen(sideNav);
    });
}

function toggleOpen(ele) {
    ele.classList.toggle('open');
}

function googleMapsError(){
    document.getElementById('map').innerHTML = "Failed to load Google Maps. Please try again later.";
}