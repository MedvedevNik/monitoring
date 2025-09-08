import React from "react";
import styled from "styled-components";

const SummaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MetricValue = styled.p`
  font-size: 2.5em;
  font-weight: bold;
  color: #4caf50;
  margin: 10px 0 0;
`;

const MetricLabel = styled.p`
  font-size: 1.1em;
  color: #777;
  margin: 0;
`;

const MetricCards = ({ data }) => {
  const totalDevices = data.length;
  console.dir(data);
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
      <MetricCard>
        <MetricValue>{totalDevices}</MetricValue>
        <MetricLabel>Всего устройств</MetricLabel>
      </MetricCard>
      <MetricCard>
        <MetricValue>{armCount}</MetricValue>
        <MetricLabel>Количество АРМ</MetricLabel>
      </MetricCard>
      <MetricCard>
        <MetricValue>{kscCount}</MetricValue>
        <MetricLabel>Устройств с KSC</MetricLabel>
      </MetricCard>
      <MetricCard>
        <MetricValue>{puppetCount}</MetricValue>
        <MetricLabel>Устройств в Puppet</MetricLabel>
      </MetricCard>
    </SummaryBox>
  );
};

export default MetricCards;
