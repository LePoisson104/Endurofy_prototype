import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const DeleteAccountModal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{
          textTransform: "none",
          backgroundColor: "#FF5B61",
          color: "white",
          height: "2.5rem",
          "&:hover": {
            backgroundColor: "#FF8488",
          },
        }}
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: {
            bgcolor:
              theme.palette.mode === "dark" ? colors.primary[500] : "white",
          },
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Delete Your Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you delete your account, all your data will be permanently
            deleted.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined" // Use 'outlined' to apply border styles
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#FF5B61", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF5B61", // Border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "grey", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FF5B61", // Label color when focused
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "none", color: "#FF5B61" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#FF5B61",
              "&:hover": {
                backgroundColor: "#FF8488",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteAccountModal;
