fetch("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json")
.then(response=>{
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data=>{
    console.log(data);
})
.catch(error=>{
    console.error('Error fetching weather data:', error);
});