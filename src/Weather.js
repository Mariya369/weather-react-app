import React, { useState, useEffect, useCallback } from "react";
import Weatherinfo from "./Weatherinfo";
import WeatherForecast from "./WeatherForecast";
import { Rings } from 'react-loader-spinner';
import axios from "axios";
import "./Weather.css";

export default function Weather({ defaultCity }) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(defaultCity);
    const [error, setError] = useState(null);
   
   const handleResponse = useCallback((response) => {
        setWeatherData ({
            ready: true,
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date (response.data.dt * 1000),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            wind: response.data.wind.speed,
            city: response.data.name
        });
        setError(null);
    }, []);

    const handleError = useCallback((error) => {
        setError("City not found. Please try again.");
        setWeatherData({ ready: false });
    }, []);

    const search = useCallback(() => {
        const apiKey = "bbc8f006b72647441651bc61b971531f";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse).catch(handleError);
    }, [city, handleResponse, handleError]);

    useEffect(() => {
        search();
    }, [search]);

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    if (weatherData.ready) {
    return (
    <div className="Weather">
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-9">
            <input type="search" placeholder="Enter a city..." 
            className="form-control"
            autoFocus="on"
            onChange={handleCityChange}
             />
            </div>
            <div className="col-3">
            <input 
            type="submit" value="Search" 
            className="btn btn-primary w-100" />
            </div>
            </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        <Weatherinfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
    );
    } else {
    return (
    <div className="Weather-spin">
    <Rings
visible={true}
height="80"
width="80"
color="#1e1e1e"
ariaLabel="rings-loading"
wrapperStyle={{}}
wrapperClass="" 
/>
</div>
       );
    }
}