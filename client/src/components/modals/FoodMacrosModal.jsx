import React, { useEffect, useState } from "react";
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
import { findFoodMacros } from "../../helper/findFoodMacros";
import { MACROS } from "../../helper/macrosConstants";
import { foodServingsHelper } from "../../helper/foodServingsHelper";

const FoodMacrosModal = ({ open, onClose, food }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [unit, setUnit] = useState("100g");
  const [serving, setServing] = useState(1);
  const [newFoodData, setNewFoodData] = useState("");

  console.log(newFoodData);

  let Kcal = 0;

  if (findFoodMacros(food, "Energy")?.unitName === "kJ") {
    const KILOCALORIES = 0.239006;
    Kcal = Math.round(findFoodMacros(food, "Energy")?.value * KILOCALORIES);
  } else {
    Kcal = findFoodMacros(food, "Energy")?.value;
  }

  const foodData = {
    calories: Kcal,
    protein: findFoodMacros(food, "Protein")?.value || 0,
    proteinUnit: findFoodMacros(food, "Protein")?.unitName.toLowerCase() || "g",
    carbs:
      findFoodMacros(food, "Carbohydrate, by difference", "Starch")?.value || 0,
    carbsUnit:
      findFoodMacros(
        food,
        "Carbohydrate, by difference",
        "Starch"
      )?.unitName.toLowerCase() || "g",
    fat: findFoodMacros(food, "Total lipid (fat)")?.value || 0,
    fatUnit:
      findFoodMacros(food, "Total lipid (fat)")?.unitName.toLowerCase() || "g",
  };

  if (
    foodData.calories === undefined &&
    foodData.protein !== undefined &&
    foodData.carbs !== undefined &&
    foodData.fat !== undefined
  ) {
    foodData.calories = Math.round(
      foodData.protein * MACROS.protein +
        foodData.carbs * MACROS.carbs +
        foodData.fat * MACROS.fat
    );
  }

  useEffect(() => {
    if (unit === "100g") {
      setNewFoodData(foodData);
    } else if (unit === "g") {
      setNewFoodData(foodServingsHelper({ serving, unit, foodData }));
    }
  }, [serving, unit]);

  const data = {
    datasets: [
      {
        data: [foodData.fat || 100, foodData.protein || 0, foodData.carbs || 0],
        backgroundColor:
          foodData.fat === 0 && foodData.protein === 0 && foodData.carbs === 0
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // Colors for Fat, Protein, Carbs
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Gray color when no data
        hoverBackgroundColor:
          foodData.fat === 0 && foodData.protein === 0 && foodData.carbs === 0
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // Colors for Fat, Protein, Carbs
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Gray color when no data
      },
    ],
    totalCalories: foodData.calories,
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
            {food?.brandName ? `(${food.brandName}) ` : ""} {food?.description}
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
          <NutrientDoughnutChart data={data} setAnimation={false} />
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
              Protein: {foodData.protein} {foodData.proteinUnit}
              <span style={{ color: "#68afac" }}>
                {" "}
                (
                {Math.round(
                  (foodData.protein /
                    (foodData.protein + foodData.carbs + foodData.fat)) *
                    100
                ) || 0}
                %)
              </span>
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
              Carbs: {foodData.carbs} {foodData.carbsUnit}
              <span style={{ color: "#66b7cd" }}>
                {" "}
                (
                {Math.round(
                  (foodData.carbs /
                    (foodData.protein + foodData.carbs + foodData.fat)) *
                    100
                ) || 0}
                %)
              </span>
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
              Fat: {foodData.fat} {foodData.fatUnit}
              <span style={{ color: "#FFCC8A" }}>
                {" "}
                (
                {Math.round(
                  (foodData.fat /
                    (foodData.protein + foodData.carbs + foodData.fat)) *
                    100
                ) || 0}
                %)
              </span>
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
            onChange={(e) => setServing(e.target.value)}
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
              onChange={(e) => setUnit(e.target.value)}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6d76fa", // Border color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6d76fa",
                },
              }}
            >
              <MenuItem value={"100g"}>100 g</MenuItem>
              <MenuItem value={"g"}>g</MenuItem>
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
