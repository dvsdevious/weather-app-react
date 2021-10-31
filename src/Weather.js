import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast"
import axios from "axios";
import "./Weather.css"


export default function Weather(props) {
  const [city, setCity] = useState(props.deafaultCity);
  const [weatherData, setWeatherData] = useState({ready:false});

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
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0480346da20b22ca13a5aaa0631d64b&units=metric`;
    axios.get(apiURL).then(displayWeather);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city" onChange={updateCity} />
      <button type="submit"> Search </button>
    </form>
  );

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
            value="Search"
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
    return "Loading..."
  }
}
