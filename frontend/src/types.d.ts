export interface DeviceData {
  name: string;
  ip: string;
  arm: "Да" | "Нет";
  lan: string;
  ksc: "Да" | "Нет";
  puppet: "Да" | "Нет";
  error?: "Да" | "Нет";
  version_os: string;
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

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}
