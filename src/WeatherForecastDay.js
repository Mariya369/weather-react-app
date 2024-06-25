import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay({ day }) {
    return (
        <div>
        <div className="WeatherForecast-day">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: `short` })}
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
    );
}