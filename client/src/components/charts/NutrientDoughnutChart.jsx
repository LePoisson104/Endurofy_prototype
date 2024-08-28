import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

ChartJS.register(ArcElement, Tooltip);

const NutritionChart = ({ title, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const totalCalories = 500; // Example value, adjust as needed

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Adjust the size of the center hole
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable the tooltip completely
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    backgroundColor: "transparent",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: { xl: "110px", lg: "90px", md: "90px" },
        height: { xl: "110px", lg: "90px", md: "90px" },
      }}
    >
      {/* Doughnut Chart */}
      <Doughnut data={data} options={options} />

      {/* Centered Text */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none", // Prevents the text from interfering with tooltip interactions
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: colors.primary[100],
            fontWeight: "bold",
          }}
        >
          {data.totalCalories}
        </Typography>
        <Typography
          fontWeight="light"
          sx={{
            color: colors.primary[100],
          }}
        >
          cal
        </Typography>
      </Box>
      <Typography variant="h5" fontWeight={500} sx={{ mt: 2 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default NutritionChart;
