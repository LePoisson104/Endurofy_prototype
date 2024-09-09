import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        p: 2,
        backdropFilter: isScrolled ? "blur(10px)" : "none", // Apply blur when scrolled
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease", // Smooth transition
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* SEARCH BAR */}
        <Box display="flex" alignItems="center">
          <InputBase
            placeholder="Search…"
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "5px",
              padding: "0 10px",
              width: "250px",
            }}
          />
          <IconButton type="submit" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
