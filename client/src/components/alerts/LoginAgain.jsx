import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const LoginAgain = ({ open }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logout] = useLogoutMutation();

  const handleLoginRedirect = async () => {
    await logout();
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: colors.primary[400], // Customize modal background color
          borderRadius: "10px", // Optional: Rounded corners
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: 45,
              backgroundColor: "#fff9c4",
              borderRadius: 50,
            }}
          >
            <WarningAmberRoundedIcon
              sx={{ color: "#f9a825" }}
              fontSize="large"
            />
          </div>
          Please Log In Again
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Your email has been successfully updated. For security reasons, you
          need to log in again to continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleLoginRedirect}
          variant="contained"
          sx={{
            color: "white",
            textTransform: "none",
            bgcolor: colors.purpleAccent[400],
            mb: 2,
            mr: 2,
            "&:hover": {
              bgcolor: colors.purpleAccent[300],
            },
          }}
        >
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginAgain;
