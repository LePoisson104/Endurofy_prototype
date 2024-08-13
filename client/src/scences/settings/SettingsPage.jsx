import { Box, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import UpdateButton from "../../components/UpdateButton";
import IOSSwitch from "../../components/IOSSwitch";

const Settings = () => {
  return (
    <Box m="20px">
      <Header title="Account Settings" />
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Login
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <TextField
            disabled
            label="First Name"
            value="Viet"
            sx={{ width: "40%" }}
          />
          <TextField
            disabled
            label="Last Name"
            value="Pham"
            sx={{ width: "40%" }}
          />
          <UpdateButton />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <TextField
            disabled
            label="Email"
            value="vietpham2017@gmail.com"
            sx={{ width: "81%" }}
          />
          <UpdateButton />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <TextField
            disabled
            label="Password"
            value="**************"
            sx={{ width: "81%" }}
          />
          <UpdateButton />
        </Box>
      </Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Notification
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 20, mb: 3 }}>
        <Typography variant="h5">
          Send me a reminder to enter my daily logs
        </Typography>
        <IOSSwitch />
      </Box>
    </Box>
  );
};

export default Settings;
