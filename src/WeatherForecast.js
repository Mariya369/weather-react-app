import React from "react";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";

import "./WeatherForecast.css"

export default function WeatherForecast(props) {
    function handleResponse(response) {
        console.log(response.data);
    }
    console.log(props);

    let apiKey = "bbc8f006b72647441651bc61b971531f";
    let latitude = 74; 
    let longitude = 40.7;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
    return (
        <div className="WeatherForecast">
            <div className="row">
                <div className="col">
                    <div className="WeatherForecast-day">Thu</div>
                    <WeatherIcon code="01d" size={36} />
                    <div className="WeatherForecast-temperature">
                        <span className="WeatherForecast-temperature-max">19º</span> 
                        <span className="WeatherForecast-temperature-min">10º</span>
                        </div>
                </div>
            </div>
        </div>
    );
}