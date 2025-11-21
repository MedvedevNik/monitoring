import { useState, useEffect } from "react";
import { DeviceData } from "../types";
import mockData from "../mock_data.json"; // Импортируем мок-данные

// Хук для получения данных с API
const useFetchData = (
  url: string,
  useMock: boolean = false // Добавляем параметр для использования мок-данных
): { data: DeviceData[]; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (useMock) {
        // Если используем мок-данные, имитируем задержку и возвращаем их
        setTimeout(() => {
          setData(mockData as DeviceData[]); // Приводим к типу DeviceData[]
          setLoading(false);
        }, 500); // Имитация задержки в 500мс
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: DeviceData[] = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, useMock]); // Добавляем useMock в зависимости

  console.log(data, "data");
  return { data, loading, error };
};

export default useFetchData;
