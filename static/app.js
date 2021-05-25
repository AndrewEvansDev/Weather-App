function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationObtained);
    } else {
        console.error("Browser does not support Geolocation");
    }
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
            getLocal(position);
            //display the weather information on HTML
        },
        error: function(details) {
            console.error("Error sending data", details);
        },
    });
}

displayWeather = (res) => {
    console.log(res);
    var showWeather = `
    <div>
    <img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png">
    <span class="weather-desc">${res.current.weather[0].description} </span>
    <span>${Math.round((res.current.temp * 9) / 5) + 32}&deg;<b>F</b></span>  
    <span>${res.current.humidity}&percnt; Humidity</span>
    </div>`;
    document.getElementById("weather-data").innerHTML = showWeather;
};

function getLocal(position) {
    console.log(position)
        //google api to display locality to come
}

function init() {
    console.log("Flask page");
    getLocation();
}

window.onload = init;