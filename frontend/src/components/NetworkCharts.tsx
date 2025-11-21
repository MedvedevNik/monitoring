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
  NetworkSection,
} from "./NetworkCharts.styles";
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

const NetworkCharts: React.FC<Props> = ({ data, theme }) => {
  const armDevices = data.filter(
    (row) => row.arm && row.arm.toLowerCase() === "да"
  );
  // Необходимо правильно распределить нужды.
  //   const printerDevices = data.filter(
  //     (row) => row.arm && row.arm.toLowerCase() === "нет"
  //   );
  //   const printerCount = printerDevices.length;
  // const getPrinterCounts = (devices: DeviceData[]) =>
  //     devices.reduce(
  //       (acc, row) => {
  //         const name = row["name"] || "Неизвестно";
  //         const isArm = row["arm"] || "Неизвестно";

  //         if (
  //           name.toLowerCase().includes("мфу") ||
  //           name.toLowerCase().includes("принтер")
  //         ) {
  //           acc["ПУ"] = (acc["ПУ"] || 0) + 1;
  //         } else {
  //           acc["АРМ"] = (acc["АРМ"] || 0) + 1;
  //         }

  //         return acc;
  //       },
  //       {} as Record<string, number>
  //     );
  //   const printerCounts = getPrinterCounts(data);
  //   const orderedLabels = ["АРМ", "ПУ"];
  //   const orderedData = orderedLabels.map((label) => printerCounts[label] || 0);
  // 	 const printerData = {
  //     labels: orderedLabels,
  //     datasets: [
  //       {
  //         label: "Количество устройств",
  //         data: orderedData,
  //         backgroundColor: ["#4CAF50", "#FF6384"],
  //         hoverBackgroundColor: ["#45a049", "#FF4263"],
  //         borderWidth: 0,
  //       },
  //     ],
  //   };

  const totalDevices = data.length;
  const armCount = armDevices.length;

  const getLAN = (devices: DeviceData[]) =>
    devices.reduce(
      (acc, row) => {
        const lan = row["lan"] || "Неизвестно";
        switch (lan.toLowerCase()) {
          case "лвс":
            acc["ЛВС"] = (acc["ЛВС"] || 0) + 1;
            break;
          case "злвс":
            acc["ЗЛВС"] = (acc["ЗЛВС"] || 0) + 1;
            break;
          default:
            acc["АП 'Интернет'"] = (acc["АП 'Интернет'"] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

  const lanCounts = getLAN(data);
  const orderedLanLabels = ["ЛВС", "ЗЛВС", "АП 'Интернет'"];
  const orderedLanData = orderedLanLabels.map((label) => lanCounts[label] || 0);

  const lanData = {
    labels: orderedLanLabels,
    datasets: [
      {
        label: "Количество устройств",
        data: orderedLanData,
        backgroundColor: ["#4CAF50", "#36A2EB", "#3cba9f"],
        hoverBackgroundColor: ["#45a049", "#2A92DB", "#2b9d88"],
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
    <NetworkSection>
      <Subtitle>Общие сведения о сети</Subtitle>
      <ChartBox>
        <ChartContainer theme={theme}>
          <ChartTitle theme={theme}>ЛВС</ChartTitle>
          <Doughnut
            data={lanData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </ChartContainer>
        {/* <ChartContainer theme={theme}>
        <ChartTitle theme={theme}>Сетевые принтеры</ChartTitle>
        <Doughnut
          data={printerData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartContainer> */}
      </ChartBox>
    </NetworkSection>
  );
};

export default NetworkCharts;
