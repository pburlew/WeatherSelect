
// start by using query to grab variables from html doc
var currentConditionsEl = $(".todaysWeather");
var currentDayEl = $("#currentDay");
var forecastEl = $(".forecast");
var previousSearchesEl = $(".previousSearches");
var userInput = $(".searchField");
var searchButton = $(".searchbtn");

// variables that are empty when the page first loads
var citySearch = '';
var lat = '';
var lon = '';
var searchedArray = [];



loadHistorySearch();


// event listeners- only 2 in project
searchButton.on("click", function () {
    displaySearchResult();
    loadHistorySearch();
});

$(document).on("click", ".psearch", recall);




// FUNCTIONS

function loadHistorySearch () {
    // clear out previously added buttons
    previousSearchesEl.empty();
    //grab the item from local storage that was searched
    searchedArray = JSON.parse(localStorage.getItem("searched"));
    // if there is no item, you're good. stop looping.
    if (searchedArray === null) {
        return
      
    } else {
        for (var i = 0; i < searchedArray.length; i++) {
    // create a button for each value and append to the page        
        var psbutton = $("<button>").text(searchedArray[i]).attr({
            class: "psearch",
        
        })
        previousSearchesEl.append(psbutton);
        }
    }
}



function displaySearchResult () {
    // set everything to empty
    currentConditionsEl.empty();
    forecastEl.empty();
    // what did the user Input in the search bar?
    citySearch = userInput.val();
    // store API as a variable to be more clean 
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=4c023acf398932e1b43cd03002ad8542";
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
      }).then(function(r) {
        
        lat = r.city.coord.lat;
        lon = r.city.coord.lon;
        // get all measurements and add to the container on paige
        var cityTitle = $("<h2>").text(r.city.name + "   ");
        var dislayPic = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + r.list[0].weather[0].icon + "@2x.png");
        var cityTemp = $("<p>").text("Temperature: " + ((r.list[0].main.temp - 273.15)*1.8+32).toFixed(0) + " degrees Fahrenheit");
        var cityHumidity = $("<p>").text("Humidity: " + r.list[0].main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + r.list[0].wind.speed + " MPH");
        currentConditionsEl.append(cityTitle.append(dislayPic), cityTemp, cityHumidity, windSpeed);
        
        // create & call second query for 5day
        fullQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=19ead611ac1f13b1c00469e35bb98b61";
        $.ajax({
            url: fullQueryURL,
            method: "GET"
        }).then(function(re) {
            console.log(re);
            // get UVindex, 
            var uvIndex = $("<p>").text("UV Index: " + re.current.uvi).attr("id", "uv");
            // change new element color based on index #
            if (re.current.uvi < 3) {uvIndex.attr("id", "uv-low")};
            if (re.current.uvi > 8) {uvIndex.attr("id", "uv-high")};
            currentConditionsEl.append(uvIndex);
            // get the forcast array from the ajax call
            var fiveDayForecast = re.daily
            // loop through the array
            for (var i = 1; i < 6; i++) {
                // get date, weather icon, temp & humidity and add to div, append to page
                var forecastCard = $("<div>").attr("class", "col-lg-2")
                var forecastDate = $("<h6>").text(moment().add(i,'days').format("L"));
                var forecastPicIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDayForecast[i].weather[0].icon + "@2x.png");
                var forecastTemp = $("<p>").text("Temp: " + ((fiveDayForecast[i].temp.day - 273.15)*1.8+32).toFixed(0) + "F");
                var forecastHumid = $("<p>").text("Humidity: " + fiveDayForecast[i].humidity + "%");
                forecastEl.append(forecastCard.append(forecastDate, forecastPicIcon, forecastTemp, forecastHumid));
            }
            
        });
    });
    // get item from local storage
    searchedArray = JSON.parse(localStorage.getItem("searched"));
        // if no item, set to an empty array
        if (searchedArray === null) {
            searchedArray = [];
        };
        // add new user input to 
        searchedArray.push(citySearch);
        localStorage.setItem("searched", JSON.stringify(searchedArray));
};
            
function runSecondSearch (cityName) {
    currentConditionsEl.empty();
    forecastEl.empty();
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=4c023acf398932e1b43cd03002ad8542";
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
        }).then(function(r) {
        lat = r.city.coord.lat;
        lon = r.city.coord.lon;
        var cityTitle = $("<h2>").text(r.city.name + "   ");
        var dislayPic = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + r.list[0].weather[0].icon + "@2x.png");
        var cityTemp = $("<p>").text("Temperature: " + ((r.list[0].main.temp - 273.15)*1.8+32).toFixed(0) + " degrees fahrenheit");
        var cityHumidity = $("<p>").text("Humidity: " + r.list[0].main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + r.list[0].wind.speed + " MPH");
        currentConditionsEl.append(cityTitle.append(dislayPic), cityTemp, cityHumidity, windSpeed);
        
        fullQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=19ead611ac1f13b1c00469e35bb98b61";
        $.ajax({
            url: fullQueryURL,
            method: "GET"
        }).then(function(re) {
            var uvIndex = $("<p>").text("UV Index: " + re.current.uvi).attr("id", "uv");
            if (re.current.uvi < 3) {uvIndex.attr("id", "uv-low")};
            if (re.current.uvi > 8) {uvIndex.attr("id", "uv-high")};
            currentConditionsEl.append(uvIndex);
            var fiveDayForecast = re.daily
            console.log(fiveDayForecast);
            for (var i = 1; i < 6; i++) {
                var forecastCard = $("<div>").attr("class", "col-lg-2")
                var forecastDate = $("<h6>").text(moment().add(i,'days').format("L"));
                var forecastPicIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDayForecast[i].weather[0].icon + "@2x.png");
                var forecastTemp = $("<p>").text("Temp: " + ((fiveDayForecast[i].temp.day - 273.15)*1.8+32).toFixed(0) + "F");
                var forecastHumid = $("<p>").text("Humidity: " + fiveDayForecast[i].humidity + "%");

                forecastEl.append(forecastCard.append(forecastDate, forecastPicIcon, forecastTemp, forecastHumid));
            }   
        });
    });
    
}        


function recall () {
    runSecondSearch($(this).text());
    loadHistorySearch();
}
