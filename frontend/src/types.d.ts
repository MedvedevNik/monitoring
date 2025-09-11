export interface DeviceData {
  name: string;
  ip: string;
  arm: "Да" | "Нет";
  ksc: "Да" | "Нет";
  puppet: "Да" | "Нет";
  error?: "Да" | "Нет"
  "version_os": string;
}

export interface Theme {
  appBackground: string;
  appText: string;
  cardBackground: string;
  cardShadow: string;
  cardText: string;
  cardValue: string;
  dateText: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  tableRowEvenBg: string;
  tableRowHoverBg: string;
  tableRowBorder: string;
  chartTitle: string;
  chartCenterText: string;
}