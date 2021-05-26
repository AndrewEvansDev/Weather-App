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
            displayForecast(res)
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

displayWeather = (res) => {
    console.log(res);
    var showWeather = `
    <div class="weather-wrap">
    <img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png">
    <span class="weather-desc">${res.current.weather[0].description} </span>
    <span>${Math.round((res.current.temp * 9) / 5) + 32}&deg;<b>F</b></span>  
    <span>${res.current.humidity}&percnt; Humidity</span>
    </div>`;
    document.getElementById("weather-data").innerHTML = showWeather;
};

displayForecast = (res) => {
    for (var i = 0; i < 7; i++) {
        console.log(i)
        var li = document.createElement('li');
        var ul = document.getElementById("forecast-wrap")
        console.log(li)
        li.innerHTML = `<span>${(res.daily[i].temp[0] * 9 / 5) + 32}${res.daily[i].weather[0].description}</span>`
        console.log(li)
        document.getElementById("forecast-wrap").appendChild(li);
        ul.appendChild(li)
    }
}

displayCity = (res) => {
    var city = `${res.data[0].locality}, ${res.data[0].region}`;
    document.querySelectorAll("span.city-location").innerText = city;
}


function init() {
    getLocation();
}

window.onload = init;