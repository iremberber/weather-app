
const apiKey = "a11b257e77b811a987bcdf9f0bc82e6a";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


const body = document.querySelector(".body");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const resultsBox = document.querySelector(".result-box");
const detail = document.querySelector(".detail")
const card = document.querySelector(".card")

const istanbulDiv = document.getElementById("istanbul");
const newYorkDiv = document.getElementById("newyork");
const londonDiv = document.getElementById("london");
const sehirler = document.getElementById("sehirler");

const citycard = document.getElementById("citycard");
const arrowimg = document.getElementById("arrowimg");
const search2 = document.querySelector(".search2")
const startButton = document.getElementById("startButton")
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
  
    function displayWeather(city, divElement) {
        fetch(apiUrl + city + `&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    const temperature = Math.round(data.main.temp) + "°C";
                    const humidity = "%" + data.main.humidity;
                    const windSpeed = data.wind.speed + "km/sa";
    
                    const weatherHTML = `
                        <h1 class="temp">${temperature}</h1>
                        <h2 class="city">${city}</h2>
                        <div class="detail">
                            <div class="col">
                                <img src="https://cdn-icons-gif.flaticon.com/11095/11095576.gif" id="drop">
                                <div>
                                    <p class="humidity">${humidity}</p>
                                    <p>Nem</p>
                                </div>
                            </div>
                            <div class="col">
                                <img src="https://cdn-icons-gif.flaticon.com/6455/6455039.gif" id="wind">
                                <div>
                                    <p class="wind">${windSpeed}</p>
                                    <p>Rüzgar Hızı</p>
                                </div>
                            </div>
                        </div>
                    `;
    
                    divElement.innerHTML = weatherHTML;
                } else {
                    divElement.innerHTML = "Hava durumu bulunamadı.";
                }
            })
            .catch((error) => {
                divElement.innerHTML = "Hava durumu bilgileri alınırken bir hata oluştu.";
            });
    }
    displayWeather("Istanbul", istanbulDiv);
    displayWeather("New York", newYorkDiv);
    displayWeather("London", londonDiv);

   
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    resultsBox.innerHTML = '';
    citycard.style.marginLeft= "-470px";
    
})

let isCityCardVisible = false;


arrowimg.style.cursor = "pointer";

arrowimg.addEventListener("click", () => {
    isCityCardVisible = !isCityCardVisible;
    
   
    if (isCityCardVisible) {
        citycard.style.marginLeft = "0";
    } else {
        citycard.style.marginLeft = "-420px"; 
    }

    if (isCityCardVisible) {
        citycard.classList.add("visible");
    } else {
        citycard.classList.remove("visible");
    }

});

async function getCityWeather(cityName, resultBox) {
    const apiKey = "a11b257e77b811a987bcdf9f0bc82e6a";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    try {
        const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
        if (response.status === 200) {
            const data = await response.json();
            const temperature = Math.round(data.main.temp) + "°C";
            const humidity = "%" + data.main.humidity;
            const windSpeed = data.wind.speed + "km/sa";

            const weatherHTML = `
                <h1 class="temp">${temperature}</h1>
                <h2 class="city">${cityName}</h2>
                <div class="detail">
                    <div class="col">
                        <img src="https://cdn-icons-gif.flaticon.com/11095/11095576.gif" id="drop">
                        <div>
                            <p class="humidity">${humidity}</p>
                            <p>Nem</p>
                        </div>
                    </div>
                    <div class="col">
                        <img src="https://cdn-icons-gif.flaticon.com/6455/6455039.gif" id="wind">
                        <div>
                            <p class="wind">${windSpeed}</p>
                            <p>Rüzgar Hızı</p>
                        </div>
                    </div>
                </div>
            `;

            resultBox.innerHTML = weatherHTML;
        } else {
            resultBox.innerHTML = "Hava durumu bilgisi bulunamadı.";
        }
    } catch (error) {
        resultBox.innerHTML = "Hava durumu bilgileri alınırken bir hata oluştu.";
    }
}

document.getElementById("input-box2").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const cityName = document.getElementById("input-box2").value;
        const resultBox = document.querySelector(".result-box2");
        getCityWeather(cityName, resultBox);
    }
});

document.querySelector(".search2 button").addEventListener("click", () => {
    const cityName = document.getElementById("input-box2").value;
    const resultBox = document.querySelector(".result-box2");
    getCityWeather(cityName, resultBox);
});

startButton.addEventListener("click", function () {
    search2.style.display = "flex";
    startButton.style.display = "none";
  });

checkWeather();

