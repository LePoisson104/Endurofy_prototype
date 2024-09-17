import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import { useTheme } from "@emotion/react";

const AddWaterModal = ({ openModal, setOpenModal }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      PaperProps={{
        sx: {
          width: "350px", // Set the width of the modal
          height: "200px",
          bgcolor: theme.palette.mode == "dark" ? "#101624" : "white",
        },
      }}
    >
      <DialogTitle>Add Water</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            required
            label="Fluid Ounce (fl oz)"
            type="number"
            fullWidth
            sx={{ ...textFieldStyles }}
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

export default AddWaterModal;
