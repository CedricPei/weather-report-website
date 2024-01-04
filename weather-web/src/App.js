import React, { useState, useEffect } from 'react';
import './App.css'; 

// npm vs yarn? pros and cons
// how to deploy this to S3? 

const App = () => {
  const [address, setAddress] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const defaultLocations = ['Singapore', 'Kuala Lumpur', 'Beijing'];
    // why forEach and not map?
    defaultLocations.forEach((location) => fetchWeatherData(location));
    // what does [] mean if this have any values inside;
    // i.e. [address]
    // when does infinite loop happens; how to prevent;
  }, []);

  const handleInput = (event) => {
    setAddress(event.target.value);
  };

  const fetchWeatherData = (location) => {
    const url = `http://localhost:3001/?address=${location}`;
    // explore/modify to use axios
    // consider to generic & reusable function tobe used in web-server code;
    // consider using async await; what is diff of async/await to then/catch
    fetch(url)
      .then((response) => response.json())
      .then((weatherData) => {
        // explore guard statement; i.e. return early (good coding practice)
        if (weatherData.error) {
          console.error(`Error fetching weather data for ${location}:`, weatherData.error);
        } else {
          setData((prevData) => ({ ...prevData, [location]: weatherData }));
        }
      })
      .catch((fetchError) => {
        console.error(`Error fetching weather data for ${location}:`, fetchError);
        setError(fetchError);
      });
  };

  const fetchData = () => {
    setError(null);
    // explore guard statement; i.e. return early (good coding practice)
    if (address) {
      fetchWeatherData(address);
    } else {
      setError('Please enter an address.');
    }
  };

  return (
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <label className="input-label">Enter City(Region) Name: </label>
        <input
          type="text"
          value={address}
          onChange={handleInput}
          className="input-field"
        />
        <button onClick={fetchData} className="fetch-button">
          Get Weather
        </button>
      </div>
      {error && <p className="error-message">{error.toString()}</p>}
      {data[address] && (
        <div className="weather-info">
          <div>
            <p>{data[address].country} {data[address].region}</p>
            <p>{data[address].description}</p>
            <p className="temperature-label"> Temperature: {data[address].temperature}</p>
            <p className="body-temperature-label"> Feels like: {data[address].body_temperature}</p>
            <p>Humidity: {data[address].humidity} g/m^3</p>
            <p>Visibility: {data[address].visibility} km</p>
          </div>
        </div>
      )}
      
      <div className="fixed-cities">
        {/* 
        consider making this as a separate component; (higher order component)
        what is props drilling; how to prevent;
        explore state management like redux/recoil/mobx? 
        possible to give pros and cons;
       */}
        {data['Singapore'] && (
          <div>
            <h2>Singapore</h2>
            <p>{data['Singapore'].description}</p>
            <p className="temperature-label"> Temperature: {data['Singapore'].temperature}</p>
            <p className="body-temperature-label"> Feels Like: {data['Singapore'].body_temperature}</p>
            <p>Humidity: {data['Singapore'].humidity} g/m^3</p>
            <p>Visibility: {data['Singapore'].visibility} km</p>
          </div>
        )}
        {data['Kuala Lumpur'] && (
          <div>
            <h2>Kuala Lumpur</h2>
            <p>{data['Kuala Lumpur'].description}</p>
            <p className="temperature-label"> Temperature: {data['Kuala Lumpur'].temperature}</p>
            <p className="body-temperature-label"> Feels like: {data['Kuala Lumpur'].body_temperature}</p>
            <p>Humidity: {data['Kuala Lumpur'].humidity} g/m^3</p>
            <p>Visibility: {data['Kuala Lumpur'].visibility} km</p>
          </div>
        )}
        {data['Beijing'] && (
          <div>
            <h2>Beijing</h2>
            <p>{data['Beijing'].description}</p>
            <p className="temperature-label"> Temperature: {data['Beijing'].temperature}</p>
            <p className="body-temperature-label"> Feels like: {data['Beijing'].body_temperature}</p>
            <p>Humidity: {data['Beijing'].humidity} g/m^3</p>
            <p>Visibility: {data['Beijing'].visibility} km</p>
          </div>
        )}
      </div>
    </div>
  );
  }

export default App;
