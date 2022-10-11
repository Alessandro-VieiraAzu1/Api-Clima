// VARIÁVEIS E SELEÃO DE ELEMENTOS
const apiKey = "0e38c94598a44ea458794f1ed32faf3f";
const apiCountryURL = 'https://countryflagsapi.com/png/';

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city');
const temElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-incon');
const countryElemnt = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

// FUNÇÕES
const getWeatherData = async (city) => {
    const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        
    const res = await fetch(apiweatherURL);
    const data = await res.json();
    console.log(data);
    return data;
}

// essa funcão vai esperar a cidade
const showWeatherData = async (city) => {
    const data = await getWeatherData(city)

    cityElement.innerHTML = data.name;
    temElement.innerHTML = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute(
    'src', 
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElemnt.setAttribute(
    'src',
    apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide")

    };


// EVENTOS
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

//Para resgatar o valor digitado no input
    const city = cityInput.value;

    showWeatherData(city);
    console.log(city)
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value

        showWeatherData(city);
    }
})