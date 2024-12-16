import { Box, Typography } from "@mui/material";
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
        height: "90vh",
        width: "100%",
        flexDirection: "column",
        textAlign: "center",
        bgcolor: colors.grey[1000],
        p: "2",
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
    </Box>
  );
};

export default NotFoundPage;
