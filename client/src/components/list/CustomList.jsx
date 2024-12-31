import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import AddCustomFood from "../modals/AddCustomFood";
import { useState } from "react";

const CustomList = ({ searchTerm, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const customFood = [{ food_brand: "Tyson", food_name: "Chicken Breast" }];
  const isLoading = false;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          py: 1,
        }}
      >
        <Button
          endIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{
            color: "inherit",
            textTransform: "none",
            bgcolor:
              theme.palette.mode === "dark"
                ? colors.primary[300]
                : colors.primary[900],
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? colors.primary[200]
                  : colors.primary[800],
            },
          }}
        >
          Add Food
        </Button>
      </Box>
      <List
        sx={{
          height: "45vh", // Set a max height for the list
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
      <AddCustomFood
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      />
    </>
  );
};

export default CustomList;
