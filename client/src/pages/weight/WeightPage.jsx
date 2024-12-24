import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import DatePickerSelector from "../../components/DatePickerSelector";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import LineChart from "../../components/charts/LineChart";
import SortIcon from "@mui/icons-material/Sort";
import AddWeightLog from "../../components/modals/AddWeightLog";
import FilterSelect from "../../components/selects/FilterSelect";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import { dateFormat } from "../../helper/dateFormat";

const WeightLogPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = useState(false); // State for accordion
  const [weightLogs, setWeightLogs] = useState([]);

  const formattedDateTime = `${dateFormat(new Date())?.date} | ${
    dateFormat(new Date())?.time
  } `;

  const handleDeleteLog = (index) => {
    const updatedLogs = weightLogs.filter((log, i) => i !== index);
    setWeightLogs(updatedLogs);
  };

  const weeklyRateColors = {
    green: {
      primary: "green",
      secondary: colors.greenAccent[1300],
    },
    red: {
      primary: "red",
      secondary: colors.redAccent[1100],
    },
    yellow: {
      primary: colors.yellowAccent[200],
      secondary: colors.yellowAccent[300],
    },
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header title={"Weight Log"} subtitle={formattedDateTime} />
      {/* Filter Date */}
      <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
        <SortIcon />
        <Typography>Filter</Typography>
      </Box>
      <Box sx={{ display: "flex", mb: 3, gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <DatePickerSelector label={"Start Date"} />
          <DatePickerSelector label={"End Date"} />
          <FilterSelect />
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            sx={{
              color: "#6d76fa",
              textTransform: "none",
              bgcolor: colors.primary[400],
            }}
          >
            Cancel
          </Button>
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
          <IconButton
            size="small"
            sx={{
              color: "white",
              bgcolor: "#6d76fa",
              "&:hover": {
                backgroundColor: "#868dfb",
              },
            }}
            onClick={() => {
              setOpenModal(true);
              setExpanded(true); // Open the accordion when adding weight
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      {/* Accordion for Table */}
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: colors.primary[400] }}
        >
          <Typography>Weight Logs</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {weightLogs.length === 0 ? (
            <Typography
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: colors.primary[400],
                borderTop: "1px solid gray",
              }}
            >
              No Data
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ bgcolor: colors.primary[400] }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "14px" }}>Date</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>
                      Recorded (lbs)
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>
                      Moving Average (lbs)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Weekly Rate
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "14px", paddingRight: 4 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weightLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell align="center">{log.weight}</TableCell>
                      <TableCell align="center">average</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: weeklyRateColors.green.primary,
                              backgroundColor: weeklyRateColors.green.secondary,
                              borderRadius: "4px", // Optional: To round corners
                              padding: 1, // Optional: Add some padding
                              width: "fit-content", // Makes the width adjust to the content
                            }}
                          >
                            <KeyboardArrowUpSharpIcon fontSize="small" />
                            <span>0.9</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          // onClick={() => handleDeleteLog(index)}
                          size="small"
                          sx={{ color: "#fbc02d", mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteLog(index)}
                          size="small"
                          sx={{ color: "#F56565" }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </AccordionDetails>
      </Accordion>
      <Box
        display="grid"
        gridTemplateColumns="repeat(1, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt={3}
      >
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <LineChart />
        </Box>
      </Box>
      <AddWeightLog
        openModal={openModal}
        setOpenModal={setOpenModal}
        weightLogs={weightLogs}
        setWeightLogs={setWeightLogs}
      />
    </Box>
  );
};

export default WeightLogPage;
