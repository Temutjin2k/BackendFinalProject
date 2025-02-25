
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.179498, lng: 51.340375 },
        zoom: 15
    })
}

async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfoDiv = document.getElementById('weather-info');
    const body = document.querySelector('body');


    if (!city) {
        weatherInfoDiv.innerHTML = '<p style="color: red;">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            weatherInfoDiv.innerHTML = `
                <img class="icon" src="${data.icon}" alt="Weather icon">
                <p><strong>Temperature:</strong> ${data.temperature}°C</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Feels Like:</strong> ${data.feelsLikeTemperature}°C</p>
                <p><strong>Humidity:</strong> ${data.humidity}%</p>
                <p><strong>Pressure:</strong> ${data.pressure} mb</p>
                <p><strong>Wind Speed:</strong> ${data.windSpeed} kph</p>
                <p><strong>Country Code:</strong> ${data.countryCode} </p>
                <p><strong>Coordinates:</strong> Lat: ${data.coordinates.lat}, Lon: ${data.coordinates.lon}</p> 
            `;

            temperature = data.temperature
            if (temperature > 20) {
                body.style.backgroundImage = "url('assets/hot.jpg')";
            } else if (temperature > 0) {
                body.style.backgroundImage = "url('assets/warm.jpg')";
            } else if (temperature > -10) {
                body.style.backgroundImage = "url('assets/background.png')";
            } else {
                body.style.backgroundImage = "url('assets/cold.jpg')";
            }

            const lat = data.coordinates.lat;
            const lng = data.coordinates.lon;

            map.setCenter({ lat: lat, lng: lng });
            map.setZoom(10);
        } else {
            weatherInfoDiv.innerHTML = `<p style="color: red;">${data.message || 'Failed to fetch weather data.'}</p>`;
        }
    } catch (error) {
        console.log(error)
        weatherInfoDiv.innerHTML = `<p style="color: red;">Failed to fetch weather data.</p>`;
    }
}

initMap()
