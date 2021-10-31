import react from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherIcon(props) {
    const codeMapping = {
        "01d": "CLEAR_SKY",
        "01n": "CLEAR_SKY",
        "02d": "PARTLY_CLOUDY",
        "02n": "PARTLY_CLOUDY",
        "03d": "MOSTLY_CLOUDY",
        "03n": "MOSTLY_CLOUDY",
        "04d": "CLOUDY",
        "04": "CLOUDY",
        "09d": "SHOWERS",
        "09n": "SHOWERS",
        "10d":"RAIN",
        "10n":"RAIN",
        "11d":"THUNDERSTORMS",
        "11n":"THUNDERSTORMS",
        "13d":"SNOW",
        "13n":"SNOW",
        "50d":"FOG",
        "50n":"FOG"
    };

return (
    <ReactAnimatedWeather
    icon={codeMapping[props.code]}
    color="#1e1e1e"
    size={props.size}
    animate={true}
    />
);
}