import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import cloud from "../assets/weatherImg/cloud.png";
import clearsky from "../assets/weatherImg/clearsky.png";
import mist from "../assets/weatherImg/mist.png";
import rain from "../assets/weatherImg/rain.png";
import snow from "../assets/weatherImg/snow.png";
import thunderstorm from "../assets/weatherImg/thunderstorm.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";

export default function HeaderMenu() {
  const [weatherInfo, setWeather] = useState();
  const [timeAndDate, setTimeAndDate] = useState({ time: "", date: "" });

  useEffect(() => {
    getWeather();
    setInterval(() => {
      getTimeAndDate();
    }, 1000);
  }, []);

  const getWeather = () => {
    navigator.geolocation.getCurrentPosition(async (success) => {
      const { REACT_APP_WEATHER_API_KEY } = process.env;
      const lat = success.coords.latitude;
      const long = success.coords.longitude;
      const weatherInfo = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${REACT_APP_WEATHER_API_KEY}&units=imperial`
      );
      setWeather(weatherInfo.data);
    });
  };

  const renderWeather = () => {
    const { name, sys, main, weather } = weatherInfo;
    const { description } = weather[0];
    const img = [
      { name: "cloud", src: cloud },
      { name: "clearsky", src: clearsky },
      { name: "mist", src: mist },
      { name: "rain", src: rain },
      { name: "snow", src: snow },
      { name: "thunderstorm", src: thunderstorm },
    ];
    const src = img.find((item) => description.includes(item.name));
    return (
      <>
        <div>
          <h1>
            {name}, {sys.country}
          </h1>
          <h2>{main.temp} ℉</h2>
        </div>
        <div>
          <img src={src.src} alt="Weather icon" />
          <h2>{description.toUpperCase()}</h2>
          <h2>
            {main.temp_min}℉ ~ {main.temp_max}℉
          </h2>
        </div>
      </>
    );
  };

  const getTimeAndDate = () => {
    const Time = new Date();
    const date = Time.toDateString();
    const hour = Time.getHours() > 12 ? Time.getHours() - 12 : Time.getHours();
    const minute = Time.getMinutes();
    const second =
      Time.getSeconds() < 10 ? `0${Time.getSeconds()}` : Time.getSeconds();
    const meridiem = hour >= 12 ? "PM" : "AM";
    const time = `${hour}:${minute}:${second} ${meridiem}`;
    setTimeAndDate({ date, time });
  };

  const renderTime = () => {
    const { date, time } = timeAndDate;
    return (
      <TimeContainer>
        <h2>{date}</h2>
        <h2>{time}</h2>
      </TimeContainer>
    );
  };

  return (
    <HeaderMenuWrapper>
      <Grid container>
        <LeftSection>
          <WeatherContainer>
            {weatherInfo ? renderWeather() : "LOADING"}
          </WeatherContainer>
        </LeftSection>
        <RightSection>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faPlus} />
          </MenuItem>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faInfoCircle} />
          </MenuItem>
          <MenuItem href="/">Boards</MenuItem>
          <MenuItem href="/">Profile</MenuItem>
          {renderTime()}
        </RightSection>
      </Grid>
    </HeaderMenuWrapper>
  );
}

const HeaderMenuWrapper = styled.div`
  width: 100vw;
  position: fixed;
  margin-top: 1rem;
  > div {
    justify-content: space-between;
  }
  > :nth-child(2) {
    margin-top: 1rem;
  }
`;

const LeftSection = styled.div`
  margin: 0 0.25rem 0.5rem 0.25rem;
  display: flex;
`;

const RightSection = styled.div`
  text-align: right;
  margin-right: 0.25rem;
`;

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

const TimeContainer = styled.div`
  padding: 0.25rem 1rem 0.25rem 1rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  line-height: 0.3;
  min-width: 18vw;
  height: fit-content;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-align: center;
  border-radius: 1rem;
  word-spacing: 8px;
`;

const MenuItem = styled.a`
  margin: 0 0.25rem 0 0.25rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  color: #fff;
  font-weight: 500;
  transition: 0.25s;
  &:hover {
    opacity: 0.7;
    transition: 0.25s;
    cursor: pointer;
  }
  &:active {
    background-color: #1c1c1b;
    opacity: 1;
  }
`;
