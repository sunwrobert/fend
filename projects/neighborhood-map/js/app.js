var locations = [{
    title: "The Varsity",
    position: {
        lat: 33.771510,
        lng: -84.389311
    }
}, {
    title: "Georgia Aquarium",
    position: {
        lat: 33.763424,
        lng: -84.394891
    }
}, {
    title: "Taco Mac",
    position: {
        lat: 33.780643,
        lng: -84.383911
    }
}, {
    title: "Antico's Pizza",
    position: {
        lat: 33.784651,
        lng: -84.405589
    }
}, {
    title: "Five Guys Burger and Fries",
    position: {
        lat: 33.778194,
        lng: -84.385114
    }
}, {
    title: "Georgia Tech Campus Recreation Center",
    position: {
        lat: 33.775525,
        lng: -84.403912
    }
}, ];

var config = {
    apiKey: 'XXXXXXXXXXXXXX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };

function init() {
    initEventListeners();
    initMap();
}

var map;
var markers;
var latlngbounds;

function initMap() {
    latlngbounds = new google.maps.LatLngBounds();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 33.7490,
            lng: -84.3880
        },
        zoom: 8,
        mapTypeControl: false
    });


    addMarkers();

    map.fitBounds(latlngbounds);
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

function addMarkers() {
    locations.forEach(function (location) {
        var contentString = '<h1>' + location.title + '</h1>'
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        latlngbounds.extend(location.position);
        marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location.position
        });

        // Here, we want to add a reference to each marker and info window with its corresponding location so we can refer to them later.
        location.marker = marker;
        location.infoWindow = infoWindow;

        // Stop the marker from animating if the info window button is closed.
        google.maps.event.addListener(location.infoWindow, 'closeclick', function(){
            if(location.marker.getAnimation() !== null){
                location.marker.setAnimation(null);
            }
        })

        location.marker.addListener('click', clickLocation(location));
    });
}

function initEventListeners() {
    var menuButton = document.getElementById('menu');
    var menuCloseButton = document.getElementById('menu-close');
    var sideNav = document.getElementById('list-view');
    menuCloseButton.addEventListener('click', function () {
        toggleOpen(sideNav);
    });
    menuButton.addEventListener('click', function () {
        toggleOpen(sideNav);
    });
}

function toggleOpen(ele) {
    ele.classList.toggle('open');
}


var ViewModel = function () {
    var self = this;
    this.locations = ko.observableArray(locations);
    this.filter = ko.observable("");
    this.filteredLocations = ko.computed(function () {
        return ko.utils.arrayFilter(self.locations(), function (location) {
            return location.title.toUpperCase().includes(self.filter().toUpperCase());
        });
    });
    this.noMatchesFound = ko.computed(function () {
        return self.filteredLocations().length == 0;
    });
    this.clickLocation = function (location) {
        return function (location) {
            clickLocation(location)();
        };
    };

    // Duplicated code because filtered locations wouldn't include the markers in each location.
    this.filterMarkers = function(){
        this.locations().forEach(function(location){
            if(location.title.toUpperCase().includes(self.filter().toUpperCase())){
                location.marker.setMap(map);
            }
            else {
                location.marker.setMap(null);
            }
        })
    }
};


ko.applyBindings(new ViewModel());