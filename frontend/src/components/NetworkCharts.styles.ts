import styled from "styled-components";
import { Theme } from "../types";

export const NetworkSection = styled.section`
  flex-basis: 28%;
`;

export const Subtitle = styled.h2`
  font-size: 1.75em;
  font-weight: 600;
  color: #0056b3;
  margin: 0;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ChartBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-bottom: 30px;
`;

export const ChartContainer = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.cardShadow};
  transition:
    background-color 0.5s ease,
    box-shadow 0.5s ease;

  & > canvas {
    width: 100%;
    height: 100%;
  }
`;

export const ChartTitle = styled.h3<{ theme: Theme }>`
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.chartTitle};
  transition: color 0.5s ease;
`;
