import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useGetFavoriteFoodQuery } from "../../features/food/foodApiSlice";
import useAuth from "../../hooks/useAuth";

const FavoriteList = ({ searchTerm }) => {
  const { userId } = useAuth();
  const { data: favoriteFood, isLoading } = useGetFavoriteFoodQuery({ userId });

  const testData = [
    { food_name: "apple", food_brand: "Envy" },
    { food_name: "chicken breast", food_brand: "Tyson" },
    { food_name: "milk", food_brand: "Fairlife" },
  ];
  // Filter the favoriteFood array based on searchTerm
  const filteredFood = testData?.filter(
    (food) =>
      food.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.food_brand.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <List
        sx={{
          maxHeight: "50vh", // Set a max height for the list
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {filteredFood?.length > 0 && !isLoading ? (
          filteredFood.map((food, index) => (
            <ListItem button key={index}>
              <ListItemText
                secondary={food.food_brand}
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
    </>
  );
};

export default FavoriteList;
