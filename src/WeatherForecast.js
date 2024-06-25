import React, { useState, useEffect } from "react";
import { Rings } from 'react-loader-spinner';
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css"


export default function WeatherForecast({ coordinates }) {
const [forecastData, setForecastData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
if (coordinates) {
const apiKey = "bbc8f006b72647441651bc61b971531f";
    const { lat, lon } = coordinates;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(response => {
        console.log(response.data);
        setForecastData(response.data);
        })
    .catch(error => {
        setError(error.response ? error.response.data : "Error fetching data");
        console.error("Error fetching data", error);
        });
    }
}, [coordinates]);

if (error) {
    return <div className="WeatherForecast">Error: {error.message || error}</div>;
}

if (!forecastData || !forecastData.daily) {
    return (
    <div className="WeatherForecast">
        <Rings
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
    );
}

    return (
        <div className="WeatherForecast">
            <div className="row">
                {forecastData.daily.slice(0,5).map((day, index) => (
                <div className="col" key={index}>
                    < WeatherForecastDay day={day} />
                </div>
                ))}
                </div>
        </div>
    );
}