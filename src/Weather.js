import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
    const [temperature, setTemperature] = useState(null);
    function handleResponse(response) {
        console.log(response.data);
        setTemperature(response.data.main.temp);
    }
    const apiKey = "28913bc91722d453416f8f629fbd6b7d";
    let city = "Lisbon";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=
    ${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
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
        <h1>Lisbon</h1>
        <ul>
            <li>Wednesday 07:00</li>
            <li>Sunny</li>
            </ul>
            <div className="row mt-3">
                <div className="col-6">
                    <div className="clearfix">
                    <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" 
                    alt="Sunny"
                    className="float-left"
                     />
                    <span className="temperature">26</span> 
                    <span className="unit">ºC I ºF</span>
                    </div> 
                </div>
                <div className="col-6">
                    <ul>
                        <li>
                            Precipitation: 0%
                        </li>
                        <li>
                            Humidity: 47%
                        </li>
                        <li>
                            Wind: 10 km/h
                        </li>
                    </ul>
                </div>
            </div>

            </div>
    );
}