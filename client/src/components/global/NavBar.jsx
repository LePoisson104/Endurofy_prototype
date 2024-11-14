import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = ["About", "Features", "Community", "Help Center", "Blog"];

  const DrawerContent = () => (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((text) => (
          <ListItem key={text} sx={{ display: "block", py: 1 }}>
            <Link
              to={`/${text.toLowerCase().replace(" ", "-")}`}
              className="animated-link"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                padding: "8px 16px",
              }}
              onClick={handleDrawerToggle}
            >
              {text}
            </Link>
          </ListItem>
        ))}
        <ListItem sx={{ display: "block", py: 1 }}>
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "white",
              color: "#3f3f3f",
              fontSize: "1rem",
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                bgcolor: "white",
              },
            }}
            onClick={handleDrawerToggle}
          >
            Log in
          </Button>
          <Button
            component={Link}
            to="/signup"
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: colors.purpleAccent[400],
              color: "white",
              borderRadius: 2,
              fontSize: 15,
              "&:hover": {
                bgcolor: colors.purpleAccent[400],
              },
            }}
            onClick={handleDrawerToggle}
          >
            Try for free
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        zIndex: 999,
        gap: 7,
        position: "sticky",
        display: "flex",
        alignItems: "center",
        justifyContent: { md: "space-evenly", xs: "space-between" },
        minHeight: "9vh",
        px: { xs: 2, md: 4 },
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h4"
        fontWeight="400"
        sx={{
          cursor: "pointer",
          fontSize: "1.75rem",
          display: "flex",
          alignItems: "center",
          fontWeight: { md: "bold", xs: 400 },
          ml: { xs: 3, md: 0 },
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <span style={{ color: "#6d76fa" }}>Fit</span>
          <span style={{ color: "#9a9ff1" }}>Tracker</span>
        </Link>
      </Typography>

      {/* Desktop Navigation */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "auto",
          gap: 4,
          ml: 4,
        }}
      >
        {navLinks.map((text) => (
          <Link
            key={text}
            to={`/${text.toLowerCase().replace(" ", "-")}`}
            className="animated-link"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {text}
          </Link>
        ))}
      </Box>

      {/* Desktop Buttons */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "white",
            color: "#3f3f3f",
            fontSize: "1rem",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          Log in
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: colors.purpleAccent[400],
            color: "white",
            borderRadius: 2,
            fontSize: 15,
            pl: 2,
            pr: 2,
            "&:hover": {
              bgcolor: colors.purpleAccent[400],
            },
          }}
        >
          Try for free
        </Button>
      </Box>

      {/* Mobile Menu Icon */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default NavBar;
