import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip);

const NutritionChart = () => {
  const data = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [30, 50, 20], // Example values, adjust as needed
        backgroundColor: ["#68afac", "#66b7cd", "#FFE2BD"],
        hoverBackgroundColor: ["#68afac", "#66b7cd", "#FFE2BD"],
      },
    ],
  };

  const totalCalories = 500; // Example value, adjust as needed

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (acc, data) => acc + data,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value}g)`;
          },
          footer: function () {
            return `Total Calories: ${totalCalories}`;
          },
        },
        displayColors: false, // Optionally hide color boxes next to labels
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer: function () {
            return [`Total Calories: ${totalCalories}`];
          },
        },
      },
    },
  };

  const plugins = [
    {
      id: "centerText",
      afterDraw: (chart) => {
        const {
          ctx,
          chartArea: { top, right, bottom, left, width, height },
        } = chart;
        ctx.save();

        // Draw calorie number
        const fontSize = (height / 5).toFixed(2);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        const text = totalCalories.toString();
        const textX = width / 2;
        const textY = height / 2;
        ctx.fillText(text, textX, textY);

        // Draw "cal" text
        const smallFontSize = (height / 12).toFixed(2);
        ctx.font = `${smallFontSize}px Arial`;
        ctx.fillText("cal", textX, textY + parseInt(fontSize) * 0.7);

        ctx.restore();
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: "120px",
        height: "120px",
      }}
    >
      <Doughnut data={data} options={options} plugins={plugins} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        Consumed
      </Typography>
    </Box>
  );
};

export default NutritionChart;
