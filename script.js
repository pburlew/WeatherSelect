


$(document).ready(function() {

//event listeners (only 2 in whole project)- WORKING
$("#search-button").on("click", function (){
    console.log("ive been clicked au reviour bitch");
    event.preventDefault();
    var searchValue = $("input").val().toUpperCase().trim();
    searchWeather(searchValue);

})

//add to history- NOT WORKING
$(".document").on("click", function(){
    var pastSearch = $(this).text();
    
    pastSearch = $("<li>").addClass("li");
    console.log("FUCK")
    
})


//functions

//this function uses moment.js to add current day and time in the header- WORKING
function showCurrentDay(){

    $("#timedate-reader").text(moment().format('MMMM Do YYYY, h:mm:ss a'))
}
showCurrentDay();

//this function adds a row to the history div to show previouly searched cities- NOT WORKING
function makeRow(text){

        $("#history").removeClass("hide");
        //showing the last 5 cities searched
        for (var i = 0; i < 5; i++) {
            
            //adding to list
            $("#history").append("list-group history");
            
        }

}

//searches current weather- WORKING
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
            var img = $("#wicon").attr("src", "http://openweathermap.org/img/w/" + data.icon + ".png");
          

            //adding to page (top container for today)
            title.append(img);
            cardBody.append(title, temp, humid, wind, img);
            card.append(cardBody);
            $("#today").append(card);

            getForecast(searchValue);
            // getUVIndex(data.coord.lat, data.coord.lon);
        }
    })
}

// searches 5day forecast- NOT WORKING
function getForecast(searchValue){
    $.ajax({
        //connect to forecast API
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=4c023acf398932e1b43cd03002ad8542",
        dataType: "json",
        success: function(data){
        //make sure old content is emptied 
         $("#forecast").empty();

         //build new forecast cards by grabbing html elements
         $("#forecast").html("<h4> 5 Day Forecast: </h4>").append("<div class=\"row\">");


            for (var i = 0; i < data.list.length; i++){
            
            if(data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
            
            var addToCol = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var titleForecast = $("<h5>").addClass("card-title").text(data.name);
            var cardForecast = $("<div>").addClass("card");
            var humidForecast = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            var tempForecast = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp_max + " F");
            var forecastBody = $("<div>").addClass("forecast-body p-2");
            var imgForecast = $("#wicon").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather.icon + ".png");
            
            addToCol.append(card.append(forecastBody.append(titleForecast, imgForecast, tempForecast, humidForecast)));

            $("#forecast .row").append(addToCol);

        
            console.log("FORECAST READ AND ADDED");
            }
            }
        }
    })
}




function gtUVindex(lat, lon){

}
// get current history - NOT WORKING
var history = JSON.parse(window.localStorage.getItem("history")) || [];

if (history.length >0) {
    searchWeather(history[history.length-1]);
}
for (var i = 0; i < history.length; i++){
    makeRow(history[i]);
}
 })