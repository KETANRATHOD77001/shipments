import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

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
                <div className="main">
                    <p className="header">{weatherData.location.name}</p>
                    <div>
                        <p className="day">Weather: {weatherData.current.condition.text}</p>
                    </div>

                    <div>
                        <p className="temp">Temprature: {weatherData.current.temp_c} &deg;C</p>
                    </div>

                </div>
            )}
        </div>
    );
};

export default WeatherApp;
