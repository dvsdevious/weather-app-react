import react, { useState, useEffect } from "react"; 
import axios from "axios"; 
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForeacast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null); 

    useEffect(() => {
        setLoaded(false);
    }, [props.coordinates]); 

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    function load() {
        let apiKey = "bdabbf0c02b5834884ae57b06f6ac74f";
        let longitude=props.coordinates.lon;
        let latitude = props.coordinates.lat;
        let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    
    axios.get(apiURL).then(handleResponse);
    }

    if (loaded) {
        return (
            <div className="WeatherForecast">
                <div className="row">
                    {forecast.map(function (dailyForecast, index) {
                        if (index<5) {
                            return (
                                <div className="col" key={index}>
                                    <WeatherForecastDay data={dailyForecast}/>
                                    </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    } else {
        load();

        return null;
    }
}