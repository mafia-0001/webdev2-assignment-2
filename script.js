console.log("Program started");

function searchWeather(){

var city=document.getElementById("city").value;

if(city==""){
document.getElementById("result").innerHTML="Enter city name";
return;
}

getWeather(city);

}


async function getWeather(city){

console.log("Before fetch");

try{

// using free API with fixed coordinates (example: Delhi)

var response=await fetch(
"https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true"
);

var data=await response.json();

console.log("After fetch");

showWeather(city,data);

saveHistory(city);

}catch(error){

console.log("Error:",error);
document.getElementById("result").innerHTML="Network Error";

}

}


function showWeather(city,data){

var temp=data.current_weather.temperature;
var wind=data.current_weather.windspeed;

document.getElementById("result").innerHTML=
"City : "+city+"<br>"+
"Temperature : "+temp+" °C<br>"+
"Wind Speed : "+wind+" km/h";

}


function saveHistory(city){

var cities=localStorage.getItem("cities");

if(cities==null){
cities=[];
}else{
cities=JSON.parse(cities);
}

cities.push(city);

localStorage.setItem("cities",JSON.stringify(cities));

loadHistory();

}


function loadHistory(){

var cities=localStorage.getItem("cities");

if(cities==null){
return;
}

cities=JSON.parse(cities);

var historyDiv=document.getElementById("history");

historyDiv.innerHTML="";

for(var i=0;i<cities.length;i++){

var btn=document.createElement("button");

btn.innerHTML=cities[i];

btn.onclick=function(){
searchFromHistory(this.innerHTML);
};

historyDiv.appendChild(btn);

}

}


function searchFromHistory(city){

document.getElementById("city").value=city;

getWeather(city);

}

loadHistory();


// Promise example (.then and .catch)

fetch("https://jsonplaceholder.typicode.com/posts/1")
.then(function(response){
return response.json();
})
.then(function(data){
console.log("Promise example",data);
})
.catch(function(error){
console.log("Promise error",error);
});