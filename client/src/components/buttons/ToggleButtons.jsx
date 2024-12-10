import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const ToggleButtons = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [alignment, setAlignment] = useState("All");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const buttonStyles = {
    textTransform: "none",
    flex: 1,
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <ToggleButton value="All" sx={{ ...buttonStyles }}>
        All
      </ToggleButton>
      <ToggleButton value="Favorites" sx={{ ...buttonStyles }}>
        Favorites
      </ToggleButton>
      <ToggleButton value="Custom" sx={{ ...buttonStyles }}>
        Custom
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
