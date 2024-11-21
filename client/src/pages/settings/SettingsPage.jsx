import { Box, TextField, Typography, Avatar, Button } from "@mui/material";
import { useState } from "react";
import { useGetAllUsersInfoQuery } from "../../features/users/usersApiSlice";
import { dateFormat } from "../../helper/dateFormat";
import Header from "../../components/global/Header";
import IOSSwitch from "../../components/switches/IOSSwitch";
import UpdateModal from "../../components/modals/UpdateModal";
import DeleteAccountModal from "../../components/modals/DeleteAccountModal";
import useAuth from "../../hooks/useAuth";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { getInitial } from "../../helper/getInitial";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DotPulse from "../../components/DotPulse";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { userId } = useAuth();
  const { data, isLoading } = useGetAllUsersInfoQuery(userId);
  const newDate = new Date(data?.user_updated_at);
  const { date, time } = dateFormat(newDate);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  return (
    <Box m="20px">
      <Header title="Account Settings" />
      {successMsg && (
        <SuccessAlert
          message={successMsg}
          duration={4000}
          setSuccessMsg={setSuccessMsg}
        />
      )}
      {errMsg && (
        <ErrorAlert message={errMsg} duration={3000} setErrMsg={setErrMsg} />
      )}
      {!data && isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <DotPulse />
        </Box>
      )}
      {data && !isLoading && (
        <>
          <Box>
            <Typography variant="h4">Login</Typography>
            <Typography fontWeight="light" sx={{ mb: 3 }}>
              Last updated on {date} | at {time}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box sx={{ width: "80%", display: "flex", gap: 2 }}>
                <TextField
                  disabled
                  label="First Name"
                  value={data?.first_name}
                  sx={{ width: "100%" }}
                />
                <TextField
                  disabled
                  label="Last Name"
                  value={data?.last_name}
                  sx={{ width: "100%" }}
                />
              </Box>
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
                setSuccessMsg={setSuccessMsg}
                setErrMsg={setErrMsg}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <TextField
                disabled
                label="Email"
                value={data?.email}
                sx={{ width: "80%" }}
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
                setSuccessMsg={setSuccessMsg}
                email={data.email}
                setErrMsg={setErrMsg}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <TextField
                disabled
                label="Password"
                value="**************"
                sx={{ width: "80%" }}
              />
              <UpdateModal
                title="Update Your Password"
                id1="currentPassword"
                name1="currentPassword"
                label1="Current Password"
                type1="password"
                id2="newPassword"
                name2="newPassword"
                label2="New Password"
                type2="password"
                id3="confirmPassword"
                name3="confirmPassword"
                label3="Confirm Password"
                type3="password"
                setSuccessMsg={setSuccessMsg}
                email={data.email}
                setErrMsg={setErrMsg}
              />
            </Box>
          </Box>

          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>

          {/* Profile picture */}
          <Box
            sx={{
              display: "flex",
              mb: 3,
              flexDirection: "column",
            }}
          >
            <Typography mb={3} variant="h4">
              Profile picture
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: 150,
                height: 150,
              }}
            >
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: colors.purpleAccent[400],
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3rem",
                }}
              >
                {getInitial(data?.first_name)}
              </Avatar>
              <Button
                startIcon={<EditOutlinedIcon fontSize="small" />}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: -10,
                  width: 70,
                  height: 30,
                  // border: "1px solid #616161",
                  textTransform: "none",
                  bgcolor:
                    theme.palette.mode === "dark" ? "black" : colors.grey[1200],
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "black"
                        : colors.grey[1200],
                  },
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>

          {/* Notification */}
          <Typography variant="h4" sx={{ mb: 3 }}>
            Notification
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", width: "100%", mb: 3 }}
          >
            <Box
              sx={{
                // display: "flex",
                // alignItems: "center",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <Typography variant="h5">
                Send me a reminder to enter my daily logs
              </Typography>
            </Box>
            <IOSSwitch />
          </Box>

          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>

          {/* Apperances */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3 }}>
              Appearance
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "500px" }}>
                <Typography variant="h5">Light</Typography>
                <Typography fontWeight={"light"}>
                  Turn the switch to turn on dark mode
                </Typography>
              </Box>
              <IOSSwitch />
            </Box>
          </Box>

          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>

          {/* Account data */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3 }}>
              Account Data
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "600px" }}>
                <Typography variant="h5">Delete Account</Typography>
                <Typography fontWeight="light">
                  If you delete your account, all your data will be permanently
                  deleted.
                </Typography>
              </Box>
              <DeleteAccountModal />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Settings;
