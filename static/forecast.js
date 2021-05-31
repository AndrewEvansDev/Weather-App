displayForecast = (res) => {
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (var i = 0; i < res.daily.length; i++) {
        var day = new Date(res.daily[i].dt * 1000).getDay()
        var dv = document.createElement('div');
        dv.className="forecast-grid";
        var grid = document.getElementById("forecast-wrap");
        dv.innerHTML = `
        <span class="week-day">${days[day]}</span>
        <span class="weather-icon"><img class="forecast-img" src="http://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}@2x.png"></span>
        <span class="sunrise-grid"><img src="static/sunrise.png">  ${(new Date(res.daily[i].sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).slice(1,)}</span>
        <span class="sunset-grid"><img src="static/sunset.png">  ${(new Date(res.daily[i].sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).slice(1,)}</span>
        <span class="daily-temp">${Math.round((res.daily[i].temp["day"]*9/5+32))}&deg;<img src="static/tempf.png" alt="F"></span>
        <span class="uv-index">UV Index: ${res.daily[i].uvi}<img src="static/uv-index.png"></span>
        <span class="capitalize daily-desc"> <em>${res.daily[i].weather[0].description}</em></span>`

        grid.appendChild(dv)
    }
}

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
            displayForecast(res);
            console.log(res)

            //display the weather information on HTML
        },
        error: function(details) {
            console.error("Error sending data", details);
        },
    });
}

function init() {
    getLocation();
}

window.onload = init;