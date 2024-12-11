import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import { useTheme } from "@emotion/react";
import DatePickerSelector from "../DatePickerSelector";

const AddWeightLog = ({
  openModal,
  setOpenModal,
  weightLogs,
  setWeightLogs,
}) => {
  const theme = useTheme();

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(null);

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

  return (
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
          <DatePickerSelector
            date={date}
            setDate={setDate}
            label={"Select Date"}
          />
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
  );
};

export default AddWeightLog;
