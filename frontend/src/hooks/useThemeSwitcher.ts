import { useState, useEffect } from "react";
import { Theme } from "../types";

// Определение цветовых тем
const lightTheme: Theme = {
  appBackground: "#f5f5f5",
  appText: "#333",
  cardBackground: "#ffffff",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  cardText: "#333",
  cardValue: "#4caf50",
  dateText: "#0056b3",
  tableHeaderBg: "#0056b3",
  tableHeaderText: "white",
  tableRowEvenBg: "#f2f2f2",
  tableRowHoverBg: "#e9e9e9",
  tableRowBorder: "#ddd",
  chartTitle: "#333",
  chartCenterText: "#333",
};

const darkTheme: Theme = {
  appBackground: "#121212",
  appText: "#f0f2f5",
  cardBackground: "#1e1e1e",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
  cardText: "#f0f2f5",
  cardValue: "#81c784",
  dateText: "#3694ff",
  tableHeaderBg: "#3694ff",
  tableHeaderText: "#121212",
  tableRowEvenBg: "#2d2d2d",
  tableRowHoverBg: "#3a3a3a",
  tableRowBorder: "#444",
  chartTitle: "#f0f2f5",
  chartCenterText: "#f0f2f5",
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
