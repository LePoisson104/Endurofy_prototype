import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import ColorSelector from "../modals/ColorSelector";

const UserAvatarBtn = ({ avatarBgColor, setAvatarBgColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openColorModal, setOpenColorModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // if (file) {
    //   setSelectedImage(URL.createObjectURL(file)); // Preview image locally
    //   // Perform the upload to your backend
    //   uploadPhoto(file); // This will need to be implemented in your `useUploadPhotoMutation` API call
    // }
  };

  const handleOpenColorChange = () => {
    setOpenColorModal(true);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Box>
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top", // Keeps the menu aligned above the button vertically
            horizontal: "right", // Moves the menu to the right of the button
          }}
          transformOrigin={{
            vertical: "top", // Ensures the top of the menu aligns with the top of the button
            horizontal: "left", // Ensures the left side of the menu aligns with the right of the button
          }}
          sx={{
            marginLeft: 2, // Add an offset to the left to ensure it doesn't cover the button
          }}
          PaperProps={{
            sx: {
              backgroundColor: colors.grey[1200], // Make the modal (paper) background transparent
            },
          }}
        >
          <MenuItem onClick={handleOpenColorChange}>Change color</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Box>
      <ColorSelector
        open={openColorModal}
        setOpen={setOpenColorModal}
        avatarBgColor={avatarBgColor}
        setAvatarBgColor={setAvatarBgColor}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default UserAvatarBtn;
