import { useEffect, useState } from "react";
import styled from "styled-components";

export default function TimeAndDate() {
  const [dateAndTime, setDateTime] = useState({ date: "", time: "" });

  useEffect(() => {
    setInterval(getTimeAndDate, 1000);
  }, []);

  const getTimeAndDate = () => {
    const Time = new Date();
    const date = Time.toDateString();
    const hour = Time.getHours() > 12 ? Time.getHours() - 12 : Time.getHours();
    const minute = Time.getMinutes();
    const second =
      Time.getSeconds() < 10 ? `0${Time.getSeconds()}` : Time.getSeconds();
    const meridiem = hour >= 12 ? "PM" : "AM";
    const time = `${hour}:${minute}:${second} ${meridiem}`;
    setDateTime({ date, time });
  };

  return (
    <TimeContainer>
      <h2>{dateAndTime.date}</h2>
      <h2>{dateAndTime.time}</h2>
    </TimeContainer>
  );
}

const TimeContainer = styled.div`
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  margin-top: 0.5rem;
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
