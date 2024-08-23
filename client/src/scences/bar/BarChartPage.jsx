import { Box } from "@mui/material";
import Header from "../../components/global/Header";
import BarChart from "../../components/charts/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Calories History" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
