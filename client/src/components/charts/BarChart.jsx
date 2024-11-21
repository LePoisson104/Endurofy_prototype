import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Example data
  const chartData = {
    labels: [
      "Sep 1",
      "Sep 2",
      "Sep 3",
      "Sep 4",
      "Sep 5",
      "Sep 6",
      "Sep 7",
      "Sep 8",
    ], // Categories
    datasets: [
      {
        label: "Protein",
        data: [120, 150, 0, 180, 90, 100], // Values for Protein
        backgroundColor: colors.greenAccent[1000],
      },
      {
        label: "Carbs",
        data: [200, 210, 0, 220, 160, 190], // Values for Carbs
        backgroundColor: colors.blueAccent[1000],
      },
      {
        label: "Fat",
        data: [70, 80, 0, 90, 60, 65], // Values for Fat
        backgroundColor: colors.yellowAccent[100],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // Place the legend on the right side
        labels: {
          color: colors.grey[100],
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true, // Enable stacking for x-axis
        ticks: {
          color: colors.grey[100],
        },
        grid: {
          display: false,
        },

        title: {
          display: true,
          text: "Date",
          color: colors.grey[100],
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: true, // Enable stacking for y-axis
        ticks: {
          color: colors.grey[100],
        },
        grid: {
          color: colors.primary[100],
        },
        border: {
          color: colors.primary[100],
        },
        title: {
          display: true,
          text: "Calories",
          color: colors.grey[100],
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Box sx={{ height: "100%", width: "100%", padding: 1 }}>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChart;
