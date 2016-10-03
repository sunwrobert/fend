var locations = [];
var markers = [];


var ViewModel = function () {

};

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8,
        disableDefaultUI: true
    });
}

var menuButton = document.getElementById('menu');
var menuCloseButton = document.getElementById('menu-close');
var sideNav = document.getElementById('list-view');
menuCloseButton.addEventListener('click', function () {
    toggleOpen(sideNav);
});
menuButton.addEventListener('click', function () {
    toggleOpen(sideNav);
});

function toggleOpen(ele) {
    ele.classList.toggle('open');
}