const apiKey = "a11b257e77b811a987bcdf9f0bc82e6a";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
document.querySelector(".error").style.display = "block";
document.querySelector(".weather").style.display = "none";



    } else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round( data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = "%" + data.main.humidity;
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/sa";
    
        if(data.weather[0].main =="Clouds"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1163/1163624.png";
        }
        else if(data.weather[0].main =="Clear"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/869/869869.png";
        }
        else if(data.weather[0].main =="Rain"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4735/4735072.png";
        }
        else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1163/1163657.png";
        }
        else if(data.weather[0].main =="Mist"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/11492/11492160.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    }

  

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    
})

checkWeather();