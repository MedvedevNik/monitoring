import React, { useState, useEffect } from "react";
import { DateContainer, DateText, TimeText } from "./CurrentDate.styles";
import { Theme } from "../types";

interface Props {
  theme: Theme;
}

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
