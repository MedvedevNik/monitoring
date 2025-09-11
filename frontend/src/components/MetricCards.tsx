import React from "react";
import styled from "styled-components";
import { DeviceData, Theme } from "../types";

interface Props {
  data: DeviceData[];
  theme: Theme;
}

const SummaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.cardShadow};
  text-align: center;
  transition:
    background-color 0.5s ease,
    box-shadow 0.5s ease;
`;

const MetricValue = styled.p<{ theme: Theme }>`
  font-size: 2.5em;
  font-weight: bold;
  color: ${(props) => props.theme.cardValue};
  margin: 10px 0 0;
  transition: color 0.5s ease;
`;

const MetricLabel = styled.p<{ theme: Theme }>`
  font-size: 1.1em;
  color: ${(props) => props.theme.cardText};
  margin: 0;
  transition: color 0.5s ease;
`;

const MetricCards: React.FC<Props> = ({ data, theme }) => {
  const totalDevices = data.length;
  const armCount = data.filter(
    (row) => row.arm && row.arm.toLowerCase() === "да"
  ).length;
  const kscCount = data.filter(
    (row) => row.ksc && row.ksc.toLowerCase() === "да"
  ).length;
  const puppetCount = data.filter(
    (row) => row.puppet && row.puppet.toLowerCase() === "да"
  ).length;

  return (
    <SummaryBox>
      <MetricCard theme={theme}>
        <MetricValue theme={theme}>{totalDevices}</MetricValue>
        <MetricLabel theme={theme}>Всего устройств</MetricLabel>
      </MetricCard>
      <MetricCard theme={theme}>
        <MetricValue theme={theme}>{armCount}</MetricValue>
        <MetricLabel theme={theme}>Количество АРМ</MetricLabel>
      </MetricCard>
      <MetricCard theme={theme}>
        <MetricValue theme={theme}>{kscCount}</MetricValue>
        <MetricLabel theme={theme}>Устройств с KSC</MetricLabel>
      </MetricCard>
      <MetricCard theme={theme}>
        <MetricValue theme={theme}>{puppetCount}</MetricValue>
        <MetricLabel theme={theme}>Устройств в Puppet</MetricLabel>
      </MetricCard>
    </SummaryBox>
  );
};

export default MetricCards;
