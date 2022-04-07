const APIKey = "2964b09add70d83c046524fefb1dc721"
const searchButton = document.getElementById("searchButton");
const displayDat = document.getElementById("displayData");
const dropDown = document.querySelector(".dropdown-content");
const city = document.getElementById("citySearch").value;

// Gets local storage items
let cities = localStorage.getItem('cities')

if (cities === null) {
    cities = [];
} else {
    cities = JSON.parse(localStorage.getItem('cities'));
}

const history = JSON.parse(localStorage.getItem('cities'));
history.forEach(function (city) {

    const aTag = document.createElement('a');
    aTag.textContent = city;
    aTag.addEventListener('click', function () {
        document.getElementById("card0").style.visibility = 'visible';
        document.getElementById("fiveDayContainer").style.visibility = 'visible';
        document.getElementById("card0h1").style.visibility = 'visible';
        document.getElementById("fiveDayh1").style.visibility = "visible"
        getApi(city)
    })
    console.log(aTag.textContent)
    dropDown.appendChild(aTag)
})


function getApi(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        // Current Weather
        .then(function (data) {
            var time = data.dt
            var dateConverter = moment.unix(time).format("MM/DD/YYYY")
            var icon = data.weather[0].icon
            var url = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("nameDate").innerHTML = data.name + " " + dateConverter + " " + "<img src = " + url + " >"
            document.getElementById("temperature").innerHTML = "Temp: " + data.main.temp + "°F"
            document.getElementById("wind").innerHTML = "Wind: " + data.wind.speed + "MPH"
            document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%"
            //Begins fetching API that contains the Uv Index and Five Day Forecast
            var name = data.name;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvLink = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIKey;

            fetch(uvLink)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    document.getElementById("uvIndex").innerHTML = "UV Index: " + data.current.uvi

                    // Five Day Forecast Starts Here
                    // Day One
                    var icon1 = data.daily[1].weather[0].icon
                    var time1 = data.daily[1].dt
                    var dateConverter1 = moment.unix(time1).format("MM/DD/YYYY")
                    var url1 = "http://openweathermap.org/img/w/" + icon1 + ".png";
                    document.getElementById("date1").innerHTML = name + " " + dateConverter1 + "<img src = " + url1 + ">";
                    document.getElementById("temperature1").innerHTML = "Temp: " + data.daily[1].feels_like.day + "°F"
                    document.getElementById("wind1").innerHTML = "Wind: " + data.daily[1].wind_speed + "MPH"
                    document.getElementById("humidity1").innerHTML = "Humidty: " + data.daily[1].humidity + "%"

                    //Day Two
                    var icon2 = data.daily[2].weather[0].icon
                    var time2 = data.daily[2].dt
                    var dateConverter2 = moment.unix(time2).format("MM/DD/YYYY")
                    var url2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
                    document.getElementById("date2").innerHTML = name + " " + dateConverter2 + "<img src = " + url2 + ">"
                    document.getElementById("temperature2").innerHTML = "Temp: " + data.daily[2].feels_like.day + "°F"
                    document.getElementById("wind2").innerHTML = "Wind: " + data.daily[2].wind_speed + "MPH"
                    document.getElementById("humidity2").innerHTML = "Humidty: " + data.daily[2].humidity + "%"

                    //Day Three
                    var icon3 = data.daily[3].weather[0].icon
                    var time3 = data.daily[3].dt
                    var dateConverter3 = moment.unix(time3).format("MM/DD/YYYY")
                    var url3 = "http://openweathermap.org/img/w/" + icon3 + ".png";
                    document.getElementById("date3").innerHTML = name + " " + dateConverter3 + "<img src = " + url3 + ">";
                    document.getElementById("temperature3").innerHTML = "Temp: " + data.daily[3].feels_like.day + "°F"
                    document.getElementById("wind3").innerHTML = "Wind: " + data.daily[3].wind_speed + "MPH"
                    document.getElementById("humidity3").innerHTML = "Humidty: " + data.daily[3].humidity + "%"

                    //Day Four
                    var icon4 = data.daily[4].weather[0].icon
                    var time4 = data.daily[4].dt
                    var dateConverter4 = moment.unix(time4).format("MM/DD/YYYY")
                    var url4 = "http://openweathermap.org/img/w/" + icon4 + ".png";
                    document.getElementById("date4").innerHTML = name + " " + dateConverter4 + "<img src = " + url4 + ">";
                    document.getElementById("temperature4").innerHTML = "Temp: " + data.daily[4].feels_like.day + "°F"
                    document.getElementById("wind4").innerHTML = "Wind: " + data.daily[4].wind_speed + "MPH"
                    document.getElementById("humidity4").innerHTML = "Humidty: " + data.daily[4].humidity + "%"

                    //Day Five
                    var icon5 = data.daily[5].weather[0].icon
                    var time5 = data.daily[5].dt
                    var dateConverter5 = moment.unix(time5).format("MM/DD/YYYY")
                    var url5 = "http://openweathermap.org/img/w/" + icon5 + ".png";
                    document.getElementById("date5").innerHTML = name + " " + dateConverter5 + "<img src = " + " " + url5 + ">";
                    document.getElementById("temperature5").innerHTML = "Temp: " + data.daily[5].feels_like.day + "°F"
                    document.getElementById("wind5").innerHTML = "Wind: " + data.daily[5].wind_speed + "MPH"
                    document.getElementById("humidity5").innerHTML = "Humidty: " + data.daily[5].humidity + "%"

                    //UV Index Color
                    var index = parseInt(data.current.uvi)
                    if (index < 3) {
                        document.getElementById('uvIndex').style.backgroundColor = 'green';
                    } else if (index < 5) {
                        document.getElementById("uvIndex").style.backgroundColor = 'yellow';
                    }
                    else if (index < 7) {
                        document.getElementById('uvIndex').style.backgroundColor = 'orange';
                    }
                    else if (index < 10) {
                        document.getElementById('uvIndex').style.backgroundColor = 'red';
                    }
                    else {
                        document.getElementById('uvIndex').style.backgroundColor = 'purple';

                    }
                })
        })
}

//Calls functions when the search button is clicked

searchButton.addEventListener("click", function (e) {
    document.getElementById("card0").style.visibility = 'visible';
    document.getElementById("fiveDayContainer").style.visibility = 'visible';
    document.getElementById("card0h1").style.visibility = 'visible';
    document.getElementById("fiveDayh1").style.visibility = "visible"
    const city = document.getElementById("citySearch").value

    //Appends History Dropdown box with user's search
    var aElement = document.createElement("a")
    aElement.textContent = city;
    aElement.addEventListener('click', function () {
        getApi(this.textContent)
    })
    dropDown.appendChild(aElement);
    getApi(city);

    cities.push(city)

    //Saves user search to local storage
    localStorage.setItem('cities', JSON.stringify(cities))

})





