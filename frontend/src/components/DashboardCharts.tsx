import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import {
  ChartBox,
  ChartContainer,
  ChartTitle,
  Subtitle,
  ChartSection,
} from "./DashboardCharts.styles";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { DeviceData, Theme } from "../types";

// Регистрируем компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  data: DeviceData[];
  theme: Theme;
}

const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw: (chart, args, pluginOptions) => {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((sum, val) => sum + Number(val), 0);
    const count = dataset.data[0];
    const percentage =
      total > 0 ? ((count / total) * 100).toFixed(0) + "%" : "0%";

    ctx.restore();
    const fontSize = (height / 150).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    const text = percentage;
    const textX = left + (width - ctx.measureText(text).width) / 2;
    const textY = top + height / 2;
    ctx.fillStyle = pluginOptions.color;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const DashboardCharts: React.FC<Props> = ({ data, theme }) => {
  const filteredData = data.filter(
    (row) => row.lan && row.lan.toLowerCase() === "лвс"
  );
  const armDevices = filteredData.filter(
    (row) => row.arm && row.arm.toLowerCase() === "да"
  );
  const errorsCount = armDevices.filter(
    (row) => row.error && row.error.toLowerCase() === "да"
  ).length;
  const kscCount = armDevices.filter(
    (row) => row.ksc && row.ksc.toLowerCase() === "да"
  ).length;
  const puppetARMCount = armDevices.filter(
    (row) => row.puppet && row.puppet.toLowerCase() === "да"
  ).length;

  const totalDevices = filteredData.length;
  const armCount = armDevices.length;

  const getOsCounts = (devices: DeviceData[]) =>
    devices.reduce(
      (acc, row) => {
        const os = row["version_os"] || "Неизвестно";
        if (os.toLowerCase().includes("al")) {
          acc["Astra Linux"] = (acc["Astra Linux"] || 0) + 1;
        } else if (os.toLowerCase().includes("win_server")) {
          acc["Win Server"] = (acc["Win Server"] || 0) + 1;
        } else if (os.toLowerCase().includes("win")) {
          acc["Windows"] = (acc["Windows"] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );
  const osCounts = getOsCounts(armDevices);
  const orderedLabels = ["Astra Linux", "Windows", "Win Server"];
  const orderedData = orderedLabels.map((label) => osCounts[label] || 0);

  const getAstraVersions = (devices: DeviceData[]) =>
    devices.reduce(
      (acc, row) => {
        const os = row["version_os"] || "Неизвестно";
        if (os.toLowerCase().includes("al")) {
          if (os.toLowerCase().includes("al 1.6")) {
            acc["Astra Linux 1.6"] = (acc["Astra Linux 1.6"] || 0) + 1;
          } else if (os.toLowerCase().includes("al 1.8")) {
            acc["Astra Linux 1.8"] = (acc["Astra Linux 1.8"] || 0) + 1;
          } else {
            acc["Astra Linux 1.7"] = (acc["Astra Linux 1.7"] || 0) + 1;
          }
        }
        return acc;
      },
      {} as Record<string, number>
    );
  const osALCounts = getAstraVersions(armDevices);
  const orderedALLabels = [
    "Astra Linux 1.8",
    "Astra Linux 1.7",
    "Astra Linux 1.6",
  ];
  const orderedALData = orderedALLabels.map((label) => osALCounts[label] || 0);

  const armStatusData = {
    labels: ["АРМ", "Другие устройства"],
    datasets: [
      {
        label: "Количество устройств",
        data: [armCount, totalDevices - armCount],
        backgroundColor: ["#4CAF50", "#fd0000ff"],
        hoverBackgroundColor: ["#45a049", "#db0000ff"],
        borderWidth: 0,
      },
    ],
  };

  const osData = {
    labels: orderedLabels,
    datasets: [
      {
        label: "Количество устройств",
        data: orderedData,
        backgroundColor: ["#36A2EB", "#4CAF50", "#8e5ea2", "#3cba9f"],
        hoverBackgroundColor: ["#2A92DB", "#45a049", "#7a4e8d", "#2b9d88"],
        borderWidth: 0,
      },
    ],
  };

  const osALData = {
    labels: orderedALLabels,
    datasets: [
      {
        label: "Количество устройств",
        data: orderedALData,
        backgroundColor: ["#4CAF50", "#ffd900ff", "#fd0000ff"],
        hoverBackgroundColor: ["#45a049", "#c9ab00ff", "#db0000ff"],
        borderWidth: 0,
      },
    ],
  };

  const errorsStatusData = {
    labels: ["АРМ без ошибок", "АРМ с ошибками"],
    datasets: [
      {
        label: "Количество устройств",
        data: [armCount - errorsCount, errorsCount],
        backgroundColor: ["#4CAF50", "#fd0000ff"],
        hoverBackgroundColor: ["#45a049", "#db0000ff"],
        borderWidth: 0,
      },
    ],
  };

  const kscStatusData = {
    labels: ["В ksc", "Не в ksc"],
    datasets: [
      {
        label: "Количество устройств",
        data: [kscCount, armCount - kscCount],
        backgroundColor: ["#4CAF50", "#fd0000ff"],
        hoverBackgroundColor: ["#45a049", "#db0000ff"],
        borderWidth: 0,
      },
    ],
  };

  const puppetARMStatusData = {
    labels: ["В puppet", "Не в puppet"],
    datasets: [
      {
        label: "Количество устройств",
        data: [puppetARMCount, armCount - puppetARMCount],
        backgroundColor: ["#4CAF50", "#fd0000ff"],
        hoverBackgroundColor: ["#45a049", "#db0000ff"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: theme.chartTitle,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const data = tooltipItem.dataset.data;
            const total = data.reduce(
              (sum: number, val: number) => sum + val,
              0
            );
            const value = data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${tooltipItem.label}: ${value} (${percentage})`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value) => value,
        font: {
          weight: "bold",
        },
      },
      centerText: {
        color: theme.chartCenterText,
      },
    },
  };

  return (
    <ChartSection>
      <Subtitle>Защищенные сегменты сети</Subtitle>
      <ChartBox>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>Статус АРМ</ChartTitle>
          <Doughnut
            data={armStatusData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>ОС на АРМ</ChartTitle>
          <Doughnut
            data={osData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>Версия AL на АРМ</ChartTitle>
          <Doughnut
            data={osALData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>ksc на АРМ</ChartTitle>
          <Doughnut
            data={kscStatusData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>АРМ в Puppet</ChartTitle>
          <Doughnut
            data={puppetARMStatusData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>АРМ без ошибок</ChartTitle>
          <Doughnut
            data={errorsStatusData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
      </ChartBox>
    </ChartSection>
  );
};

export default DashboardCharts;
