import React from "react";
import { ThemeProvider } from "styled-components";
import {
  MetricCards,
  DashboardCharts,
  DeviceTable,
  CurrentDate,
} from "./components";
import useFetchData from "./hooks/useFetchData";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { AppMain, AppContainer, Header, Title, Footer } from "./App.styles";
import { GlobalStyle } from "./GlobalStyle";

const App: React.FC = () => {
  const apiUrl =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api/data";
  const { data, loading, error } = useFetchData(`${apiUrl}/api/data`);
  const theme = useThemeSwitcher();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
        <AppMain theme={theme}>
          <AppContainer theme={theme}>Загрузка данных...</AppContainer>
        </AppMain>
      ) : data ? (
        <AppMain theme={theme}>
          <AppContainer theme={theme}>
            <Header>
              <Title>Система мониторинга</Title>
              <CurrentDate theme={theme} />
            </Header>
            <MetricCards data={data} theme={theme} />
            <DashboardCharts data={data} theme={theme} />
            <DeviceTable data={data} theme={theme} />
          </AppContainer>
          <Footer theme={theme}>
            Разработано для мониторинга состояния систем
          </Footer>
        </AppMain>
      ) : error ? (
        <AppMain theme={theme}>
          <AppContainer theme={theme}>
            Ошибка: {error.message}. Пожалуйста, попробуйте позже.
          </AppContainer>
        </AppMain>
      ) : null}
    </ThemeProvider>
  );
};

export default App;
