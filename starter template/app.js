// Tutorial by http://youtube.com/CodeExplained
// api key : 826ccef81fe193561c53a72451ba51ba


//step1. select elements
const iconElement =document.querySelector('.weather-icon');
const tempElement=document.querySelector('.temperature-value');
const tempDescriptionElement=document.querySelector('.temperature-description');
const locationElement=document.querySelector('.location');
const notification=document.querySelector('.location');


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
        console.log(data)
        return data;
        //here we update our weather object
    }).then((data)=>{
        weather.temerature.value=Math.floor(data.main.temp-Kelvin);
        weather.description=data.weather[0].description;
        weather.icon=data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    //now we need to display weather object data to the user(UI).
    }).then(()=>{
            displayWeather();
    })
    .catch(err=>{
        console.log(err)
    })
}
function displayWeather(){
    //here we change innerHtml of our element
    iconElement.innerHTML=`<img src="icons/${weather.icon}.png"/>`
    tempElement.innerHTML=`${weather.temerature.value}°<span>C</span>`;
    tempDescriptionElement.innerHTML=`${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
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
    
