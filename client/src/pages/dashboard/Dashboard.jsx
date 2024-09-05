import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/global/Header";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CircularProgressBar from "../../components/CircularProgressBar";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = {
    data1: {
      datasets: [
        {
          data: [100], // Example values, adjust as needed
          backgroundColor: ["#9a9ff1"],
          hoverBackgroundColor: ["#9a9ff1"],
        },
      ],
      totalCalories: 2997,
    },
    data2: {
      datasets: [
        {
          data: [20, 50, 30], // Example values, adjust as needed
          backgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"], // Fat, Protein, Carbs
          hoverBackgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"],
        },
      ],
      totalCalories: 500,
    },
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="August 29, 2024 | 12:22 AM" />
        <Box>
          <Button
            sx={{
              backgroundColor: "#6d76fa",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#9a9ff1",
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(14, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgressBar value={29} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>

        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="600">
            Calories Remained
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <NutrientDoughnutChart data={data.data1} title={"Remained"} />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="600">
            Calories Consumed
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <NutrientDoughnutChart data={data.data2} title={"Consumed"} />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="600">
            Your Day Streaks
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <CalendarMonthIcon fontSize="large" sx={{ color: "#9a9ff1" }} />
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.mode == "dark" ? "white" : "black",
                fontSize: "2rem",
                fontWeight: "bold",
                border: `1px solid ${
                  theme.palette.mode == "dark" ? "white" : "gray"
                }`,
                mt: 2,
                mb: 2,
              }}
            >
              <Typography variant="h4">20</Typography>
            </Box>
            <p>Start Logging to see your streaks!</p>
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              Recent Workout Log
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
              </Box>
              <Box
                sx={{
                  color: colors.primary[100],
                  width: "33.33%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {transaction.date}
              </Box>
              <Box
                sx={{ width: "33.33%", display: "flex", justifyContent: "end" }}
              >
                <Button
                  sx={{
                    color: colors.primary[400],
                    backgroundColor: "#32B593",
                    p: "5px 10px",
                    borderRadius: "4px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#4CCEAC",
                    },
                  }}
                >
                  View
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h4"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Calories History
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Weight Chart
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Down 2lbs this week
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
