import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

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
      <Typography variant="h1" color="#868dfb" fontWeight="bold">
        404 NOT FOUND
      </Typography>
      <Typography variant="h5" color="#555" mt={2}>
        Sorry, the page you are looking for does not exist.
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
