import React from "react";
import styled from "styled-components";
import { DeviceData, Theme } from "../types";

interface Props {
  data: DeviceData[];
  theme: Theme;
}

const TableContainer = styled.table<{ theme: Theme }>`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => props.theme.cardBackground};
  box-shadow: ${(props) => props.theme.cardShadow};
  border-radius: 8px;
  overflow: hidden;
  color: ${(props) => props.theme.appText};
  transition:
    background-color 0.5s ease,
    box-shadow 0.5s ease,
    color 0.5s ease;
`;

const TableHeader = styled.th<{ theme: Theme }>`
  background-color: ${(props) => props.theme.tableHeaderBg};
  color: ${(props) => props.theme.tableHeaderText};
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid ${(props) => props.theme.tableRowBorder};
  transition:
    background-color 0.5s ease,
    color 0.5s ease,
    border-bottom 0.5s ease;
`;

const TableRow = styled.tr<{ theme: Theme }>`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.tableRowEvenBg};
  }
  &:hover {
    background-color: ${(props) => props.theme.tableRowHoverBg};
  }
  transition: background-color 0.5s ease;
`;

const TableCell = styled.td<{ theme: Theme }>`
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.tableRowBorder};
  transition: border-bottom 0.5s ease;
`;

const DeviceTable: React.FC<Props> = ({ data, theme }) => {
  return (
    <TableContainer theme={theme}>
      <h2>Детали по устройствам</h2>
      <thead>
        <tr>
          <TableHeader theme={theme}>Имя</TableHeader>
          <TableHeader theme={theme}>IP</TableHeader>
          <TableHeader theme={theme}>АРМ</TableHeader>
          <TableHeader theme={theme}>KSC</TableHeader>
          <TableHeader theme={theme}>Puppet</TableHeader>
          <TableHeader theme={theme}>Версия ОС</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index} theme={theme}>
            <TableCell theme={theme}>{row.name}</TableCell>
            <TableCell theme={theme}>{row.ip}</TableCell>
            <TableCell theme={theme}>{row.arm}</TableCell>
            <TableCell theme={theme}>{row.ksc}</TableCell>
            <TableCell theme={theme}>{row.puppet}</TableCell>
            <TableCell theme={theme}>{row["version_os"]}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default DeviceTable;
