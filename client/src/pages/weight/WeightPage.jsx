import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const WeightLogPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [weightLogs, setWeightLogs] = useState([]);
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  const handleAddWeightLog = (event) => {
    event.preventDefault();
    const newLog = { weight, date };
    setWeightLogs([...weightLogs, newLog]);
    setWeight("");
    setDate("");
  };

  const handleDeleteLog = (index) => {
    const updatedLogs = weightLogs.filter((log, i) => i !== index);
    setWeightLogs(updatedLogs);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header title={"Weight Log"} subtitle={"Streaks: 2 days"} />
      <Box
        component="form"
        onSubmit={handleAddWeightLog}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "400px",
          marginBottom: 3,
        }}
      >
        <TextField
          required
          label="Weight (lbs)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
        />
        <TextField
          required
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#6d76fa",
            color: "white",
            "&:hover": { backgroundColor: "#868dfb" },
          }}
        >
          Add Log
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ bgcolor: colors.primary[400] }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Weight (lbs)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weightLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.weight}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleDeleteLog(index)}
                    sx={{
                      textTransform: "none",
                      color: "#FF5B61",
                      "&:hover": { color: "#FF8488" },
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeightLogPage;
