function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationObtained);
    } else {
        console.error("Browser does not support Geolocation");
    }
}

displayCity = (res) => {
    var city = `${res.data[0].locality}, ${res.data[0].region}`;
    document.querySelector("span.city-location").innerText = city;
}

function locationObtained(position) {
    console.log("current location", position);

    let data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };

    $.ajax({
        url: "/api/weather",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(res) {
            // console.log("Server says: ", res);
            displayWeather(res);

            //display the weather information on HTML
        },
        error: function(details) {
            console.error("Error sending data", details);
        },
    });
    $.ajax({
        url: "/api/locationdecoding",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(res) {
            console.log(res)
            displayCity(res)
        },
        error: function(details) {
            console.error('error', details)
        }
    })
}

function init() {
    getLocation();
}

window.onload = init;