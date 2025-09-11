import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Theme } from "../types";

interface Props {
  theme: Theme;
}

const DateContainer = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: ${(props) => props.theme.dateText};
  transition: color 0.5s ease;
`;

const DateText = styled.p`
  font-size: 1.5em;
  margin: 0;
`;

const TimeText = styled.p`
  margin: 0;
`;

const CurrentDate: React.FC<Props> = ({ theme }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <DateContainer theme={theme}>
      <DateText>{formattedDate}</DateText>
      <TimeText>{formattedTime}</TimeText>
    </DateContainer>
  );
};

export default CurrentDate;
