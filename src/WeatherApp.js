import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = '65c21707711b499ba8b64515232108';
    const API_BASE_URL = 'http://api.weatherapi.com/v1/current.json';

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(API_BASE_URL, {
                params: {
                    q: city,
                    key: API_KEY,
                    aqi: 'no',
                },
            });
            setWeatherData(response.data);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeatherData}>Get Weather</button>
            {weatherData && (
                <div>
                    <h2>{weatherData.location.name}</h2>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Weather: {weatherData.current.condition.text}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
