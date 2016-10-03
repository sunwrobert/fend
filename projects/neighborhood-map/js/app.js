var locations = [{
    title: "The Varsity",
    location: {
        lat: 0,
        lng: 0
    }
}, {
    title: "The Dome",
    location: {
        lat: 0,
        lng: 0
    }
}, {
    title: "The Wonder",
    location: {
        lat: 0,
        lng: 0
    }
}, {
    title: "The Place",
    location: {
        lat: 0,
        lng: 0
    }
}, {
    title: "The Wooters",
    location: {
        lat: 0,
        lng: 0
    }
}, {
    title: "The Pumpkins",
    location: {
        lat: 0,
        lng: 0
    }
}, ];

var markers = [];

function init(){
    initEventListeners();
    initMap();
}

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8,
        mapTypeControl: false
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
    this.locations = ko.observable(locations);
    this.filter = ko.observable("");
    console.log(this.locations());
    this.filteredLocations = ko.computed(function () {
        return ko.utils.arrayFilter(self.locations(), function (location) {
            return location.title.toUpperCase().includes(self.filter().toUpperCase());
        });
    });
};


ko.applyBindings(new ViewModel());