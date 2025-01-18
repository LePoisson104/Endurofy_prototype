import { Fragment, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useUpdateUserAccountMutation } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import LoginAgain from "../alerts/LoginAgain";
import { errorResponse } from "../../helper/errorResponse";

const UpdateModal = ({
  title,
  id1,
  name1,
  label1,
  type1,
  initialValue1,
  id2,
  name2,
  label2,
  type2,
  initialValue2,
  id3, // Optional TextField props
  name3,
  label3,
  type3,
  initialValue3,
  setSuccessMsg,
  email,
  setErrMsg,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(initialValue1 || "");
  const [value2, setValue2] = useState(initialValue2 || "");
  const [value3, setValue3] = useState(initialValue3 || "");
  const [isUpdateEmail, setIsUpdateEmail] = useState(false);
  const [isUpdateEmailSuccess, setIsUpdateEmailSuccess] = useState(false);
  const [updateUserAccount, { isLoading, isSuccess }] =
    useUpdateUserAccountMutation();
  const { userId } = useAuth();

  useEffect(() => {
    if (isUpdateEmail && isSuccess) {
      setIsUpdateEmailSuccess(true);
    }
  }, [isUpdateEmail, isSuccess]);

  useEffect(() => {
    // Update state when initialValues change
    setValue1(initialValue1 || "");
    setValue2(initialValue2 || "");
    setValue3(initialValue3 || "");
  }, [initialValue1, initialValue2, initialValue3]);

  const handleClickOpen = () => {
    setOpen(true);
    setValue1(initialValue1 || "");
    setValue2(initialValue2 || "");
    setValue3(initialValue3 || "");
  };

  const handleClose = () => {
    setErrMsg("");
    setOpen(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [value1, value2, value3, setErrMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if ("confirmEmail" in payload) {
      if (payload.newEmail !== payload.confirmEmail) {
        return setErrMsg("Confirm Email Must Match!");
      }
      setIsUpdateEmail(true);
      payload.email = email;
      delete payload.confirmEmail;
    } else if ("confirmPassword" in payload) {
      if (payload.newPassword !== payload.confirmPassword) {
        return setErrMsg("Confirm Password Must Match!");
      }
      payload.email = email;
      delete payload.confirmPassword;
    }

    try {
      const data = await updateUserAccount({ userId, payload }).unwrap();
      setSuccessMsg(data?.message);
      handleClose();
    } catch (err) {
      errorResponse(err, setErrMsg);
    }
  };

  return (
    <>
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
            sx: {
              bgcolor:
                theme.palette.mode === "dark" ? colors.primary[500] : "#f5f5f5", // Adjust background based on theme
              width: "500px", // Modal width
            },
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>{title}</DialogTitle>
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
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#868dfb", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#868dfb", // Border color when focused
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
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#868dfb", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#868dfb", // Border color when focused
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
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "gray", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#868dfb", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#868dfb", // Border color when focused
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
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{ textTransform: "none", color: "#868dfb" }}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
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
              {!isLoading && <>Update</>}
              {isLoading && (
                <CircularProgress size={20} sx={{ color: "white" }} />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
      <LoginAgain open={isUpdateEmailSuccess} />
    </>
  );
};

export default UpdateModal;
