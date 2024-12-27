import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtons = ({ alignment, setAlignment, setSearchTerm }) => {
  const handleChange = (e) => {
    setAlignment(e.target.value);
    setSearchTerm("");
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
