
$(document).ready(function() {

//event listeners (only 2 in whole project)
$("search-button").on("click", function (){

})

$(".history").on("click", "li", function(){
    
})

//functions
function makeRow(text){

}

function getForecast(searchValue){

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