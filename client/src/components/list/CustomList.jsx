import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";

const CustomList = ({ searchTerm }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const customFood = [{ food_brand: "Tyson", food_name: "Chicken Breast" }];
  const isLoading = false;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          borderBottom: `1px solid ${colors.grey[1200]}`,
          borderTop: `1px solid ${colors.grey[1200]}`,
          py: 1,
        }}
      >
        <IconButton
          sx={{
            textTransform: "none",
            color: "inherit",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <List
        sx={{
          maxHeight: "50vh", // Set a max height for the list
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {customFood?.length > 0 && !isLoading ? (
          customFood?.map((food, index) => (
            <ListItem button key={index}>
              {/* onClick={() => handleFoodSelect(index)} */}
              <ListItemText
                secondary={food.food_brand}
                primary={food.food_name}
              />
            </ListItem>
          ))
        ) : (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoading && (
              <CircularProgress
                sx={{
                  color: "inherit",
                }}
                size={25}
              />
            )}
            {!isLoading && <Typography>No Food Found</Typography>}
          </ListItem>
        )}
      </List>
    </>
  );
};

export default CustomList;
