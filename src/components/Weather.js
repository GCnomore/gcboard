import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import cloud from "../assets/weatherImg/cloud.png";
import clearsky from "../assets/weatherImg/clearsky.png";
import mist from "../assets/weatherImg/mist.png";
import rain from "../assets/weatherImg/rain.png";
import snow from "../assets/weatherImg/snow.png";
import thunderstorm from "../assets/weatherImg/thunderstorm.png";

export default function Weather() {
  const [weatherInfo, setWeather] = useState();
  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    console.log("getting weather");
    const img = [
      { name: "cloud", src: cloud },
      { name: "clearsky", src: clearsky },
      { name: "mist", src: mist },
      { name: "rain", src: rain },
      { name: "snow", src: snow },
      { name: "thunderstorm", src: thunderstorm },
    ];

    navigator.geolocation.getCurrentPosition(async (success) => {
      const { REACT_APP_WEATHER_API_KEY } = process.env;
      const lat = success.coords.latitude;
      const long = success.coords.longitude;
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${REACT_APP_WEATHER_API_KEY}&units=imperial`
      );
      const weather = {
        name: result.data.name,
        sys: result.data.sys,
        main: result.data.main,
        description: result.data.weather[0].description,
        src: img.find((item) =>
          result.data.weather[0].description.includes(item.name)
        ),
      };

      setWeather(weather);
    });
  };

  return (
    <WeatherContainer>
      {weatherInfo ? (
        <>
          <div>
            <h1>
              {weatherInfo.name}, {weatherInfo.sys.country}
            </h1>
            <h2>{weatherInfo.main.temp} ℉</h2>
          </div>
          <div>
            <img src={weatherInfo.src.src} alt="Weather icon" />
            <h2>{weatherInfo.description.toUpperCase()}</h2>
            <h2>
              {weatherInfo.main.temp_min}℉ ~ {weatherInfo.main.temp_max}℉
            </h2>
          </div>
        </>
      ) : (
        <>LOADING</>
      )}
    </WeatherContainer>
  );
}

const WeatherContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 1rem 0.25rem 1rem;
  min-width: 20vw;
  height: fit-content;
  text-align: center;
  border-radius: 0.4rem;
  margin-left: 0.25rem;
  > div:nth-child(2) {
    > img {
      width: 5rem;
    }
    > h2 {
      margin: 0;
    }
  }
`;
