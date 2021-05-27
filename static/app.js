function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationObtained);
    } else {
        console.error("Browser does not support Geolocation");
    }
}


function init() {
    getLocation();
}

window.onload = init;