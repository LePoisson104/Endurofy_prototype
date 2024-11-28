import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import ExerciseSelect from "../selects/ExerciseSelect";

const AddWorkoutModal = ({
  openModal,
  setOpenModal,
  setExerciseData,
  currentExercise,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // UseEffect to populate the form when editing
  const [exerciseName, setExerciseName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseCategory, setExerciseCategory] = useState("");

  useEffect(() => {
    if (currentExercise) {
      // Populate fields if editing
      setExerciseName(currentExercise.name);
      setReps(currentExercise.reps);
      setWeight(currentExercise.weight);
    } else {
      // Reset fields if adding a new exercise
      setExerciseName("");
      setReps("");
      setWeight("");
      setExerciseCategory("");
    }
  }, [currentExercise]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddExercise = () => {
    // Add the new exercise to the exercise data in WorkoutLog
    const newExercise = {
      name: exerciseName,
      reps,
      weight,
      exerciseCategory,
    };

    if (!currentExercise) {
      setExerciseData((prevData) => [...prevData, newExercise]);
    } else {
      setExerciseData(newExercise);
    }

    // Reset the form and close the modal
    setExerciseName("");
    setReps("");
    setWeight("");

    handleCloseModal();
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          bgcolor: theme.palette.mode === "dark" ? "#101624" : "white",
        },
      }}
    >
      <DialogTitle>
        {currentExercise ? "Edit Exercise" : "Add Exercise"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Exercise Name"
          fullWidth
          variant="outlined"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          sx={{ ...textFieldStyles }}
        />

        <TextField
          type="number"
          margin="dense"
          label="Reps"
          fullWidth
          variant="outlined"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          sx={{ ...textFieldStyles }}
        />
        <TextField
          margin="dense"
          label="Weight"
          fullWidth
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          sx={{ ...textFieldStyles }}
        />
        <ExerciseSelect
          exerciseCategory={exerciseCategory}
          setExerciseCategory={setExerciseCategory}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          sx={{ textTransform: "none", color: colors.purpleAccent[400] }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddExercise}
          sx={{
            textTransform: "none",
            color: "white",
            backgroundColor: colors.purpleAccent[400],
            "&:hover": {
              bgcolor: colors.purpleAccent[300],
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWorkoutModal;
