import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Импортируем наши новые компоненты
import {
  MetricCards,
  DashboardCharts,
  DeviceTable,
  CurrentDate,
} from "./components";

// Главный контейнер приложения
const AppContainer = styled.div`
  font-family: "Arial, sans-serif";
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f5f5;
  color: #333;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  text-align: center;
  color: #0056b3;
  margin-bottom: 20px;
`;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <AppContainer>Загрузка данных...</AppContainer>;
  }

  if (error) {
    return <AppContainer>Ошибка: {error.message}</AppContainer>;
  }

  return (
    <AppContainer>
      <Header>
        <Title>Система мониторинга</Title>
        <CurrentDate />
      </Header>
      {MetricCards ? <MetricCards data={data} /> : null}
      {DashboardCharts ? <DashboardCharts data={data} /> : null}
      {!DeviceTable ? (
        <section>
          <h2>Детали по устройствам</h2>
          <DeviceTable data={data} />
        </section>
      ) : null}
    </AppContainer>
  );
}

export default App;
