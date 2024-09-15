import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const labels = [
    "Sep 1",
    "Sep 2",
    "Sep 3",
    "Sep 4",
    "Sep 5",
    "Sep 6",
    "Sep 7",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: false,
        data: [189, 189, 188, 187, 187, 186, 185],
        borderColor: colors.redAccent[600],
        backgroundColor: colors.redAccent[900],
        fill: true,
        pointRadius: 5, // Adjust this value to make the points bigger or smaller
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          color: colors.primary[100],
        },
        ticks: {
          color: colors.primary[100], // X-axis tick color
        },
        title: {
          display: true, // Show X-axis title
          text: "Date", // X-axis title text
          color: colors.primary[100],
          font: {
            size: 14, // X-axis title font size
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 180,
        max: 190,
        grid: {
          display: false, // Hide Y axis grid lines
        },
        ticks: {
          color: colors.primary[100], // Y-axis tick color
        },
        border: {
          color: colors.primary[100],
        },
        title: {
          display: true, // Show Y-axis title
          text: "Weight", // Y-axis title text
          color: colors.primary[100],
          font: {
            size: 14, // Y-axis title font size
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: 1,
      }}
    >
      <Line options={options} data={data} />
    </Box>
  );
};

export default LineChart;
