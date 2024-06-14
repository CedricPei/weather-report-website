import React from 'react';

const WeatherComponent = ({ data, location }) => {
  return (
    data[location] && (
      <div className="weather-info">
        <div>
          <p>{location}</p>
          <p>{data[location].description}</p>
          <p className="temperature-label"> Temperature: {data[location].temperature}</p>
          <p className="body-temperature-label"> Feels like: {data[location].body_temperature}</p>
          <p>Humidity: {data[location].humidity} g/m^3</p>
          <p>Visibility: {data[location].visibility} km</p>
        </div>
      </div>
    )
  );
};

export default WeatherComponent;
