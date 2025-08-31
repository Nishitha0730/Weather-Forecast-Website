
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
    loadCitiesData();
}