import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
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
import { tokens } from "../../theme";

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
  const colors = tokens(theme.palette.mode);
  const macros = foodMacros[food] || {};

  const [unit, setUnit] = useState("");

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
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {food}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Horizontal line */}
        <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <NutrientDoughnutChart data={data} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#68afac",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Protein: {macros.protein} g
              <span style={{ color: "#68afac" }}> (74%)</span>
            </Typography>
            <Typography variant="h5">
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#66b7cd",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Carbs: {macros.carbs} g
              <span style={{ color: "#66b7cd" }}> (12%)</span>
            </Typography>
            <Typography variant="h5">
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#FFCC8A",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Fat: {macros.fat} g
              <span style={{ color: "#FFCC8A" }}> (14%)</span>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{ width: "100%", borderTop: "1px solid #888", mb: 3, mt: 3 }}
        ></Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "center ",
            mt: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ display: "flex", alignItems: "center", mr: 2 }}
          >
            Serving size:
          </Typography>
          <TextField
            defaultValue={1}
            sx={{
              width: "70px",
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
            }}
          />
          <FormControl sx={{ width: "150px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                "&.Mui-focused": {
                  color: "#6d76fa",
                },
              }}
            >
              Unit
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Unit"
              onChange={handleChange}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6d76fa", // Border color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6d76fa",
                },
              }}
            >
              <MenuItem value={"g"}>g</MenuItem>
              <MenuItem value={"oz"}>oz</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            sx={{
              width: "100px",
              textTransform: "none",
              color: "white",
              backgroundColor: "#6d76fa",
              "&:hover": {
                backgroundColor: "#868dfb",
              },
            }}
          >
            Add Food
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FoodMacrosModal;
