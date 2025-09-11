import styled from "styled-components";
import { Theme } from "./types";

export const AppMain = styled.main<{ theme: Theme }>`
  background-color: ${(props) => props.theme.appBackground};
  color: ${(props) => props.theme.appText};
  min-height: 100vh;
  padding: 20px;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
`;

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 2em;
  font-weight: bold;
  margin: 0;
`;

export const Footer = styled.footer<{ theme: Theme }>`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.tableRowBorder};
  font-size: 0.9em;
  color: ${(props) => props.theme.appText};
`;
