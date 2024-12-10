import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const FavoriteButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Checkbox
      icon={<BookmarkBorderIcon />}
      checkedIcon={<BookmarkIcon />}
      sx={{
        "&.Mui-checked": {
          color: colors.purpleAccent[400], // Color when active
        },
      }}
    />
  );
};

export default FavoriteButton;
