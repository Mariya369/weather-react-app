import React from "react";
import "./Weather.css";

export default function Weather() {
    return (
    <div className="Weather">
        <form>
            <div className="row">
                <div className="col-9">
            <input type="search" placeholder="Enter a city..." className="form-control" />
            </div>
            <div className="col-3">
            <input type="submit" value="Search" className="btn btn-primary"/>
            </div>
            </div>
        </form>
        <h1>Lisbon</h1>
        <ul>
            <li>Wednesday 07:00</li>
            <li>Mostly clooudy</li>
            </ul>
            <div className="row">
                <div className="col-6">
                    <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="Sunny" />
                    26 ºC I ºF
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