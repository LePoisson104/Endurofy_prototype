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
import { useAddFoodMutation } from "../../features/food/foodApiSlice";
import useAuth from "../../hooks/useAuth";

const FoodMacrosModal = ({ open, onClose, food }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();

  const [unit, setUnit] = useState("");
  const [serving, setServing] = useState(1);
  const [foodData, setFoodData] = useState({});
  const [addFood] = useAddFoodMutation();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA") // Formats as "YYYY-MM-DD"
  );

  useEffect(() => {
    setUnit(food?.servingSizeUnit ? `100${food?.servingSizeUnit}` : "100g");
    setServing(1);
  }, [food]);

  let Kcal = 0;

  if (findFoodMacros(food, "Energy")?.unitName === "kJ") {
    const KILOCALORIES = 0.239006;
    Kcal = Math.round(findFoodMacros(food, "Energy")?.value * KILOCALORIES);
  } else {
    Kcal = findFoodMacros(food, "Energy")?.value;
  }

  const initialFoodData = {
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
    initialFoodData.calories === undefined &&
    initialFoodData.protein !== undefined &&
    initialFoodData.carbs !== undefined &&
    initialFoodData.fat !== undefined
  ) {
    initialFoodData.calories = Math.round(
      initialFoodData.protein * MACROS.protein +
        initialFoodData.carbs * MACROS.carbs +
        initialFoodData.fat * MACROS.fat
    );
  }

  // Set foodData based on unit and serving
  useEffect(() => {
    if (food) {
      // Ensure food is loaded before calculating foodData
      if (unit === "g" || unit === "oz") {
        setFoodData(
          foodServingsHelper({ serving, unit, foodData: initialFoodData })
        );
      } else if (unit !== "g" && "oz") {
        setFoodData(
          foodServingsHelper({ serving, unit, foodData: initialFoodData })
        );
      }
    }
  }, [food, unit, serving]);

  const data = {
    datasets: [
      {
        data: [
          foodData?.fat || 100,
          foodData?.protein || 0,
          foodData?.carbs || 0,
        ],
        backgroundColor:
          foodData?.fat === 0 &&
          foodData?.protein === 0 &&
          foodData?.carbs === 0
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // Colors for Fat, Protein, Carbs
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Gray color when no data
        hoverBackgroundColor:
          foodData?.fat === 0 &&
          foodData?.protein === 0 &&
          foodData?.carbs === 0
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // Colors for Fat, Protein, Carbs
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Gray color when no data
      },
    ],
    totalCalories: Math.round(foodData.calories),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodPayload = {
      foodName: food.description,
      servingSize: serving,
      servingUnit: unit,
      calories: initialFoodData.calories,
      protein: initialFoodData.protein,
      carbs: initialFoodData.carbs,
      fat: initialFoodData.fat,
      mealType: "breakfast",
    };

    try {
      const data = await addFood({ userId, currentDate, foodPayload }).unwrap();
      console.log(data);
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        setErrMsg(err.data?.message);
      } else if (err.status === 404) {
        setErrMsg(err.data?.message);
      } else if (err.status === 409) {
        setErrMsg(err.data?.message);
      } else {
        setErrMsg(err.data?.message);
      }
    }
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
              Protein: {foodData?.protein?.toFixed(2)} {foodData.proteinUnit}
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
              Carbs: {foodData?.carbs?.toFixed(2)} {foodData.carbsUnit}
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
              Fat: {foodData?.fat?.toFixed(2)} {foodData.fatUnit}
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
            inputProps={{ max: 1000, min: 0 }}
            type="number"
            onChange={(e) => {
              let value = parseInt(e.target.value);

              if (value < 0) {
                value = 0;
              } else if (value > 1000) {
                value = 1000;
              } else if (isNaN(value)) {
                value = 0;
              }

              setServing(value);
            }}
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
              "& input[type=number]": {
                MozAppearance: "textfield", // Firefox
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none", // Chrome, Safari, Edge, Opera
                  margin: 0,
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
              <MenuItem
                value={
                  food?.servingSizeUnit ? `100${food?.servingSizeUnit}` : "100g"
                }
              >
                {food?.servingSizeUnit ? `100${food?.servingSizeUnit}` : "100g"}
              </MenuItem>
              <MenuItem value={"g"}>g</MenuItem>
              <MenuItem value={"oz"}>oz</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            type="submit"
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
