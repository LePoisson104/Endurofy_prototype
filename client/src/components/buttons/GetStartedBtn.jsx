import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

const GetStartedBtn = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      component={Link}
      to="/signup"
      size="large"
      sx={{
        color: "white",
        bgcolor: colors.purpleAccent[400],
        "&:hover": { backgroundColor: colors.purpleAccent[300] },
        padding: "10px 20px",
        fontSize: 18,
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        borderRadius: 2,
        mb: 3,
      }}
    >
      Get started <span style={{ fontWeight: 300 }}>- it's free</span>
    </Button>
  );
};

export default GetStartedBtn;
