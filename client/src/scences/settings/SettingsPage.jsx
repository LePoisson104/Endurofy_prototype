import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import IOSSwitch from "../../components/IOSSwitch";
import UpdateModal from "../../components/UpdateModal";
import DeleteAccountModal from "../../components/DeleteAccountModal";

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
            id1="currentPassword"
            name1="currentPassword"
            label1="Current Password"
            type1="password"
            id2="password"
            name2="password"
            label2="Password"
            type2="password"
            id3="confirmPassword"
            name3="confirmPassword"
            label3="Confirm Password"
            type3="password"
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
      <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Account Data
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 30, mb: 3 }}>
        <Box>
          <Typography variant="h5">Delete Account</Typography>
          <Typography fontWeight="light">
            If you delete your account, all your data will be permanently
            deleted.
          </Typography>
        </Box>
        <DeleteAccountModal />
      </Box>
    </Box>
  );
};

export default Settings;
