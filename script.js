var APIKey = "2964b09add70d83c046524fefb1dc721"
var searchButton = document.getElementById("searchButton")
var displayDat = document.getElementById("displayData")

function getApi() {
    var city = document.getElementById("citySearch").value
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.main.temp)
            console.log(data)
            var time = data.dt
            var dateConverter = moment.unix(time).format("MM/DD/YYYY")
            var icon = data.weather[0].icon
            var url = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("nameDate").innerHTML = data.name + " " + dateConverter + " " + "<img src = " + url + " >"
            document.getElementById("temperature").innerHTML = "Temp: " + data.main.temp + "°F"
            document.getElementById("wind").innerHTML = "Wind: " + data.wind.speed + "MPH"
            document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%"
            //Begins fetching API that contains the Uv Index
            var name = data.name;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvLink = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIKey;

            fetch(uvLink)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    console.log(lat)
                    console.log(lon)
                    console.log(data.current.uvi)
                    document.getElementById("uvIndex").innerHTML = "UV Index: " + data.current.uvi
                   
                    // Five Day Forecast Starts Here
                    // Day One
                    var icon1 = data.daily[0].weather[0].icon
                    var time1 = data.daily[0].dt
                    // var dateConverter1 = moment.unix(time1).format("MM/DD/YYYY")
                    var url1 = "http://openweathermap.org/img/w/" + icon1 + ".png";
                    document.getElementById("date1").innerHTML = name + " " + " " + "<img src = " + url1 + ">";
                     + " " + dateConverter + " " + "<img src = " + url + " >"
                    document.getElementById("temperature1").innerHTML = "Temp: " + data.daily[0].feels_like.day + "°F"
                    document.getElementById("wind1").innerHTML = "Wind: " + data.daily[0].wind_speed + "MPH"
                    document.getElementById("humidity1").innerHTML = "Humidty: " + data.daily[0].humidity + "%"
                    
                    //Day Two
                    var icon2 = data.daily[1].weather[0].icon
                    var url2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
                    document.getElementById("date2").innerHTML = name + "<img src = " + url2 + ">";
                    document.getElementById("temperature2").innerHTML = "Temp: " + data.daily[1].feels_like.day + "°F"
                    document.getElementById("wind2").innerHTML = "Wind: " + data.daily[1].wind_speed + "MPH"
                    document.getElementById("humidity2").innerHTML = "Humidty: " + data.daily[1].humidity + "%"
                    
                    //Day Three
                    var icon3 = data.daily[2].weather[0].icon
                    var url3 = "http://openweathermap.org/img/w/" + icon3 + ".png";
                    document.getElementById("date3").innerHTML = name + "<img src = " + url3 + ">";
                    document.getElementById("temperature3").innerHTML = "Temp: " + data.daily[2].feels_like.day + "°F"
                    document.getElementById("wind3").innerHTML = "Wind: " + data.daily[2].wind_speed + "MPH"
                    document.getElementById("humidity3").innerHTML = "Humidty: " + data.daily[2].humidity + "%"

                    //Day Four
                    var icon4 = data.daily[3].weather[0].icon
                    var url4 = "http://openweathermap.org/img/w/" + icon4 + ".png";
                    document.getElementById("date4").innerHTML = name + "<img src = " + url4 + ">";
                    document.getElementById("temperature4").innerHTML = "Temp: " + data.daily[3].feels_like.day + "°F"
                    document.getElementById("wind4").innerHTML = "Wind: " + data.daily[3].wind_speed + "MPH"
                    document.getElementById("humidity4").innerHTML = "Humidty: " + data.daily[3].humidity + "%"

                    //Day Five
                    var icon5 = data.daily[4].weather[0].icon
                    var url5 = "http://openweathermap.org/img/w/" + icon5 + ".png";
                    document.getElementById("date5").innerHTML = name + "<img src = " + url5 + ">";
                    document.getElementById("temperature5").innerHTML = "Temp: " + data.daily[4].feels_like.day + "°F"
                    document.getElementById("wind5").innerHTML = "Wind: " + data.daily[4].wind_speed + "MPH"
                    document.getElementById("humidity5").innerHTML = "Humidty: " + data.daily[4].humidity + "%"
                    
                    //Changing index color based on conditions
                    var index = document.getElementById("uvIndex").innerHTML = "UV Index: " + data.current.uvi
                    console.log(index)
                    if (index == 0) {
                        console.log("It's Working")
                    } else if (index > 0) {
                        console.log("Howdy")
                    }
                })
        })}
        
        searchButton.addEventListener("click", getApi)
       


