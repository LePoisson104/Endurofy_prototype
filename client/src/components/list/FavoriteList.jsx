import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import {
  useGetFavoriteFoodQuery,
  useSearchFoodQuery,
  useGetCustomFoodByIdQuery,
} from "../../features/food/foodApiSlice";
import useAuth from "../../hooks/useAuth";
import FoodMacrosModal from "../modals/FoodMacrosModal";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const FavoriteList = ({ searchTerm, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { userId } = useAuth();
  const { data: favoriteFood, isLoading } = useGetFavoriteFoodQuery({ userId });

  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodId, setFoodId] = useState(null);
  const [foodCategory, setFoodCategory] = useState(null);

  const { data: foodData, isLoading: isSearchFoodLoading } = useSearchFoodQuery(
    { searchTerm: foodId },
    { skip: !foodId } // Only trigger query when foodId is set
  );

  const { data: customFoodData, isLoading: isGetCustomFoodByIdLoading } =
    useGetCustomFoodByIdQuery(
      { foodId },
      { skip: !foodId } // Only trigger query when foodId is set
    );

  const handleFoodSelect = (index) => {
    if (favoriteFood) {
      const selectedFoodId = favoriteFood[index]?.food_id;
      setFoodId(selectedFoodId);
    }
  };

  useEffect(() => {
    if (!isSearchFoodLoading && !isGetCustomFoodByIdLoading && foodId) {
      if (foodData?.foods?.length) {
        setSelectedFood(foodData.foods[0]);
        setFoodCategory(null);
      } else if (customFoodData?.length) {
        setFoodCategory("custom");
        setSelectedFood(customFoodData[0]);
      }
      setMacrosModalOpen(true);
      setFoodId(null); // Reset foodId to avoid re-fetching
    }
  }, [
    isSearchFoodLoading,
    isGetCustomFoodByIdLoading,
    foodData,
    customFoodData,
    foodId,
  ]);

  const filteredFood = favoriteFood?.filter(
    (food) =>
      food.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.food_brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          border: `.5px solid ${colors.grey[1200]}`,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Description
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          Source
        </Typography>
      </Box>

      <List
        sx={{
          height: "50vh", // Set a max height for the list
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {filteredFood?.length > 0 && !isLoading ? (
          filteredFood.map((food, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleFoodSelect(index)}
              sx={{ display: "flex", gap: 2 }}
            >
              <ListItemText
                secondary={food.food_brand === "unknown" ? "" : food.food_brand}
                primary={food.food_name}
              />
              <ListItemText
                primary={food?.food_id?.includes("-") ? "custom" : "FDC"}
                sx={{ display: "flex", justifyContent: "end" }}
              />
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {isLoading ? (
              <CircularProgress size={25} />
            ) : (
              <Typography>No Food Found</Typography>
            )}
          </ListItem>
        )}
      </List>
      <FoodMacrosModal
        open={macrosModalOpen}
        onClose={() => setMacrosModalOpen(false)}
        food={selectedFood}
        type={foodCategory}
        title={title}
      />
    </>
  );
};

export default FavoriteList;
