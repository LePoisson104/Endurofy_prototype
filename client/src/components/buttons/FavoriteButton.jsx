import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useAuth from "../../hooks/useAuth";
import { findFoodMacros } from "../../helper/findFoodMacros";
import { toKcal } from "../../helper/toKcal";

const FavoriteButton = ({ food }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();

  let Kcal;

  if (findFoodMacros(food, "Energy")?.unitName === "kJ") {
    Kcal = toKcal(findFoodMacros(food, "Energy")?.value);
  }

  const foodMacros = findFoodMacros(food, "Protein");

  console.log(foodMacros);

  const foodPayload = {
    favFoodId: food?.fdcId,
    userId: userId,
    foodName: food?.description,
    foodBrand: food?.brandName ? food?.brandName : "unknown",
    servingUnit: food?.servingSizeUnit,
    calories: Kcal,
    protein: 1,
  };

  return (
    <Checkbox
      icon={<BookmarkBorderIcon />}
      checkedIcon={<BookmarkIcon />}
      sx={{
        "&:hover": {
          color: colors.purpleAccent[400],
        },
        "&.Mui-checked": {
          color: colors.purpleAccent[400],
        },
      }}
    />
  );
};

export default FavoriteButton;
