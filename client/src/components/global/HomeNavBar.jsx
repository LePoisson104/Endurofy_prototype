import React from "react";
import { Button, Typography, Box, IconButton, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const NavBar = ({ bgcolor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to toggle the drawer open/close
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

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
        backgroundColor: isScrolled ? "white" : `${bgcolor}`,
        width: "100%",
        height: "70px",
        display: "flex",
        justifyContent: {
          xs: "space-between", // Mobile: space-between
          md: "space-evenly", // Desktop: space-evenly
        },
        alignItems: "center",
        padding: {
          xs: "0 20px", // Mobile: 20px padding on sides
          md: "0 50px", // Desktop: 50px padding on sides
        },
        zIndex: 1000, // Ensure the navbar stays above other content
        gap: 30,
        backdropFilter: isScrolled ? "blur(10px)" : "none", // Apply blur when scrolled
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease", // Smooth transition
      }}
    >
      {/* Logo */}
      <Typography
        variant="h4" // Smaller variant for mobile
        fontWeight="400"
        sx={{
          cursor: "pointer",
          fontSize: {
            xs: "20px", // Mobile: Smaller font
            md: "28px", // Desktop: Larger font
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span style={{ fontWeight: "bold", color: "white" }}>Fit</span>
          <span style={{ fontWeight: "bold", color: "white" }}>Tracker</span>
        </Link>
      </Typography>

      {/* Hamburger Icon for Mobile */}
      <IconButton
        sx={{
          display: {
            xs: "flex", // Mobile: Show icon
            md: "none", // Desktop: Hide icon
          },
          color: "black",
          "&:hover": {
            color: "#6d76fa",
          },
        }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Navigation Links */}
      <Box
        sx={{
          display: {
            xs: "none", // Mobile: Hide links
            md: "flex", // Desktop: Show links
          },
          gap: 3,
          alignItems: "center",
        }}
      >
        <Link className="nav-link">About</Link>
        <Link className="nav-link">Features</Link>
        <Link className="nav-link">Exercise</Link>
        <Link to="/login">
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "transparent",
              paddingLeft: "22px",
              paddingRight: "22px",
              height: "35px",
              fontSize: "14px",
            }}
          >
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "white",
              color: colors.purpleAccent[400],
              paddingLeft: "15px",
              paddingRight: "15px",
              height: "35px",
              "&:hover": {
                backgroundColor: colors.grey[1000],
              },
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Box>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="top" // Drawer slides from the top
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Link className="drawer-nav-link" onClick={toggleDrawer(false)}>
          About
        </Link>
        <Link className="drawer-nav-link" onClick={toggleDrawer(false)}>
          Features
        </Link>
        <Link className="drawer-nav-link" onClick={toggleDrawer(false)}>
          Exercise
        </Link>
        <Link className="drawer-nav-link" onClick={toggleDrawer(false)}>
          Contact
        </Link>
        <Link to="/login">
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "transparent",
              color: "black",
              paddingLeft: "22px",
              paddingRight: "22px",
              height: "35px",
              border: "1px solid gray",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              margin: "10px 0",
            }}
            onClick={toggleDrawer(false)}
          >
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              paddingLeft: "15px",
              paddingRight: "15px",
              height: "35px",
              "&:hover": {
                backgroundColor: "#868dfb",
              },
              margin: "10px 0",
            }}
            onClick={toggleDrawer(false)}
          >
            Sign Up
          </Button>
        </Link>
      </Drawer>
    </Box>
  );
};

export default NavBar;
