// var iconcode = weather[0].icon;
// var iconurl = "http://openweathermap.org/img/w/" + weather[0].icon; + ".png";



$(document).ready(function() {

//event listeners (only 2 in whole project)
$("#search-button").on("click", function (){
    console.log("ive been clicked au reviour bitch");
    event.preventDefault();
    var searchValue = $("input").val().toUpperCase().trim();
    searchWeather(searchValue);
    

})

$(".history").on("click", "li", function(){
    
})

//functions
function makeRow(text){

}

function searchWeather(searchValue) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=4c023acf398932e1b43cd03002ad8542",
        dataType: "json",
        success: function(data){
            if (history.indexOf(searchValue)=== -1){
                history.push(searchValue);
                window.localStorage.setItem("history", JSON.stringify(history));

                makeRow(searchValue);
            }
            //make sure old content is emptied 
            $("#today").empty();

            //adding HTML items for current weather 
            var title = $("<h3>").addClass("card-title").text(data.name + " ( " + new Date().toLocaleDateString);
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " F");
            var cardBody = $("<div>").addClass("card-body");
            // var img = $('#wicon').attr('src', "http://openweathermap.org/img/w/" + weather[0].icon + ".png");

            //adding to page 
            // title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);

            getForecast(searchValue);
            getUVIndex(data.coord.lat, data.coord.lon);
        }
    })
}

function getForecast(searchValue){
    // $.ajax({
    //     var queryURL = api.openweathermap.org/data/2.5/forecast?q={city name}&appid=4c023acf398932e1b43cd03002ad8542,
    //     url: queryURL,
    //     method: "GET"
    // })

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