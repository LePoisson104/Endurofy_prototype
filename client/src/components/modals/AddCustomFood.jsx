import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const AddCustomFood = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [unit, setUnit] = useState("g");
  const [amount, setAmount] = useState(0);
  const [foodName, setFoodName] = useState("");
  const [foodBrand, setFoodBrand] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [data, setData] = useState({});

  // Reset states when modal closes
  useEffect(() => {
    if (!open) {
      setUnit("g");
      setAmount(0);
      setFoodName("");
      setFoodBrand("");
      setCalories(0);
      setProtein(0);
      setCarbs(0);
      setFat(0);
      setData({
        datasets: [
          {
            data: [100, 0, 0],
            backgroundColor: ["#D3D3D3", "#D3D3D3", "#D3D3D3"],
            hoverBackgroundColor: ["#D3D3D3", "#D3D3D3", "#D3D3D3"],
          },
        ],
        totalCalories: 0,
      });
    } else if (open) {
      setData({
        datasets: [
          {
            data: [100, 0, 0],
            backgroundColor: ["#D3D3D3", "#D3D3D3", "#D3D3D3"],
            hoverBackgroundColor: ["#D3D3D3", "#D3D3D3", "#D3D3D3"],
          },
        ],
        totalCalories: 0,
      });
    }
  }, [open]);

  useEffect(() => {
    const isDataEmpty =
      (fat === 0 || fat === "") &&
      (protein === 0 || protein === "") &&
      (carbs === 0 || carbs === "");

    setData({
      datasets: [
        {
          data: isDataEmpty
            ? [100, 0, 0] // Single gray circle
            : [fat || 0, protein || 0, carbs || 0],
          backgroundColor: isDataEmpty
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // All gray
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Colors for Fat, Protein, Carbs
          hoverBackgroundColor: isDataEmpty
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // All gray on hover
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Colors for Fat, Protein, Carbs
        },
      ],
      totalCalories: calories || 0,
    });
  }, [calories, protein, carbs, fat]);

  let proteinPercent;
  let carbsPercent;
  let fatPercent;

  if (protein || carbs || fat) {
    const newProtein = Number(protein ? protein : 0);
    const newCarbs = Number(carbs ? carbs : 0);
    const newFat = Number(fat ? fat : 0);

    proteinPercent = Math.round(
      (newProtein / (newProtein + newCarbs + newFat)) * 100
    );
    carbsPercent = Math.round(
      (newCarbs / (newProtein + newCarbs + newFat)) * 100
    );
    fatPercent = Math.round((newFat / (newProtein + newCarbs + newFat)) * 100);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "550px",
          margin: "auto",
          mt: 20,
          pt: 2,
          px: 3,
          pb: 3,
          bgcolor: colors.primary[400],
          borderRadius: "8px",
          boxShadow: 24,
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
            Add Custom Food
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color={"textSecondary"} fontWeight={600}>
            {foodBrand ? `(${foodBrand})` : `(Food Brand)`}{" "}
            {foodName ? foodName : `Food Name`}
          </Typography>
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
              Protein: {protein ? protein : 0} g
              <span style={{ color: "#68afac" }}>
                {" "}
                ({proteinPercent ? proteinPercent : 0} %)
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
              Carbs: {carbs ? carbs : 0} g
              <span style={{ color: "#66b7cd" }}>
                {" "}
                ({carbsPercent ? carbsPercent : 0} %)
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
              Fat: {fat ? fat : 0} g
              <span style={{ color: "#FFCC8A" }}>
                {" "}
                ({fatPercent ? fatPercent : 0} %)
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
            justifyContent: "space-between",
            gap: 2,
            ...textFieldStyles,
          }}
        >
          <TextField
            fullWidth
            label="Food Name"
            size="small"
            onChange={(e) => setFoodName(e.target.value)}
            sx={{
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Food Brand - (optional)"
            onChange={(e) => setFoodBrand(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            ...textFieldStyles,
          }}
        >
          <TextField
            fullWidth
            label="Calories (Kcal)"
            onChange={(e) => setCalories(e.target.value)}
            size="small"
            type="number"
            sx={{
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Protein (g)"
            onChange={(e) => setProtein(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Carbs (g)"
            onChange={(e) => setCarbs(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            size="small"
            label="Fat (g)"
            onChange={(e) => setFat(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography>1 serving:</Typography>
          <TextField
            size="small"
            label="amount (e.g. 100g)"
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{ ...textFieldStyles, width: 150 }}
          />
          <FormControl
            sx={{
              width: 100,
            }}
          >
            <InputLabel
              id="serving-unit-label"
              sx={{
                "&.Mui-focused": {
                  color: "#6d76fa",
                },
              }}
            >
              Unit
            </InputLabel>
            <Select
              labelId="serving-unit-label"
              id="serving-unit-select"
              value={unit}
              label="Unit"
              onChange={(e) => setUnit(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: colors.primary[400],
                  },
                },
              }}
              sx={{
                width: 100,
                height: 37,
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
              <MenuItem value={"ml"}>ml</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="end" mt={3} gap={1}>
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              color: colors.purpleAccent[400],
              bgcolor: "transparent",
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "white",
              bgcolor: colors.purpleAccent[400],
              "&:hover": { bgcolor: colors.purpleAccent[300] },
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCustomFood;
