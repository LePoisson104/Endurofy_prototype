import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CustomFoodDeleteBtn = () => {
  return (
    <IconButton>
      <DeleteOutlineIcon sx={{ color: "#F56565" }} />
    </IconButton>
  );
};

export default CustomFoodDeleteBtn;
