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
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import FoodMacrosModal from "./FoodMacrosModal";
import { tokens } from "../../theme";

// Mock food data
const mockFoodData = [
  "Apple",
  "Banana",
  "Chicken Breast",
  "Rice",
  "Broccoli",
  "Almonds",
  "Salmon",
  "Quinoa",
  // Add more food items here
];

const AddFoodModal = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [macrosModalOpen, setMacrosModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setMacrosModalOpen(true); // Open the macros modal
  };

  const filteredFoodData = mockFoodData.filter((food) =>
    food.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              mb: 2,
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
            onChange={handleSearchChange}
          />
          {/* buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                color: theme.palette.mode === "dark" ? "white" : "black",
                width: "150px",
                borderRadius: 0,
                fontWeight: "bold",
                "&:hover": {
                  borderBottom: `1px solid ${
                    theme.palette.mode === "dark" ? "white" : "black"
                  } `,
                },
              }}
            >
              All
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color: theme.palette.mode === "dark" ? "white" : "black",
                width: "150px",
                borderRadius: 0,
                fontWeight: "bold",
                "&:hover": {
                  borderBottom: `1px solid ${
                    theme.palette.mode === "dark" ? "white" : "black"
                  } `,
                },
              }}
            >
              Favorites
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color: theme.palette.mode === "dark" ? "white" : "black",
                width: "150px",
                borderRadius: 0,
                fontWeight: "bold",
                "&:hover": {
                  borderBottom: `1px solid ${
                    theme.palette.mode === "dark" ? "white" : "black"
                  } `,
                },
              }}
            >
              Custom
            </Button>
          </Box>
          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 1 }}></Box>
          <List>
            {filteredFoodData.length > 0 ? (
              filteredFoodData.map((food) => (
                <ListItem
                  button
                  key={food}
                  onClick={() => handleFoodSelect(food)}
                >
                  <ListItemText primary={food} />
                </ListItem>
              ))
            ) : (
              <Typography>No matching food items</Typography>
            )}
          </List>
        </Box>
      </Modal>

      {/* Food Macros Modal */}
      <FoodMacrosModal
        open={macrosModalOpen}
        onClose={() => setMacrosModalOpen(false)}
        food={selectedFood}
      />
    </>
  );
};

export default AddFoodModal;
