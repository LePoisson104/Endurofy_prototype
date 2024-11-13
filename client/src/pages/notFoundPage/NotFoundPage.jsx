import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const NotFoundPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        flexDirection: "column",
        textAlign: "center",
        bgcolor: colors.grey[1000],
        p: "2",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      <SentimentVeryDissatisfiedIcon
        sx={{ fontSize: { sm: "13rem", xs: "10rem" }, color: "#AEAEAE" }}
      />
      <Typography color="#AEAEAE" fontWeight="400" fontSize="60px">
        404
      </Typography>
      <Box sx={{ width: { sm: "500px", xs: "350px" } }}>
        <Typography color="#AEAEAE" fontWeight="400" fontSize="20px">
          Page Not Found
        </Typography>
        <Typography color="#555" mt={2} mr={3} ml={3}>
          Sorry, the page you are looking for does not exist or an error has
          occured.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
        sx={{
          width: "7rem",
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
