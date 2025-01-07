import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useGetFavoriteFoodQuery } from "../../features/food/foodApiSlice";
import useAuth from "../../hooks/useAuth";
import FoodMacrosModal from "../modals/FoodMacrosModal";
import { useEffect, useState } from "react";
import { useSearchFoodQuery } from "../../features/food/foodApiSlice";

const FavoriteList = ({ searchTerm, title }) => {
  const { userId } = useAuth();

  const { data: favoriteFood, isLoading } = useGetFavoriteFoodQuery({ userId });

  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");
  const [foodId, setFoodId] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  // Trigger the query only when triggerSearch is true
  const { data: foodData, isLoading: isSearchFoodLoading } = useSearchFoodQuery(
    { searchTerm: foodId },
    { skip: !triggerSearch } // Skip the query if triggerSearch is false
  );

  // console.log("favoriteFood: ", favoriteFood);

  const handleFoodSelect = (index) => {
    if (favoriteFood) {
      setFoodId(favoriteFood[index].food_id); // Set the foodId
      setTriggerSearch(true); // Trigger the query
    }
  };

  // Use an effect to process the foodData once it's fetched
  useEffect(() => {
    if (!isSearchFoodLoading && foodData && triggerSearch && foodId) {
      setSelectedFood(foodData?.foods?.[0]);
      setTriggerSearch(false); // Reset triggerSearch to avoid re-fetching
      setMacrosModalOpen(true); // Open the macros modal
    }
  }, [isSearchFoodLoading, foodData, triggerSearch, foodId]);

  // Filter the favoriteFood array based on searchTerm
  const filteredFood = favoriteFood?.filter(
    (food) =>
      food.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.food_brand.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
            >
              <ListItemText
                secondary={food.food_brand === "unknown" ? "" : food.food_brand}
                primary={food.food_name}
              />
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {isLoading ? (
              <CircularProgress
                sx={{
                  color: "inherit",
                }}
                size={25}
              />
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
        title={title}
      />
    </>
  );
};

export default FavoriteList;
