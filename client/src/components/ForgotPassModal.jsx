import { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField, Typography } from "@mui/material";

const ForgotPasswordModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Typography
        onClick={handleClickOpen}
        sx={{
          color: "#6d76fa",
          "&:hover": {
            cursor: "pointer",
            color: "#3c47f9",
          },
        }}
      >
        Forgot password?
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
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
        <DialogTitle variant="h4" sx={{ color: "#6d76fa" }}>
          Reset your password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here. We
            will send you a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              "&:hover": {
                color: "white",
                backgroundColor: "#6d76fa",
              },
            }}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ForgotPasswordModal;
