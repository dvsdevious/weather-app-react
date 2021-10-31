import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast"
import axios from "axios";


export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ready:false});
  const [city, setCity] = useState(props.deafaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready:true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt*1000),
      city: response.data.name,
      coordinates: response.data.coord,
      
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    let apiKey = "bdabbf0c02b5834884ae57b06f6ac74f"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input 
              type="search"
              placeholder="Enter a city..."
              className="form-control"
              autoFocus="on"
              onChange={handleCityChange}
              />
          </div>
          <div className="col-3">
            <input 
            type="submit"
            value="search"
            className="btn btn-primary w-100"
            />
          </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates}/>
      </div>
    );
  } else {
    search();
    return "Loading"
  }
}
