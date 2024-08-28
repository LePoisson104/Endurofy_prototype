import React, { useState } from "react";
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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";

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

const data = {
  datasets: [
    {
      data: [20, 50, 30], // Example values, adjust as needed
      backgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"], // Fat, Protein, Carbs
      hoverBackgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"],
    },
  ],
  totalCalories: 500,
};

const FoodMacrosModal = ({ open, onClose, food }) => {
  const theme = useTheme();

  // Mock data for food macros
  const foodMacros = {
    Apple: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    Banana: { calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    "Chicken Breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    Rice: { calories: 206, protein: 4.3, carbs: 45, fat: 0.4 },
    Broccoli: { calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    Almonds: { calories: 579, protein: 21, carbs: 22, fat: 49 },
    Salmon: { calories: 206, protein: 22, carbs: 0, fat: 13 },
    Quinoa: { calories: 222, protein: 8.1, carbs: 39, fat: 3.6 },
  };

  const macros = foodMacros[food] || {};

  const [unit, setUnit] = React.useState("");

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "90%", sm: "50%", md: "30%" },
          margin: "auto",
          mt: 20,
          p: 3,
          bgcolor: theme.palette.background.paper,
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
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {food}
          </Typography>

          <IconButton variant="contained" color="primary" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Horizontal line */}
        <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NutrientDoughnutChart title={"Macros"} data={data} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">
              <span style={{ color: "#68afac" }}>Protein: </span>
              {macros.protein} g<span style={{ color: "#68afac" }}> (74%)</span>
            </Typography>
            <Typography variant="h5">
              <span style={{ color: "#66b7cd" }}>Carbs: </span> {macros.carbs} g
              <span style={{ color: "#66b7cd" }}> (12%)</span>
            </Typography>
            <Typography variant="h5">
              <span style={{ color: "#FFCC8A" }}>Fat: </span> {macros.fat} g
              <span style={{ color: "#FFCC8A" }}> (14%)</span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField defaultValue={1} sx={{ width: "70px" }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Unit"
              onChange={handleChange}
            >
              <MenuItem value={"g"}>g</MenuItem>
              <MenuItem value={"oz"}>oz</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};

const AddFoodModal = ({ open, onClose }) => {
  const theme = useTheme();
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
            bgcolor: theme.palette.background.paper,
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
            sx={{ mb: 2 }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
