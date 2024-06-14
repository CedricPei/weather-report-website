import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherComponent from './WeatherComponent';
import axios from 'axios';

const App = () => {
  const [address, setAddress] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const defaultLocations = ['Singapore', 'Kuala Lumpur', 'Beijing'];
    defaultLocations.forEach((location) => fetchWeatherData(location));
  }, []);

  const handleInput = (event) => {
    setAddress(event.target.value);
  };

  // consider to generic & reusable function tobe used in web-server code;
  const fetchWeatherData = async (location) => {
    const url = `http://localhost:3001/?address=${location}`;
    try {
      const response = await axios.get(url);
      if (response.data.error) {
        console.error(`Error fetching weather data for ${location}:`, response.data.error);
      } else {
        setData((prevData) => ({ ...prevData, [location]: response.data }));
      }
    } catch (fetchError) {
      console.error(`Error fetching weather data for ${location}:`, fetchError);
      setError(fetchError);
    }
  };  

  const fetchData = () => {
    setError(null);
    if (!address) {
      setError('Please enter an address')
      return;
    }
    fetchWeatherData(address)
  };

  // explore state management like redux/recoil/mobx? 
  // possible to give pros and cons;
  return (
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <label className="input-label">Enter City(Region) Name: </label>
        <input type="text" value={address} onChange={handleInput} className="input-field" />
        <button onClick={fetchData} className="fetch-button">
          Get Weather
        </button>
      </div>
      {error && <p className="error-message">{error.toString()}</p>}
      {address && <WeatherComponent data={data} location={address} />}
      <div className="fixed-cities">
        <WeatherComponent data={data} location="Singapore" />
        <WeatherComponent data={data} location="Kuala Lumpur" />
        <WeatherComponent data={data} location="Beijing" />
      </div>
    </div>
  );
  }

export default App;
