import React from "react";
import {
  SummaryBox,
  MetricCard,
  MetricValue,
  MetricLabel,
} from "./MetricCards.styles";
import { DeviceData, Theme } from "../types";

interface Props {
  data: DeviceData[];
  theme: Theme;
}

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
