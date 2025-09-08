import React from "react";
import styled from "styled-components";

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #0056b3;
  color: white;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #004085;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #e9e9e9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const DeviceTable = ({ data }) => {
  return (
    <TableContainer>
      <thead>
        <TableRow>
          <TableHeader>Имя</TableHeader>
          <TableHeader>IP</TableHeader>
          <TableHeader>АРМ</TableHeader>
          <TableHeader>KSC</TableHeader>
          <TableHeader>Puppet</TableHeader>
          <TableHeader>Версия ОС</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.ip}</TableCell>
            <TableCell>{row.arm}</TableCell>
            <TableCell>{row.ksc}</TableCell>
            <TableCell>{row.puppet}</TableCell>
            <TableCell>{row["version_os"]}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default DeviceTable;
