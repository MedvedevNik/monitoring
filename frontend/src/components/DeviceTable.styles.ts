import styled from "styled-components";
import { Theme } from "../types";

export const TableContainer = styled.table<{ theme: Theme }>`
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

export const TableHeader = styled.th<{ theme: Theme }>`
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

export const TableRow = styled.tr<{ theme: Theme }>`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.tableRowEvenBg};
  }
  &:hover {
    background-color: ${(props) => props.theme.tableRowHoverBg};
  }
  transition: background-color 0.5s ease;
`;

export const TableCell = styled.td<{ theme: Theme }>`
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.tableRowBorder};
  transition: border-bottom 0.5s ease;
`;
