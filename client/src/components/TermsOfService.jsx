import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const TermsOfService = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const linkStyle = {
    fontWeight: 400,
    color: colors.purpleAccent[400],
    textDecoration: "none",
  };

  return (
    <Box
      sx={{
        textAlign: "center", // Center text within the box
        width: { sm: "400px", xs: "350px" },
        p: 2, // Padding for spacing
        mt: "auto",
      }}
    >
      <Typography fontWeight={300}>
        By proceeding you acknowledge that you have read,
      </Typography>
      <Typography fontWeight={"light"}>
        understood and agree to our{" "}
        <Link style={{ ...linkStyle }} to={"/terms"}>
          Terms of Service.
        </Link>{" "}
        and{" "}
        <Link style={{ ...linkStyle }} to={"/privacy"}>
          Privacy Policy.
        </Link>
      </Typography>
    </Box>
  );
};

export default TermsOfService;
