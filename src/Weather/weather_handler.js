const axios = require('axios');
const WeatherApi = process.env.WEATHER_KEY

// https://www.weatherapi.com/
async function WeatherHandler(req, resp){
    const city = req.query.city

    if (!city){
        resp.json({error: 'city not provided'})
        resp.status(400)
        return
    }

    try{
        const weatherPromise = axios.get(`http://api.weatherapi.com/v1/current.json?key=${WeatherApi}&q=${city}&aqi=no`)

        const [weatherResponse] = await Promise.all([
            weatherPromise
        ]);

        const weatherData = {
            temperature: weatherResponse.data.current.temp_c,
            description: weatherResponse.data.current.condition.text,
            icon: weatherResponse.data.current.condition.icon,
            coordinates: {
                lat: weatherResponse.data.location.lat,
                lon: weatherResponse.data.location.lon
            },
            feelsLikeTemperature: weatherResponse.data.current.feelslike_c,
            humidity: weatherResponse.data.current.humidity,
            pressure: weatherResponse.data.current.pressure_mb,
            windSpeed: weatherResponse.data.current.wind_kph,
            countryCode: weatherResponse.data.location.country,
            rainVolumeLast3Hours: weatherResponse.data.current.precip_mm
        };

        resp.json(weatherData)
    }catch (error){
        console.log(error)
        resp.json({message: "Something went wrong", error: error})
        resp.status(500)
    }
}

module.exports = WeatherHandler