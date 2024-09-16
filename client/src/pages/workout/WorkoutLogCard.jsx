import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import AddWorkoutModal from "../../components/modals/AddWokoutModal";

const WorkoutLogCard = ({
  logName,
  date,
  exercises,
  onAddExercise,
  onEditExercise,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [exerciseData, setExerciseData] = useState(exercises);
  const [currentExercise, setCurrentExercise] = useState(null); // To hold the exercise to be edited
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenModal = (index = null) => {
    setEditIndex(index);
    if (index !== null) {
      // When editing, set the current exercise
      setCurrentExercise(exerciseData[index]);
    } else {
      // Reset when adding a new exercise
      setCurrentExercise(null);
    }
    setOpenModal(true);
  };

  const handleAddExercise = (newExercise) => {
    if (editIndex !== null) {
      // Editing an existing exercise
      const updatedExercises = [...exerciseData];
      updatedExercises[editIndex] = newExercise;
      setExerciseData(updatedExercises);
      onEditExercise(editIndex, newExercise);
    } else {
      // Adding a new exercise
      setExerciseData((prevExercises) => [...prevExercises, newExercise]);
      onAddExercise(newExercise);
    }
    setOpenModal(false);
    setEditIndex(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: colors.primary[400],
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {logName}
          </Typography>
          <Typography variant="h7" fontWeight={300}>
            {date}
          </Typography>
        </Box>
        <IconButton
          onClick={handleExpandClick}
          sx={{ color: colors.grey[100] }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List>
          {exerciseData.map((exercise, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={exercise.name}
                secondary={`${exercise.sets} sets, ${exercise.reps} reps, ${exercise.weight} lbs`}
                primaryTypographyProps={{
                  color: colors.greenAccent[500],
                  fontSize: "15px",
                }}
                secondaryTypographyProps={{
                  color: colors.grey[100],
                  fontSize: "14px",
                }}
              />
              <Button
                variant="outlined"
                onClick={() => handleOpenModal(index)}
                sx={{
                  borderColor: colors.greenAccent[400],
                  color: colors.greenAccent[400],
                  textTransform: "none",
                  "&:hover": {
                    borderColor: colors.greenAccent[400],
                  },
                }}
              >
                Edit
              </Button>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={() => handleOpenModal()}
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: colors.purpleAccent[400],
              color: "white",
              "&:hover": {
                bgcolor: colors.purpleAccent[300],
              },
            }}
          >
            Add Exercise
          </Button>
        </Box>
      </Collapse>

      {/* Add/Edit Exercise Modal */}
      <AddWorkoutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setExerciseData={handleAddExercise} // Use this to handle add/edit
        currentExercise={currentExercise} // Pass current exercise for editing
      />
    </Box>
  );
};

export default WorkoutLogCard;
