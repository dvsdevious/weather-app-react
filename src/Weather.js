import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast"
import axios from "axios";
import "./Weather.css"


export default function Weather() {
return (
  <div className="Weather">
    <h1>Moscow</h1>
  
  <ul>
    <li>
      Monday 12:00
    </li>
    <li>
      Mostly Cloudy
    </li>
  </ul>
  <div className="row">
    <div className="col-6">
      <img src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png" alt="Mostly Cloudy"/> 
      6℃
    </div>
    <div className="col-6">
      <ul>
        <li>
          Precipitation: 2%
        </li>
        <li>
          Humidity: 82%
        </li>
        <li>
          Wind: 2 km/h
        </li>
      </ul>
    </div>
  </div>
  </div>
)

function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
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
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0480346da20b22ca13a5aaa0631d64b&units=metric`;
    axios.get(apiURL).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city" onChange={updateCity} />
      <button type="submit"> Search </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}℃</li>
          <li>Wind Speed: {Math.round(weather.wind)} m/s</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li>
            <img src={weather.icon} alt="Weather Icon" />
          </li>
          <li>{weather.description}</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}}
