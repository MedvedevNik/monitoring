import React from "react";
import {
  TableContainer,
  TableHeader,
  TableRow,
  TableCell,
} from "./DeviceTable.styles";
import { DeviceData, Theme } from "../types";

interface Props {
  data: DeviceData[];
  theme: Theme;
}

const DeviceTable: React.FC<Props> = ({ data, theme }) => {
  return (
    <div>
      <h2>Детали по устройствам</h2>
      <TableContainer theme={theme}>
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
    </div>
  );
};

export default DeviceTable;
