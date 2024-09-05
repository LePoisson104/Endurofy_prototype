import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        textAlign: "center",
        bgcolor: "#f0f0f0",
        p: "2",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
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
      </Box>
      <SentimentVeryDissatisfiedIcon
        sx={{ fontSize: "200px", color: "#AEAEAE" }}
      />
      <Typography color="#AEAEAE" fontWeight="400" fontSize="60px">
        404
      </Typography>
      <Typography color="#AEAEAE" fontWeight="400" fontSize="20px">
        Page Not Found
      </Typography>
      <Typography color="#555" mt={2}>
        Sorry, the page you are looking for does not exist or an error has
        occured.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
        sx={{
          mt: 3,
          backgroundColor: "#868dfb",
          "&:hover": {
            backgroundColor: "#757de8",
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
