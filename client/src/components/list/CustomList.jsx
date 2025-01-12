import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddCustomFood from "../modals/AddCustomFood";
import { useState } from "react";
import { useGetCustomFoodQuery } from "../../features/food/foodApiSlice";
import useAuth from "../../hooks/useAuth";
import FoodMacrosModal from "../modals/FoodMacrosModal";

const CustomList = ({ searchTerm, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState(null);
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState({});

  const { data: customFood, isLoading } = useGetCustomFoodQuery({ userId });

  const filteredFood = customFood?.filter(
    (food) =>
      food.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.food_brand.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFoodSelect = (index) => {
    setMacrosModalOpen(true);
    setSelectedFood(customFood?.[index]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          py: 1,
          gap: 1,
        }}
      >
        <Button
          endIcon={<AddIcon />}
          onClick={() => {
            setOpenModal(true);
            setType("add");
          }}
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
        {filteredFood?.length > 0 && !isLoading ? (
          filteredFood?.map((food, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleFoodSelect(index)}
            >
              {/* onClick={() => handleFoodSelect(index)} */}
              <ListItemText
                secondary={food.food_brand}
                primary={food.food_name}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setType("edit");
                  setOpenModal(true);
                  setSelectedFood(food);
                }}
              >
                <EditNoteIcon />
              </IconButton>
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
        type={type}
        food={selectedFood}
      />
      <FoodMacrosModal
        open={macrosModalOpen}
        onClose={() => setMacrosModalOpen(false)}
        food={selectedFood}
        title={title}
        type={"custom"}
        mode={"custom"}
      />
    </>
  );
};

export default CustomList;
