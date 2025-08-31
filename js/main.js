
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

    const weatherUrl = `http://www.7timer.info/bin/api.pl?lon=${foundCity.longitude}&lat=${foundCity.latitude}&product=civillight&output=json`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data,foundCity);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function getWeatherDescription(weatherCode) {
    // This is a simplified mapping for the CIVIL product.
    // You may need to adjust based on the exact codes you see.
    const weatherMap = {
        'clear': 'Clear',
        'pcloudy': 'Partly Cloudy',
        'mcloudy': 'Mostly Cloudy',
        'cloudy': 'Cloudy',
        'humid': 'Humid',
        'lightrain': 'Light Rain',
        'oshower': 'Occasional Showers',
        'ishower': 'Isolated Showers',
        'rain': 'Rain',
        'snow': 'Snow',
        'rainsnow': 'Rain and Snow',
        'ts': 'Thunderstorm',
        'tsrain': 'Thunderstorm with Rain'
    };
 
    return weatherMap[weatherCode] || weatherCode;
}


function displayWeatherData(data, city) {
    const result = document.getElementById('weatherResult');
   
    if (!data || !data.dataseries) {
        result.innerHTML = '<div class="error">No weather data available for this location.</div>';
        return;
    }
    
    console.log("CIVIL Light API Data:", data); 

    // Generate HTML for the 7-day forecast
    let forecastHTML = `<h2>7-Day Forecast for ${city.city}</h2><div class="weather-week">`;

    
    data.dataseries.forEach(stamp => {
        const maxTemp = stamp.temp2m.max;
        const minTemp = stamp.temp2m.min;
        const weatherDesc = stamp.weather;
       
    });


}