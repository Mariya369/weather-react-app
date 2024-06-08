import React, { useState } from "react";
import axios from "axios";

import "./Weather.css";
import Weatherinfo from "./Weatherinfo";

export default function Weather(props) {
    const [ready, setReady] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    function handleResponse(response) {
        setWeatherData ({
            ready: true,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date (response.data.dt * 1000),
            description: response.data.weather[0].description,
            iconUrl: "https://ssl.gstatic.com/onebox/weather/64/rain.png",
            wind: response.data.wind.speed,
            city: response.data.name
        });

        setReady(true);
    }
    if (weatherData.ready) {

    return (
    <div className="Weather">
        <form>
            <div className="row">
                <div className="col-9">
            <input type="search" placeholder="Enter a city..." 
            className="form-control"
            autoFocus="on"
             />
            </div>
            <div className="col-3">
            <input 
            type="submit" value="Search" 
            className="btn btn-primary w-100"/>
            </div>
            </div>
        </form>
        <Weatherinfo data={weatherData}/>
        </div>
    );
    }   else {
    const apiKey = "28913bc91722d453416f8f629fbd6b7d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading..."
    }
}