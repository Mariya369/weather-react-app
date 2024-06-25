import React, { useState, useEffect, useCallback } from "react";
import Weatherinfo from "./Weatherinfo";
import WeatherForecast from "./WeatherForecast";
import WeatherForm from "./WeatherForm";
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
            coordinates: { lat: response.data.coord.lat, lon: response.data.coord.lon },
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
        if (error.response && error.response.status === 404) {
        setError("City not found. Please try again.");
        } else {
                setError("An unexpected error occurred. Please try again.");
        }
        setWeatherData({ ready: false });
    }, []);

    const search = useCallback((city) => {
        if (!city) {
            setError("Please enter a valid city name.");
            return;
        }
        const apiKey = "bbc8f006b72647441651bc61b971531f";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse).catch(handleError);
    }, [handleResponse, handleError]);

    useEffect(() => {
        search(defaultCity);
    }, [defaultCity, search]);

    const debouncedSearch = useCallback(debounce((cityName) => {
        setCity(cityName);
        search(cityName);
    }, 500), [search]);

        return (
        <div className="Weather">
           <WeatherForm onSearch={debouncedSearch} />
            {error && <div className="alert alert-danger">{error}</div>}
            {weatherData.ready ? (
                <>
                <Weatherinfo data={weatherData} />
                <WeatherForecast coordinates={weatherData.coordinates} />
                </>
            ) : (
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
            )}
            </div>
        );
        } 
    
    function debounce (func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }
