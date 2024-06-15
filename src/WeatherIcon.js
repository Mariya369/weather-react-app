import React from "react";
import ReactAnimatedWeather from 'react-animated-weather';

export default function WeatherIcon(props) {
    if (props.code ==="01d") {
    return (
        <ReactAnimatedWeather
    icon='CLEAR_DAY'
    color="#1e1e1e"
    size={64}
    animate={true}
  />
  );
}
}