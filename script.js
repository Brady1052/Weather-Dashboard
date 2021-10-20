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

            document.getElementById("weather").innerHTML = data.name + " " + dateConverter + " " + "<img src = " + url + " >"
            document.getElementById("temperature").innerHTML = "Temp: " + data.main.temp + "°F"
            document.getElementById("wind").innerHTML = "Wind: " + data.wind.speed + "MPH"
            document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%"
            
            //Begins fetching API that contains the Uv Index
            var lat = data.coord.lat
            var lon = data.coord.lon
            var uvLink = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily" + "&appid=" + APIKey;
         
            fetch(uvLink)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
            console.log(data)
            console.log(lat)
            console.log(lon)
            console.log(data.current.uvi)
            var index = document.getElementById("uvIndex").innerHTML = "UV Index: " + data.current.uvi
            
            
            console.log(index)
            if (index == 0){
                console.log("It's Working")
                document.body.style.backgroundColor = "orange";
            } else if (index > 0){
                console.log("Howdy")
            }
        })
})}
searchButton.addEventListener("click", getApi)





