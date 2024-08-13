import { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField, Typography } from "@mui/material";

const UpdateModal = ({
  title,
  id1,
  name1,
  label1,
  type1,
  id2,
  name2,
  label2,
  type2,
}) => {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          width: "5rem",
          height: "2.5rem",
          borderRadius: "5px",
          backgroundColor: "#6d76fa",
          "&:hover": {
            cursor: "pointer",
            background: "#868dfb",
          },
        }}
      >
        Update
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
          sx: { width: "500px" },
        }}
      >
        <DialogTitle variant="h4" sx={{ color: "#6d76fa" }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id={id1}
            name={name1}
            label={label1}
            type={type1}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id={id2}
            name={name2}
            label={label2}
            type={type2}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UpdateModal;
