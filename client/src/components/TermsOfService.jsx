import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const TermsOfService = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const linkStyle = {
    color: "black",
    fontWeight: 400,
    color: colors.purpleAccent[400],
    textDecoration: "none",
  };

  return (
    <>
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
    </>
  );
};

export default TermsOfService;
