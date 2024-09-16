import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import { Box, IconButton, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ScaleIcon from "@mui/icons-material/Scale";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import AddWorkoutModal from "../../components/modals/AddWokoutModal";

const TodayLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sessionName, setSessionName] = useState("Today's Session");
  const [isEdit, setIsEdit] = useState(false);
  const [sessionNameInput, setSessionNameInput] = useState(sessionName);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [exerciseData, setExerciseData] = useState([]); // Store exercise data

  const handleEdit = () => {
    setIsEdit(true);
  };

  const HandleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleSaveChanges = () => {
    setSessionName(sessionNameInput);
    setIsEdit(false);
  };

  // Handle modal open/close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box>
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
        {/* show delete button when in edit mode */}
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
            Set Number
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
      {exerciseData.length == 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Typography variant="h5">No Data</Typography>
        </Box>
      )}
      {exerciseData.map((exercise, index) => (
        <Box key={index}>
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
                <IconButton>
                  <RemoveIcon color="error" />
                </IconButton>
              </Box>
            )}
            <Box sx={{ width: "14%" }}>
              <Typography sx={{ display: "flex", gap: 1 }}>
                {exercise.name}
              </Typography>
            </Box>
            <Box sx={{ width: "14%" }}>
              <Typography>{exercise.sets}</Typography>
            </Box>
            <Box sx={{ width: "14%" }}>
              <Typography>{exercise.lastSession}</Typography>
            </Box>
            <Box sx={{ width: "14%" }}>
              <Typography>{exercise.reps}</Typography>
            </Box>
            <Box sx={{ width: "14%" }}>
              <Typography>{exercise.weight}</Typography>
            </Box>
          </Box>
        </Box>
      ))}

      {/* AddWorkoutModal Component */}
      <AddWorkoutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setExerciseData={setExerciseData}
      />
    </Box>
  );
};

export default TodayLog;
