
let cities = [];

function loadCitiesData() {
    return new Promise((resolve, reject) => {
        Papa.parse('../city_coordinates.csv', {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                console.log("CSV data loaded successfully:", results.data);
                cities = results.data;
                resolve();
            },
            error: function(err) {
                console.error("Error parsing CSV:", err);
                reject(err);
            }
        });
    });
}

window.onload = function(){
    loadCitiesData().then(() => {
        populateCityList();
        setupSearch();
    });
}

function populateCityList(){
    const dataList = document.getElementById('cityList');
    dataList.innerHTML = ''; // Clear previous options

    cities.forEach(city=>{
        const option = document.createElement('option');
        option.value = `${city.city}, ${city.country}`;
        dataList.appendChild(option);
    })
}

function setupSearch(){
    const searchInput = document.getElementById('citySearch');

    searchInput.addEventListener('keypress',function(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            searchWeather();
        }
    })
}

function searchWeather(){
    const searchInput = document.getElementById('citySearch').value;
    console.log("Searching weather for:", searchInput);

    const cityName = searchInput.split(",")[0].trim();

    const foundCity = cities.find(city => city.city === cityName);
    console.log("Found city lat:", foundCity.latitude);
    console.log("Found city long:", foundCity.longitude);

    const weatherUrl = `http://www.7timer.info/bin/api.pl?lon=${foundCity.longitude}&lat=${foundCity.latitude}&product=civil&output=json`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data,foundCity);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

