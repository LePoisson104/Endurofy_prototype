import { Box, Typography, IconButton, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import useAuth from "../hooks/useAuth";
import { useGetAllUsersInfoQuery } from "../features/users/usersApiSlice";
import UserAvatarBtn from "./buttons/UserAvatarBtn";

const UserAvatar = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();
  const { data } = useGetAllUsersInfoQuery(userId);

  // Helper function to get the user's initial
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: isCollapsed ? "center" : "flex-start",
        borderRadius: 2,
        mt: "auto",
        bgcolor: isCollapsed ? "transparent" : colors.grey[1200],
        mb: 2,
        mr: 1,
        ml: 1,
        p: 2,
      }}
    >
      {/* User Avatar */}
      <Avatar
        src="" // Add valid `src` URL if available
        alt="User Photo"
        sx={{
          bgcolor: colors.purpleAccent[400],
          color: "white",
          fontWeight: "bold",
          mr: isCollapsed ? 0 : 1, // Remove margin when collapsed
        }}
      >
        {getInitial(data?.first_name)}
      </Avatar>

      {/* User Info */}
      {!isCollapsed && (
        <Box
          sx={{
            display: "flex", // Set the parent to flex
            alignItems: "center",
            justifyContent: "space-between", // Space between content and icon button
            maxWidth: "80%", // Box will take up to 60% width
            width: "100%", // Ensure it takes full width of available space
            flexShrink: 0, // Prevent shrinking
          }}
        >
          {/* User Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Stack first and last name, email vertically
              flexGrow: 1, // Let this section take up the remaining space
              minWidth: 0, // Important for ellipsis truncation to work on long text
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap", // Prevent wrapping of name
                overflow: "hidden", // Hide overflowing content
                textOverflow: "ellipsis", // Show ellipsis if text overflows
              }}
            >
              {data?.first_name || "Unknown"} {data?.last_name || "User"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                whiteSpace: "nowrap", // Prevent wrapping of email
                overflow: "hidden", // Hide overflowing content
                textOverflow: "ellipsis", // Show ellipsis if email overflows
              }}
            >
              {data?.email || "No email available"}
            </Typography>
          </Box>

          {/* IconButton */}
          <UserAvatarBtn />
        </Box>
      )}
    </Box>
  );
};

export default UserAvatar;
