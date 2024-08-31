import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const WorkoutLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleAddWorkout = () => {
    const newWorkout = { exercise, sets, reps, weight };
    setWorkouts([...workouts, newWorkout]);
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  return (
    <Box sx={{ p: "20px" }}>
      <Header title={"Workout Log"} subtitle={"August 29, 2024 | 4:32 AM"} />

      {/* Add Exercise Form */}
      <Paper
        sx={{ p: 2, mb: 2, bgcolor: colors.primary[400], borderRadius: 0 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Log a New Exercise
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: "#868dfb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#868dfb",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#868dfb", // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: "#868dfb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#868dfb",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#868dfb", // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: "#868dfb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#868dfb",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#868dfb", // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Weight (lbs)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: "#868dfb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#868dfb",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#868dfb", // Label color when focused
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddWorkout}
              sx={{
                mt: 2,
                backgroundColor: "#6d76fa",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#868dfb",
                },
              }}
            >
              Add Exercise
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Workout List */}
      <Paper sx={{ p: 2, bgcolor: colors.primary[400], borderRadius: 0 }}>
        <Typography variant="h6" fontWeight="bold">
          Today's Workout
        </Typography>
        <Divider sx={{ my: 2 }} />
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveWorkout(index)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "#fbc02d" }}>
                  <EditNoteIcon />
                </IconButton>
                <Typography>
                  {workout.exercise} - {workout.sets} sets of {workout.reps}{" "}
                  reps @ {workout.weight} lbs
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No exercises logged yet.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default WorkoutLog;
