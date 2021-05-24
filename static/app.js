function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationObtained);
    } else {
        console.error("Browser does not support Geolocation")
    }
}

function locationObtained(position) {
    console.log("current location", position);

    let data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    $.ajax({
        url: "/api/weather",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(res) {
            console.log("Server says: ", res);

            //display the weather information on HTML
        },
        error: function(details) {
            console.error("Error sending data", details);
        }
    });
}

function init() {
    console.log("Flask page")
    getLocation();
}

window.onload = init;