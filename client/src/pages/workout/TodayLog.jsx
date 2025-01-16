import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import { Box, IconButton, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import AddWorkoutModal from "../../components/modals/AddWokoutModal";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const TodayLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sessionName, setSessionName] = useState("Today's Session");
  const [isEdit, setIsEdit] = useState(false);

  const [openModal, setOpenModal] = useState(false); // Modal state
  const [exerciseData, setExerciseData] = useState([]); // Store exercise data

  const [sessionNameInput, setSessionNameInput] = useState(sessionName);

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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Box
              sx={{
                width: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "blue",
              }}
            >
              <Typography
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <DeleteOutlineOutlinedIcon />
                Delete
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "blue",
              }}
            >
              <Typography
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <EditNoteIcon />
                Edit
              </Typography>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // bgcolor: "blue",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <TextFormatIcon />
            Exercise Name
          </Typography>
        </Box>
        <Box
          sx={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // bgcolor: "blue",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <SyncIcon fontSize="small" />
            Reps
          </Typography>
        </Box>
        <Box
          sx={{
            width: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // bgcolor: "blue",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <LineWeightIcon fontSize="small" />
            Weight <span style={{ fontWeight: 400 }}>(lbs or plates)</span>
          </Typography>
        </Box>

        <Box
          sx={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // bgcolor: "blue",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <LayersOutlinedIcon fontSize="small" />
            Category
          </Typography>
        </Box>
      </Box>

      {/* Horizontal line */}
      <Box
        sx={{ width: "100%", borderTop: "2px solid #888", mb: 1, mt: 1 }}
      ></Box>

      {exerciseData.length === 0 && (
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {" "}
                <Box
                  sx={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // bgcolor: "blue",
                  }}
                >
                  <IconButton>
                    <DeleteOutlineOutlinedIcon color="error" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // bgcolor: "blue",
                  }}
                >
                  <IconButton>
                    <EditOutlinedIcon sx={{ color: "#fbc02d" }} />
                  </IconButton>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                width: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "blue",
              }}
            >
              <Typography sx={{ display: "flex", gap: 1 }}>
                {exercise.name}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "blue",
              }}
            >
              <Typography>{exercise.reps}</Typography>
            </Box>
            <Box
              sx={{
                width: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "blue",
              }}
            >
              <Typography>{exercise.weight}</Typography>
            </Box>
            <Box
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "blue",
              }}
            >
              <Typography>{exercise.exerciseCategory}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderTop: `1px solid ${colors.grey[1100]}`,
              mb: 1,
              mt: 1,
            }}
          ></Box>
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
