


$(document).ready(function() {

//event listeners (only 2 in whole project)
$("#search-button").on("click", function (){
    console.log("ive been clicked au reviour bitch");
    event.preventDefault();
    var searchValue = $("input").val().toUpperCase().trim();
    searchWeather(searchValue);

})

//add to history
$(".document").on("click", "li", function(){
    var cityName = $(this).text();
    clearDisplayedWeatherInfo();
    resetGlobalVariables();
    searchCity(cityName);
    console.log("FUCK")
    
})


// //functions

//this function uses moment.js to add current day and time in the header
function showCurrentDay(){

    $("#timedate-reader").text(moment().format('MMMM Do YYYY, h:mm:ss a'))
}
showCurrentDay();

//this function adds a row to the history div to show previouly searched cities
function makeRow(text){

        $("#history").removeClass("hide");
        //showing the last 5 cities searched
        for (var i = 0; i < 5; i++) {
            
            //adding to list
            $("#history").append("list-group history");
            
        }

}

function searchWeather(searchValue) {
    $.ajax({
        //connecting to API for current weather
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=4c023acf398932e1b43cd03002ad8542",
        dataType: "json",
        success: function(data){
            //if the city we just searched is not already in history, push to history
            if (history.indexOf(searchValue)=== -1){
                history.push(searchValue);
                window.localStorage.setItem("history", JSON.stringify(history));

                makeRow(searchValue);
            }
            //make sure old content is emptied 
            $("#today").empty();

            //adding HTML items for current weather 
            var title = $("<h3>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            // var kToF = ((data.main.temp − 273.15) × 9/5 + 32)
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " F");
            var cardBody = $("<div>").addClass("card-body");
            // var img = $('#wicon').attr('src', "http://openweathermap.org/img/w/" + weather[0].icon + ".png");

            //adding to page (top container for today)
            // title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);

            getForecast(searchValue);
            // getUVIndex(data.coord.lat, data.coord.lon);
        }
    })
}

function getForecast(searchValue){
    $.ajax({
        //connect to forecast API
        method: "GET",
        url: "api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=4c023acf398932e1b43cd03002ad8542",
        dataType: "json",
        success: function(data){
        //make sure old content is emptied 
         $("#forecast").empty();

            var title = $("<h3>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " F");
            var forecastBody = $("<div>").addClass("forecast-body");

            forecastBody.append(title, temp, humid);
            card.append(forecastBody);
            $("#forecast").append(card);
            console.log("#forecast");
        }
    })

}

function gtUVindex(lat, lon){

}
// get current history 
var history = JSON.parse(window.localStorage.getItem("history")) || [];

if (history.length >0) {
    searchWeather(history[history.length-1]);
}
for (var i = 0; i < history.length; i++){
    makeRow(history[i]);
}
})