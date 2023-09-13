
const apiKey = "a11b257e77b811a987bcdf9f0bc82e6a";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


const body = document.querySelector(".body");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const resultsBox = document.querySelector(".result-box");
const detail = document.querySelector(".detail")

let availableKeywords = [
    'Adana',
'Adıyaman',
'Afyonkarahisar',
'Ağrı',
'Aksaray',
'Amasya',
'Ankara',
'Antalya',
'Ardahan',
'Artvin',
'Aydın',
'Balıkesir',
'Bartın',
'Batman',
'Bayburt',
'Bilecik',
'Bingöl',
'Bitlis',
'Bolu',
'Burdur',
'Bursa',
'Çanakkale',
'Çankırı',
'Çorum',
'Denizli',
'Diyarbakır',
'Düzce',
'Edirne',
'Elazığ',
'Erzincan',
'Erzurum',
'Eskişehir',
'Gaziantep',
'Giresun',
'Gümüşhane',
'Hakkari',
'Hatay',
'Iğdır',
'Isparta',
'Istanbul',
'Izmir',
'Kahramanmaraş',
'Karabük',
'Karaman',
'Kars',
'Kastamonu',
'Kayseri',
'Kilis',
'Kırıkkale',
'Kırklareli',
'Kırşehir',
'Kocaeli',
'Konya',
'Kütahya',
'Malatya',
'Manisa',
'Mardin',
'Mersin',
'Muğla',
'Muş',
'Nevşehir',
'Niğde',
'Ordu',
'Osmaniye',
'Rize',
'Sakarya',
'Samsun',
'Siirt',
'Sinop',
'Sivas',
'Şanlıurfa',
'Şırnak',
'Tekirdağ',
'Tokat',
'Trabzon',
'Tunceli',
'Uşak',
'Van',
'Yalova',
'Yalova',
'Zonguldak'
]; 

searchBox.onkeyup = function () {
    let result = [];
    let input = searchBox.value;
    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        display(result); 
    } else {
        resultsBox.innerHTML = ''; 
    }
};

function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>"+ content.join('') +"</ul>";
};

function selectInput(list){
    searchBox.value = list.innerHTML;
    searchBtn.click();
    resultsBox.innerHTML = '';
};

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
    
        if(data.weather[0].main =="Clear"){
            weatherIcon.src = "https://cdn-icons-gif.flaticon.com/6455/6455017.gif";
            body.style.background = "#e6f6ff";
            detail.style.color = "#5f9595";
        }
        else if(data.weather[0].main =="Clouds"){
            weatherIcon.src = "https://cdn-icons-gif.flaticon.com/6455/6455024.gif";
            body.style.background = "#cdecff";
            detail.style.color = "#5f9595";
        }
        else if(data.weather[0].main =="Mist"){
            weatherIcon.src = "https://cdn-icons-gif.flaticon.com/6454/6454995.gif";
            body.style.background = "#b3e3ff";
            detail.style.color = "#5f9595";
        }
        else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src = "https://cdn-icons-gif.flaticon.com/6455/6455057.gif";
            body.style.background = "#9adaff";
            detail.style.color = "#5f9595";
        }
        else if(data.weather[0].main =="Rain"){
            weatherIcon.src = "https://cdn-icons-gif.flaticon.com/6455/6455055.gif";
            body.style.background = "#80d0ff";
            detail.style.color = "#5f9595";
        }
         else if(data.weather[0].main =="Snow"){
            weatherIcon.src = "https://cdn-icons-gif.flaticon.com/6455/6455058.gif";
            body.style.background = "#67c7ff";
            detail.style.color = "#5f9595";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    }
  
   
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    resultsBox.innerHTML = '';
    
})

checkWeather();

