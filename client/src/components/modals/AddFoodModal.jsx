import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import FoodMacrosModal from "./FoodMacrosModal";
import { tokens } from "../../theme";
import { useSearchFoodQuery } from "../../features/food/foodApiSlice";
import ToggleButtons from "../buttons/ToggleButtons";
import CustomList from "../list/CustomList";
import FavoriteList from "../list/FavoriteList";

const AddFoodModal = ({ open, onClose, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [alignment, setAlignment] = useState("All");

  const { data, isLoading } = useSearchFoodQuery({ searchTerm });

  useEffect(() => {
    setFoodData(data?.foods);
  }, [data]);

  const handleFoodSelect = (index) => {
    if (foodData) {
      setSelectedFood(foodData[index]);
    }
    setMacrosModalOpen(true); // Open the macros modal
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: { xs: "90%", sm: "50%", md: "30%" },
            margin: "auto",
            mt: 5,
            p: 3,
            bgcolor: colors.primary[400],
            borderRadius: "8px",
            boxShadow: 24,
            position: "relative",
            width: 600,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              Add Food
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Search Food"
            variant="outlined"
            fullWidth
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "grey",
                },
                "&:hover fieldset": {
                  borderColor: "#6d76fa",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6d76fa",
                },
              },
              "& .MuiInputLabel-root": {
                color: "grey", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#6d76fa", // Label color when focused
              },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ToggleButtons
            alignment={alignment}
            setAlignment={setAlignment}
            setSearchTerm={setSearchTerm}
          />
          {alignment === "All" && (
            <List
              sx={{
                height: "50vh", // Set a max height for the list
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              {foodData?.length > 0 ? (
                foodData?.map((food, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleFoodSelect(index)}
                  >
                    <ListItemText
                      secondary={food.brandName}
                      primary={food.description}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem
                  sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                >
                  {!isLoading && <Typography>No Food Found</Typography>}
                  {isLoading && (
                    <CircularProgress sx={{ color: "inherit" }} size={25} />
                  )}
                </ListItem>
              )}
            </List>
          )}
          {alignment === "Favorites" && (
            <FavoriteList searchTerm={searchTerm} title={title} />
          )}
          {alignment === "Custom" && (
            <CustomList searchTerm={searchTerm} title={title} />
          )}
        </Box>
      </Modal>

      {/* Food Macros Modal */}
      <FoodMacrosModal
        open={macrosModalOpen}
        onClose={() => setMacrosModalOpen(false)}
        food={selectedFood}
        title={title}
      />
    </>
  );
};

export default AddFoodModal;
