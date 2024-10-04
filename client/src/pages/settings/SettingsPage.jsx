import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../components/global/Header";
import IOSSwitch from "../../components/IOSSwitch";
import UpdateModal from "../../components/modals/UpdateModal";
import DeleteAccountModal from "../../components/modals/DeleteAccountModal";
import { useGetAllUsersInfoQuery } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import { dateFormat } from "../../helper/dateFormat";

const Settings = () => {
  const { userId } = useAuth();
  const { data, isLoading } = useGetAllUsersInfoQuery(userId);
  console.log(data);
  const newDate = new Date(data?.user_updated_at);
  const { date, time } = dateFormat(newDate);

  return (
    <Box m="20px">
      <Header title="Account Settings" />
      {data && !isLoading && (
        <>
          <Box>
            <Typography variant="h4">Login</Typography>
            <Typography fontWeight="light" sx={{ mb: 3 }}>
              Last updated on {date} | at {time}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <TextField
                disabled
                label="First Name"
                value={data?.first_name}
                sx={{ width: "40%" }}
              />
              <TextField
                disabled
                label="Last Name"
                value={data?.last_name}
                sx={{ width: "40%" }}
              />
              <UpdateModal
                title="Update Your Name"
                id1="firstName"
                name1="firstName"
                label1="First Name"
                type1="text"
                initialValue1={data?.first_name}
                id2="lastName"
                name2="lastName"
                label2="Last Name"
                type2="text"
                initialValue2={data?.last_name}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <TextField
                disabled
                label="Email"
                value={data?.email}
                sx={{ width: "81%" }}
              />
              <UpdateModal
                title="Update Your Email"
                id1="currentPassword"
                name1="currentPassword"
                label1="Current Password"
                type1="password"
                id2="newEmail"
                name2="newEmail"
                label2="New Email"
                type2="email"
                id3="confirmEmail"
                name3="confirmEmail"
                label3="Confirm Email"
                type3="email"
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
            Appearance
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 20, mb: 3 }}>
            <Box>
              <Typography variant="h5">Light</Typography>
              <Typography fontWeight={"light"}>
                Turn the switch to turn on dark mode
              </Typography>
            </Box>
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
        </>
      )}
    </Box>
  );
};

export default Settings;
