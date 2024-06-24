import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
import { Rings } from 'react-loader-spinner';
import axios from "axios";

import "./WeatherForecast.css"

export default function WeatherForecast({ coordinates }) {
const [forecastData, setForecastData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {

const apiKey = "8fb74bb7f12004815bbeef0711b4236b";
    const { latitude, longitude } = coordinates;
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(response => {
        console.log(response.data);
        setForecastData(response.data);
    })
    .catch(error => {
        setError(error.response ? error.response.data : "Error fetching data");
        console.error("Error fetching data", error);
    });
}, [coordinates]);
if (error) {
    return <div className="WeatherForecast">Error: {error.message || error }</div>;
}
if (!forecastData || !forecastData.daily) {
    return <div className="WeatherForecast">
          <Rings
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="rings-loading"
wrapperStyle={{}}
wrapperClass=""
/>
</div>;
}

    return (
        <div className="WeatherForecast">
            <div className="row">
                {forecastData.daily.slice(0,5).map((day, index) => (
                <div className="col" key={index}>
                    <div className="WeatherForecast-day">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: `short` })}
                    </div>
                    <WeatherIcon code={day.weather[0].icon} size={36} />
                    <div className="WeatherForecast-temperature">
                        <span className="WeatherForecast-temperature-max">
                            {Math.round(day.temp.max)}º
                            </span> 
                        <span className="WeatherForecast-temperature-min">
                            {Math.round(day.temp.min)}º
                        </span>
                        </div>
                </div>
                ))}
                </div>
        </div>
    );
}