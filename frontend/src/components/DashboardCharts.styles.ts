import styled from "styled-components";
import { Theme } from "../types";

export const ChartBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
