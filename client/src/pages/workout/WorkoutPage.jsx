import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GridOnIcon from "@mui/icons-material/GridOn";
import ScaleIcon from "@mui/icons-material/Scale";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { textFieldStyles } from "../profile/TextFieldStyles";
import { Delete, DeleteOutline } from "@mui/icons-material";

const WorkoutLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedTab, setSelectedTab] = useState("today");
  const [isEdit, setIsEdit] = useState(false);
  const [sessionName, setSessionName] = useState("Today's Session");
  const [sessionNameInput, setSessionNameInput] = useState(sessionName);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [exerciseData, setExerciseData] = useState([]); // Store exercise data
  const [exerciseNameInput, setExerciseNameInput] = useState(exerciseData.name);
  console.log(exerciseNameInput);
  const [exerciseSetInput, setExerciseSetInput] = useState(exerciseData.sets);
  const [exerciseRepsInput, setExerciseRepsInput] = useState(exerciseData.reps);
  const [exerciseWeightInput, setExerciseWeightInput] = useState(
    exerciseData.weight
  );
  // Form data for the modal
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleEdit = () => {
    setIsEdit(true);
  };

  const HandleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleSaveChanges = () => {
    const newExercise = {
      name: exerciseNameInput,
      exerciseSetInput,
      exerciseRepsInput,
      exerciseWeightInput,
    };
    setSessionName(sessionNameInput);
    setExerciseData([...exerciseData, newExercise]); // Add new exercise to the list
    setIsEdit(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Handle modal open/close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setExerciseName("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleSaveExercise = () => {
    const newExercise = {
      name: exerciseName,
      sets,
      reps,
      weight,
    };

    setExerciseData([...exerciseData, newExercise]); // Add new exercise to the list
    handleCloseModal();
  };

  return (
    <Box sx={{ p: "20px" }}>
      <Header title={"Workouts"} subtitle={"August 29, 2024 | 4:32 AM"} />

      {/* Filter tabs */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "today"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("today")}
        >
          <TodayIcon fontSize="small" />
          Today
        </IconButton>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "week"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("week")}
        >
          <CalendarMonthIcon fontSize="small" />
          Week
        </IconButton>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "month"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("month")}
        >
          <CalendarMonthIcon fontSize="small" />
          Month
        </IconButton>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "all"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("all")}
        >
          <GridOnIcon fontSize="small" />
          All
        </IconButton>
      </Box>
      <Box
        sx={{ width: "100%", borderTop: "1px solid #888", mb: 3, mt: 1 }}
      ></Box>

      {/* Editable session name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {!isEdit && (
          <Typography variant="h3" fontWeight={"bold"}>
            {sessionName}
          </Typography>
        )}
        {isEdit && (
          <TextField
            value={sessionNameInput}
            variant="standard"
            onChange={(e) => setSessionNameInput(e.target.value)}
          />
        )}
        <IconButton onClick={handleEdit}>
          <EditNoteIcon />
        </IconButton>
        {isEdit && (
          <>
            <Button
              sx={{
                color: "#6d76fa",
                textTransform: "none",
                bgcolor: colors.primary[400],
              }}
              onClick={HandleCancelEdit}
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
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </>
        )}

        {/* Add exercise button */}
        <IconButton
          size="small"
          sx={{
            color: "white",
            bgcolor: "#6d76fa",
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
          onClick={handleOpenModal}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Modal for adding exercises */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode == "dark" ? "#101624" : "white",
          },
        }}
      >
        <DialogTitle>Add Exercise</DialogTitle>
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
            margin="dense"
            label="Sets"
            fullWidth
            variant="outlined"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            sx={{ ...textFieldStyles }}
          />
          <TextField
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            sx={{ textTransform: "none", color: colors.purpleAccent[400] }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveExercise}
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

      {/* Table for exercises */}
      <Box
        sx={{ width: "100%", borderTop: "2px solid #888", mb: 1, mt: 1 }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isEdit && (
          <Box sx={{ width: "14%" }}>
            <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <DeleteOutlineIcon />
              Delete
            </Typography>
          </Box>
        )}
        <Box sx={{ width: "14%" }}>
          <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextFormatIcon />
            Exercise Name
          </Typography>
        </Box>
        <Box sx={{ width: "14%" }}>
          <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormatListNumberedIcon fontSize="small" />
            Set
          </Typography>
        </Box>
        <Box sx={{ width: "14%" }}>
          <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormatListNumberedIcon fontSize="small" />
            Last Session
          </Typography>
        </Box>
        <Box sx={{ width: "14%" }}>
          <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormatListNumberedIcon fontSize="small" />
            Reps
          </Typography>
        </Box>
        <Box sx={{ width: "14%" }}>
          <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ScaleIcon fontSize="small" />
            Weight <span style={{ fontWeight: 300 }}>(lbs or plates)</span>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ width: "100%", borderTop: "2px solid #888", mb: 1, mt: 1 }}
      ></Box>

      {exerciseData.map((exercise, index) => (
        <>
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isEdit && (
              <Box sx={{ width: "14%" }}>
                <IconButton>
                  <RemoveIcon color="error" />
                </IconButton>
              </Box>
            )}
            <Box
              sx={{
                width: "14%",
              }}
            >
              {!isEdit && (
                <Typography
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {exercise.name}
                </Typography>
              )}
              {isEdit && (
                <TextField
                  variant="standard"
                  value={exerciseNameInput}
                  onChange={(e) => setExerciseNameInput(e.target.value)}
                />
              )}
            </Box>
            <Box sx={{ width: "14%" }}>
              {!isEdit && (
                <Typography
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {exercise.sets}
                </Typography>
              )}
              {isEdit && <TextField variant="standard" />}
            </Box>
            <Box sx={{ width: "14%" }}>
              {!isEdit && (
                <Typography
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  6
                </Typography>
              )}
              {isEdit && <TextField variant="standard" />}
            </Box>
            <Box sx={{ width: "14%" }}>
              {!isEdit && (
                <Typography
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {exercise.reps}
                </Typography>
              )}
              {isEdit && <TextField variant="standard" />}
            </Box>
            <Box sx={{ width: "14%" }}>
              {!isEdit && (
                <Typography
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {exercise.weight}
                </Typography>
              )}
              {isEdit && <TextField variant="standard" />}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderTop: `1px solid ${
                theme.palette.mode == "dark" ? "#666" : "#ccc"
              }`,
              mb: 1,
              mt: 1,
            }}
          ></Box>
        </>
      ))}
    </Box>
  );
};

export default WorkoutLog;
