import React from "react";
import { ThemeProvider } from "styled-components";
import {
  MetricCards,
  DashboardCharts,
  NetworkCharts,
  CurrentDate,
  FooterApp,
} from "./components";
import useFetchData from "./hooks/useFetchData";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import {
  AppMain,
  AppContainer,
  Header,
  Title,
  ChartsSection,
} from "./App.styles";
import { GlobalStyle } from "./GlobalStyle";
// import logo from "./assets/itlogo.png";

const App: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  // Добавляем флаг для использования мок-данных. Можно сделать его настраиваемым через .env
  const useMockData = process.env.REACT_APP_USE_MOCK_DATA === "true";

  const { data, loading, error } = useFetchData(
    `${apiUrl}/api/data`,
    useMockData
  );
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
              {/* <img src={logo} alt="Логотип компании" /> */}
              <Title>Система мониторинга войсковой части 3526</Title>
              <CurrentDate theme={theme} />
            </Header>
            {/* <MetricCards data={data} theme={theme} /> */}
            <ChartsSection>
              <NetworkCharts data={data} theme={theme} />
              <DashboardCharts data={data} theme={theme} />
            </ChartsSection>
          </AppContainer>
          <FooterApp theme={theme} />
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
