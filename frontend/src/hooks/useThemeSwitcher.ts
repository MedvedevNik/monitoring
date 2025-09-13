import { useState, useEffect } from "react";
import { Theme } from "../types";

// Определение цветовых тем
const lightTheme: Theme = {
  appBackground: "#f0f2f5",
  appText: "#333",
  cardBackground: "#ffffff",
  cardShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
  cardText: "#555",
  cardValue: "#4a90e2",
  dateText: "#0056b3",
  tableHeaderBg: "#0056b3",
  tableHeaderText: "#fff",
  tableRowEvenBg: "#f8f8f8",
  tableRowHoverBg: "#eef2f7",
  tableRowBorder: "#ddd",
  chartTitle: "#333",
  chartCenterText: "#333",
};

const darkTheme: Theme = {
  appBackground: "#1e2125",
  appText: "#e0e0e0",
  cardBackground: "#2c3035",
  cardShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  cardText: "#b0b0b0",
  cardValue: "#63a4ff",
  dateText: "#5a8cff",
  tableHeaderBg: "#3a4149",
  tableHeaderText: "#e0e0e0",
  tableRowEvenBg: "#24272c",
  tableRowHoverBg: "#333940",
  tableRowBorder: "#444",
  chartTitle: "#e0e0e0",
  chartCenterText: "#e0e0e0",
};

// Хук для управления темой
const useThemeSwitcher = (): Theme => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const checkTimeAndSetTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 19 || hour < 7) {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    };

    checkTimeAndSetTheme();
    // Обновляем тему раз в час
    const intervalId = setInterval(checkTimeAndSetTheme, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return theme;
};

export default useThemeSwitcher;
