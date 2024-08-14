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
  id3, // Optional TextField props
  name3,
  label3,
  type3,
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
            console.log(formJson); // Log the form data
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
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#6d76fa", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6d76fa", // Border color when focused
                },
              },
            }}
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
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#6d76fa", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6d76fa", // Border color when focused
                },
              },
            }}
          />
          {/* Conditionally render the optional TextField */}
          {id3 && name3 && label3 && type3 && (
            <TextField
              autoFocus
              margin="dense"
              id={id3}
              name={name3}
              label={label3}
              type={type3}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#6d76fa", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6d76fa", // Border color when focused
                  },
                },
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "none", color: "#6d76fa" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              "&:hover": {
                color: "white",
                backgroundColor: "#868dfb",
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
