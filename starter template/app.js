
//step1. select elements
const iconElement =document.querySelector('.weather-icon');
const tempElement=document.querySelector('.temperature-value');
const tempDescriptionElement=document.querySelector('.temperature-description');
const locationElement=document.querySelector('.location');
const notification=document.querySelector('.location');
const searchBox=document.querySelector(".search-box");
console.log(searchBox)

//adding keypress eventlener to inputbox
searchBox.addEventListener("keypress",e=>{
    //13 is keycode for enter key
    if(e.keyCode==13){
        //calling getResults function and passing city name when click enter key
        getResults(searchBox.value);
        console.log(searchBox.value)
    }
})




//App data
const weather={
    
}
weather.temerature={
    unit:"celcius"
}

//const kelvin and api key
const Kelvin=273;
const apiKey="826ccef81fe193561c53a72451ba51ba";

//check browser support geolaction or not
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    notification.style.display="block";
    notification.innerHTML="<p>Browser does not sport geolocation</p>"

}

//now we need to set user's position
function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    //after getting latitude and longitude we need to call getWeather() function imediately
    getWeather(latitude,longitude);
}
function showError(error){
    notification.innerHTML=`<P>${error.message}</p>`
}
//getWeather from api provider
function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    console.log(api);
    //here we use fetch ,fetch return promise
    fetch(api).then((response)=>{
        let data=response.json();
        // console.log(data)
        return data;
        //here we update our weather object
    }).then((data)=>{
      // console.log(data)
      displayWeather(data)
      
    //now we need to display weather object data to the user(UI).
    })
    .catch(err=>{
        console.log(err)
    })
}
function displayWeather(data){
    //here we change innerHtml of our element
    weather.temerature.value=Math.floor(data.main.temp-Kelvin);
    weather.description=data.weather[0].description;
    weather.icon=data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    iconElement.innerHTML=`<img src="icons/${weather.icon}.png"/>`
    tempElement.innerHTML=`${weather.temerature.value}°<span>C</span>`;
    tempDescriptionElement.innerHTML=`${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}


function getResults(city){
let citySearchApi=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
fetch(citySearchApi)
// console.log(citySearchApi)
.then(weather=>{
    
    return weather.json();

})

.then((data)=>{


  displayWeather(data)
})//passing response (weather )object

}
function celeciusToFahrenite(temperature) {
    return (temperature *9/5)+32 ;

}
//when user click on temperature element

    tempElement.addEventListener("click",()=>{
        if(weather.temerature.value===undefined){
            rerturn;
        
        }
        if(weather.temerature.unit=="celcius"){
            let fahrenite=celeciusToFahrenite(weather.temerature.value);
            fahrenite=Math.floor(fahrenite);

            tempElement.innerHTML=`${fahrenite}°<span>F</span>`;
            weather.temerature.unit="fahrenite";

    }
    else{
        tempElement.innerHTML=`${weather.temerature.value}°<span>C</span>`;
        weather.temerature.unit="celcius";
    }
})
    

// const iconElement = document.querySelector(".weather-icon");
// const tempElement = document.querySelector(".temperature-value");
// const tempDescriptionElement = document.querySelector(
//   ".temperature-description"
// );
// const locationElement = document.querySelector(".location");
// const notification = document.querySelector(".location");
// const searchBox = document.querySelector(".search-box");
// const weather = {};
// weather.temerature = {
//   unit: "celcius",
// };

// console.log(searchBox);

// //adding keypress eventlener to inputbox
// searchBox.addEventListener("keypress", (e) => {
//   //13 is keycode for enter key
//   if (e.keyCode == 13) {
//     //calling getResults function and passing city name when click enter key
//     getResults(searchBox.value);
//     console.log(searchBox.value);
//   }
// });

// //const kelvin and api key
// const Kelvin = 273;
// const apiKey = "826ccef81fe193561c53a72451ba51ba";

// //check browser support geolaction or not
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(setPosition, showError);
// } else {
//   notification.style.display = "block";
//   notification.innerHTML = "<p>Browser does not sport geolocation</p>";
// }

// //now we need to set user's position
// function setPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   //after getting latitude and longitude we need to call getWeather() function imediately
//   getWeather(latitude, longitude);
// }
// function showError(error) {
//   notification.innerHTML = `<P>${error.message}</p>`;
// }

// const setWeatherData = (data) => {
//   if (!data) {
//     return;
//   }
//   weather.temerature.value = Math.floor(data.main.temp - Kelvin);
//   weather.description = data.weather[0].description;
//   weather.icon = data.weather[0].icon;
//   weather.city = data.name;
//   weather.country = data.sys.country;
//   iconElement.innerHTML = `<img src="icons/${weather.icon}.png"/>`;
//   tempElement.innerHTML = `${weather.temerature.value}°<span>C</span>`;
//   tempDescriptionElement.innerHTML = `${weather.description}`;
//   locationElement.innerHTML = `${weather.city}, ${weather.country}`;
// };

// //getWeather from api provider
// function getWeather(latitude, longitude) {
//   let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

//   //here we use fetch ,fetch return promise
//   fetch(api)
//     .then((response) => {
//       let data = response.json();
//       console.log(data);
//       return data;
//       //here we update our weather object
//     })
//     .then((data) => {
//       setWeatherData(data);
//       //now we need to display weather object data to the user(UI).
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function getResults(city) {
//   let citySearchApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

//   fetch(citySearchApi)
//     .then((response) => response.json())
//     .then((data) => setWeatherData(data));
// }

// function celeciusToFahrenite(temperature) {
//   return (temperature * 9) / 5 + 32;
// }
// //when user click on temperature element

// tempElement.addEventListener("click", () => {
//   if (weather.temerature.value === undefined) {
//     return;
//   }
//   if (weather.temerature.unit == "celcius") {
//     let fahrenite = celeciusToFahrenite(weather.temerature.value);
//     fahrenite = Math.floor(fahrenite);

//     tempElement.innerHTML = `${fahrenite}°<span>F</span>`;
//     weather.temerature.unit = "fahrenite";
//   } else {
//     tempElement.innerHTML = `${weather.temerature.value}°<span>C</span>`;
//     weather.temerature.unit = "celcius";
//   }
// });