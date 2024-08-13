import { Box, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import IOSSwitch from "../../components/IOSSwitch";
import UpdateModal from "../../components/UpdateModal";

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
          <UpdateModal
            title="Update Your Name"
            id1="firstName"
            name1="firstName"
            label1="First Name"
            type1="text"
            id2="lastName"
            name2="lastName"
            label2="Last Name"
            type2="text"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <TextField
            disabled
            label="Email"
            value="vietpham2017@gmail.com"
            sx={{ width: "81%" }}
          />
          <UpdateModal
            title="Update Your Email"
            id1="newEmail"
            name1="newEmail"
            label1="New Email"
            type1="email"
            id2="confirmEmail"
            name2="confirmEmail"
            label2="Confirm Email"
            type2="email"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <TextField
            disabled
            label="Password"
            value="**************"
            sx={{ width: "81%" }}
          />
          <UpdateModal
            title="Update Your Password"
            id1="newPassword"
            name1="newPassword"
            label1="New Password"
            type1="password"
            id2="confirmPassword"
            name2="confirmPassword"
            label2="Confirm Password"
            type2="password"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
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
