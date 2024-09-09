import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { textFieldStyles } from "../profile/TextFieldStyles";
import LineChart from "../../components/charts/LineChart";

const WeightLogPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [weightLogs, setWeightLogs] = useState([]);
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = useState(false); // State for accordion

  const handleAddWeightLog = (event) => {
    event.preventDefault();
    if (date && weight) {
      const newLog = { weight, date: date.toDateString() }; // Convert date to string for display
      setWeightLogs([...weightLogs, newLog]);
      setWeight("");
      setDate(null); // Reset date to null after adding
      setOpenModal(false); // Close modal after adding
    }
  };

  const handleDeleteLog = (index) => {
    const updatedLogs = weightLogs.filter((log, i) => i !== index);
    setWeightLogs(updatedLogs);
  };

  const FilterSelect = () => {
    const [month, setMonth] = useState("");

    const handleChange = (event) => {
      setMonth(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              "&.Mui-focused": {
                color: "#868dfb",
              },
            }}
          >
            Month
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            onChange={handleChange}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#868dfb", // Border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#868dfb",
              },
            }}
          >
            <MenuItem value={"Current Week"}>Current Week</MenuItem>
            <MenuItem value={"Last Week"}>Last Week</MenuItem>
            <MenuItem value={"This Month"}>This Month</MenuItem>
            <MenuItem value={"Show All"}>Show All</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header title={"Weight Log"} subtitle={"Sep 9, 2024 | Streaks: 2 days"} />
      {/* Filter Date */}
      <Box sx={{ display: "flex", mb: 3, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <DatePickerSelector />
          <DatePickerSelector />
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
                      Weight (lbs)
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
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDeleteLog(index)}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteLog(index)}
                          size="small"
                        >
                          <DeleteIcon />
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

      {/* Modal for Adding Weight Log */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            width: "400px", // Set the width of the modal
            height: "280px",
            bgcolor: theme.palette.mode == "dark" ? "#101624" : "white",
          },
        }}
      >
        <DialogTitle>Add Weight Log</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleAddWeightLog}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
              maxWidth: "400px",
            }}
          >
            <TextField
              required
              label="Weight (lbs)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              sx={{ ...textFieldStyles }}
            />
            <DatePickerSelector date={date} setDate={setDate} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{ color: "#6d76fa", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleAddWeightLog}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              "&:hover": { backgroundColor: "#868dfb" },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WeightLogPage;
