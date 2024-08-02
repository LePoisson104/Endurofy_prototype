import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "white",
        width: "100%",
        height: "70px",
        display: "flex",
        justifyContent: "space-evenly",
        gap: { xl: 130, lg: 90 },
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        fontWeight="400"
        sx={{
          cursor: "pointer",
        }}
      >
        <Link to="#" style={{ textDecoration: "none" }}>
          <span className="purple-style">Fit</span>
          <span className="grey-style">Tracker</span>
        </Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Link className="nav-link">About</Link>
        <Link className="nav-link">Features</Link>
        <Link className="nav-link">Exercise</Link>
        <Link className="nav-link">Contact</Link>
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
            }}
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
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NavBar;
