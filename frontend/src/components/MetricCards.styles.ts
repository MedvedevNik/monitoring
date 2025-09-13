import styled from "styled-components";
import { Theme } from "../types";

export const SummaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const MetricCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.cardShadow};
  text-align: center;
  transition:
    background-color 0.5s ease,
    box-shadow 0.5s ease;
`;

export const MetricValue = styled.p<{ theme: Theme }>`
  font-size: 2.5em;
  font-weight: bold;
  color: ${(props) => props.theme.cardValue};
  margin: 10px 0 0;
  transition: color 0.5s ease;
`;

export const MetricLabel = styled.p<{ theme: Theme }>`
  font-size: 1.1em;
  color: ${(props) => props.theme.cardText};
  margin: 0;
  transition: color 0.5s ease;
`;
