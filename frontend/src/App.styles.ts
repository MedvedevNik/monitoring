import styled from "styled-components";
import { Theme } from "./types";

export const AppMain = styled.main<{ theme: Theme }>`
  background-color: ${(props) => props.theme.appBackground};
  color: ${(props) => props.theme.appText};
  min-height: 100vh;
  padding: 40px;
  font-family: "Inter", sans-serif;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
`;

export const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 600;
  color: #0056b3;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Footer = styled.footer<{ theme: Theme }>`
  text-align: center;
  color: ${(props) => props.theme.appText};
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.tableRowBorder};
  transition: color 0.5s ease;
`;
