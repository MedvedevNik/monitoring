import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Регистрируем компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// ------------------------------------
// Стилизованные компоненты
// ------------------------------------
const ChartBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    const total = chart.getDatasetMeta(0).total;
    const count = chart.data.datasets[0].data[0];
    const percentage =
      total > 0 ? ((count / total) * 100).toFixed(0) + "%" : "0%";

    ctx.restore();
    const fontSize = (height / 150).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    const text = percentage;
    const textX = left + (width - ctx.measureText(text).width) / 2;
    const textY = top + height / 2;
    ctx.fillStyle = "#333";
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const DashboardCharts = ({ data }) => {
  const armDevices = data.filter(
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

  const totalDevices = data.length;
  const armCount = armDevices.length;

  const armStatusData = {
    labels: ["АРМ", "Не АРМ"],
    datasets: [
      {
        label: "Количество устройств",
        data: [armCount, totalDevices - armCount],
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF4263"],
        borderWidth: 0,
      },
    ],
  };

  const osCounts = armDevices.reduce((acc, row) => {
    const os = row["version_os"] || "Неизвестно";
    if (os.toLowerCase().includes("al")) {
      acc["Astra Linux"] = (acc["Astra Linux"] || 0) + 1;
    } else if (os.toLowerCase().includes("win_server")) {
      acc["Win Server"] = (acc["Win Server"] || 0) + 1;
    } else if (os.toLowerCase().includes("win")) {
      acc["Windows"] = (acc["Windows"] || 0) + 1;
    } else {
      acc["Другие"] = (acc["Другие"] || 0) + 1;
    }
    return acc;
  }, {});
  const orderedLabels = ["Astra Linux", "Windows", "Win Server", "Другие"];
  const orderedData = orderedLabels.map((label) => osCounts[label] || 0);
  const osData = {
    labels: orderedLabels,
    datasets: [
      {
        label: "Количество устройств",
        data: orderedData,
        backgroundColor: ["#36A2EB", "#FFCE56", "#8e5ea2", "#3cba9f"],
        hoverBackgroundColor: ["#2A92DB", "#EBC345", "#7a4e8d", "#2b9d88"],
        borderWidth: 0,
      },
    ],
  };

  const osALCounts = armDevices.reduce((acc, row) => {
    const os = row["version_os"] || "Неизвестно";
    console.log(os.toLowerCase());
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
  }, {});
  const orderedALLabels = [
    "Astra Linux 1.8",
    "Astra Linux 1.7",
    "Astra Linux 1.6",
  ];
  const orderedALData = orderedALLabels.map((label) => osALCounts[label] || 0);
  const osALData = {
    labels: orderedALLabels,
    datasets: [
      {
        label: "Количество устройств",
        data: orderedALData,
        backgroundColor: ["#07dd07ff", "#ffd900ff", "#fd0000ff"],
        hoverBackgroundColor: ["#00c500ff", "#c9ab00ff", "#db0000ff"],
        borderWidth: 0,
      },
    ],
  };

  const errorsStatusData = {
    labels: ["ARM без ошибок", "ARM с ошибоками"],
    datasets: [
      {
        label: "Количество устройств",
        data: [armCount - errorsCount, errorsCount],
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF4263"],
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
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF4263"],
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
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF4263"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const data = tooltipItem.dataset.data;
            const total = data.reduce((sum, val) => sum + val, 0);
            const value = data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${tooltipItem.label}: ${value} (${percentage})`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          return value;
        },
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <ChartBox>
      <ChartContainer>
        <h3>Статус АРМ</h3>
        <Doughnut
          data={armStatusData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer>
      <ChartContainer>
        <h3>Операционная система на АРМ</h3>
        <Doughnut
          data={osData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer>
      <ChartContainer>
        <h3>Версия Astra linux на АРМ</h3>
        <Doughnut
          data={osALData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer>
      <ChartContainer>
        <h3>ksc на ARM</h3>
        <Doughnut
          data={kscStatusData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer>
      <ChartContainer>
        <h3>АРМ в Puppet</h3>
        <Doughnut
          data={puppetARMStatusData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer>
      <ChartContainer>
        <h3>ARM без ошибок</h3>
        <Doughnut
          data={errorsStatusData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer>
    </ChartBox>
  );
};

export default DashboardCharts;
