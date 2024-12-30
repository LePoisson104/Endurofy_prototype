import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useAuth from "../../hooks/useAuth";
import { useAddFavoriteFoodMutation } from "../../features/food/foodApiSlice";
import { useEffect, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert";
import {
  useGetIsFavoriteFoodQuery,
  useDeleteFavoriteFoodMutation,
} from "../../features/food/foodApiSlice";

const FavoriteButton = ({ food, favFood }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();

  const [isChecked, setIsChecked] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [addFavoriteFood] = useAddFavoriteFoodMutation();
  const [deleteFavoriteFood] = useDeleteFavoriteFoodMutation();

  // Trigger the query only when triggerSearch is true
  const { data: isFavorite, isLoading } = useGetIsFavoriteFoodQuery({
    userId,
    foodId: food?.fdcId,
  });

  useEffect(() => {
    if (!isLoading) {
      setIsChecked(isFavorite);
    }
  }, [isFavorite, isLoading]);

  const foodPayload = {
    foodId: food?.fdcId,
    foodName: food?.description,
    foodBrand: food?.brandName ? food?.brandName : "unknown",
  };

  const handleSubmit = async () => {
    setIsChecked((prev) => !prev);

    try {
      if (!isChecked) {
        await addFavoriteFood({ userId, foodPayload });
      } else {
        await deleteFavoriteFood({ userId, favFoodId: favFood?.fav_food_id });
      }
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        setErrMsg(err.data?.message);
      } else if (err.status === 404) {
        setErrMsg(err.data?.message);
      } else if (err.status === 409) {
        setErrMsg(err.data?.message);
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  return (
    <>
      {errMsg && (
        <ErrorAlert message={errMsg} duration={4000} setErrMsg={setErrMsg} />
      )}
      <Checkbox
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        checked={isChecked}
        onChange={handleSubmit}
        sx={{
          "&:hover": {
            color: colors.purpleAccent[400],
          },
          "&.Mui-checked": {
            color: colors.purpleAccent[400],
          },
        }}
      />
    </>
  );
};

export default FavoriteButton;
