import {
  Box,
  Typography,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import Header from "../../components/global/Header";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import DatePickerSelector from "../../components/DatePickerSelector";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const WeekSelect = () => {
    const [range, setRange] = useState("");

    const handleChange = (event) => {
      setRange(event.target.value);
    };
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Range</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={range}
            label="Days"
            onChange={handleChange}
          >
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={14}>Last 2 weeks</MenuItem>
            <MenuItem value={21}>Last 3 weeks</MenuItem>
            <MenuItem value={28}>Last 4 weeks</MenuItem>
            <MenuItem value={"All"}>All time</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <Box m="20px">
      <Header
        title="Charts"
        subtitle="Customize your charts to review and analyze the information you're most interested in"
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(1, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt={3}
      >
        {/* Calories History Chart */}
        <Box
          gridColumn="span 7"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
            }}
          >
            {/* Left Box */}
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Energy Consumed (Kcal)
              </Typography>
              <Typography variant="h6" fontWeight={300}>
                From Sep 1, 2024 to Sep 8, 2024
              </Typography>
            </Box>
            {/* Right Box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                mr: 4,
              }}
            >
              <WeekSelect />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRight: "1px solid gray",
                  borderLeft: "1px solid gray",
                  pl: 2,
                  pr: 2,
                }}
              >
                <DatePickerSelector label={"Start Date"} />
                <DatePickerSelector label={"End Date"} />
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "#6d76fa",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#868dfb",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
              <IconButton sx={{ color: colors.purpleAccent[400] }}>
                <DownloadIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ height: "60vh" }}>
            <BarChart />
          </Box>
        </Box>
        {/* Weight Chart */}
        <Box
          gridColumn="span 7"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
            }}
          >
            {/* Left Box */}
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Weight (lbs)
              </Typography>
              <Typography variant="h6" fontWeight={300}>
                From Sep 1, 2024 to Sep 8, 2024
              </Typography>
            </Box>
            {/* Right Box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                mr: 4,
              }}
            >
              <WeekSelect />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRight: "1px solid gray",
                  borderLeft: "1px solid gray",
                  pl: 2,
                  pr: 2,
                }}
              >
                <DatePickerSelector label={"Start Date"} />
                <DatePickerSelector label={"End Date"} />
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "#6d76fa",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#868dfb",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
              <IconButton sx={{ color: colors.purpleAccent[400] }}>
                <DownloadIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ height: "60vh" }}>
            <LineChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Bar;
