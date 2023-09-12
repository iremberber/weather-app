
const apiKey = "a11b257e77b811a987bcdf9f0bc82e6a";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


const body = document.querySelector(".body");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const resultsBox = document.querySelector(".result-box");

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
    
        if(data.weather[0].main =="Clouds"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1163/1163624.png";
            body.style.background = "url('https://images.alphacoders.com/744/thumb-1920-744574.jpg')";
        }
        else if(data.weather[0].main =="Clear"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/869/869869.png";
            body.style.background = "url('https://images.unsplash.com/photo-1609376224342-8902c39a3675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBibHVlJTIwc2t5fGVufDB8fDB8fHww&w=1000&q=80')"
        }
        else if(data.weather[0].main =="Rain"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4735/4735072.png";
            body.style.background = "url('https://wallpaperaccess.com/full/3886828.jpg')"
        }
        else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1163/1163657.png";
            body.style.background = "url('https://cdn.wallpapersafari.com/80/79/6JmCqO.jpg')"
        }
        else if(data.weather[0].main =="Mist"){
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/11492/11492160.png";
            body.style.background = "url('https://4kwallpapers.com/images/wallpapers/mountains-blue-sky-mountain-range-fog-peak-3840x2160-5364.jpg')"
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

