displayWeather = (res) => {
    console.log(res);
    var date = new Date();
    console.log(date.getDay())
    days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    months = ["January","February","March","May","June","July","August","September","October","November","December"]
    var showWeather = `
    <div class="today-wrap">
    <h1 class="today-header">Today is ${days[date.getDay()]} ${months[date.getMonth()-1]} ${date.getDate()}, ${date.getFullYear()}</h1>
    <h3 class="today-subheader"><em>Current Weather</em>: <span class="weather-desc">${res.current.weather[0].description}  <img class="today-icon-api" src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png"></span></h3>
    <div class="weather-wrap">
    
    <span class="today-temp">Temp: ${Math.round((res.current.temp * 9) / 5) + 32}&deg;<img src="static/tempf.png" alt="F"></span>  
    <span class="feels-like-temp">Feels like: ${Math.round((res.current.feels_like * 9) / 5) + 32}&deg;<img src="static/tempf.png" alt="F"></span>  
    <span class="today-humidity">Humidity: ${res.current.humidity}&percnt;</span>
    <span class="sunrise-today">Sunset: ${(new Date(res.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).slice(1,)} <img src="static/sunrise.png"></span>
    <span class="sunset-today">Sunrise: ${(new Date(res.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).slice(1,)} <img src="static/sunset.png">  </span>
    <span class="uv-index-now">UV Index: ${res.current.uvi} <img src="static/uv-index.png"></span>
    <span class="compass-direction">Wind: ${degToCompass(res.current.wind_deg)} <img src="static/windsock.png"></span>
    </div>
    </div>`
    document.getElementById("weather-data").innerHTML = showWeather;
    
    for(var i = 0; i < 10; i++){
        var hourly = document.createElement('div');
        hourly.className = "hourly-grid-item"
        hourly.innerHTML = `
        <span class="hourly-hour">${(new Date(res.hourly[i].dt * 1000).toLocaleTimeString([], { hour: 'numeric',  }))}</span>
        <span class="hourly-temp">${Math.round((res.hourly[i].temp * 9) / 5) + 32}&deg;<img src="static/tempf.png" alt="F"></span>
        <span class="hourly-desc capitalize"><em>${res.hourly[i].weather[0].description}</em></span>
        <img class="hourly-icon" src="http://openweathermap.org/img/wn/${res.hourly[i].weather[0].icon}@2x.png">`
        document.getElementById("hourly-weather").appendChild(hourly);
    }
};

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
