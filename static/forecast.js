displayForecast = (res) => {
    for (var i = 0; i < res.daily.length; i++) {
        console.log(i)
        var li = document.createElement('li');
        var ul = document.getElementById("forecast-wrap")
        console.log(li)
        li.innerHTML = `
        <span><img src="http://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}@2x.png"></span>
        <span> <img src="{{url_for('static', filename='/img/sunrise.svg')}}" /> ${(new Date(res.daily[i].sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).slice(1,)}</span>
        <span> <img src="{{url_for('static', filename='/img/sunset.svg')}}" /> ${(new Date(res.daily[i].sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).slice(1,)}</span>
        <span>${Math.round((res.daily[i].temp["day"]*9/5+32))}&deg;<b>F</b></span>
        <span> ${res.daily[i].weather[0].description}</span>`
        document.getElementById("forecast-wrap").appendChild(li);
        ul.appendChild(li)
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
            console.log("Server says: ", res);
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

displayCity = (res) => {
    var city = `${res.data[0].locality}, ${res.data[0].region}`;
    document.querySelectorAll("span.city-location").innerText = city;
}