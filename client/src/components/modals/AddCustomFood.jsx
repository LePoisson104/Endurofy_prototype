import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";
import CloseIcon from "@mui/icons-material/Close";

const AddCustomFood = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = {
    datasets: [
      {
        data: [100, 0, 0],
        backgroundColor:
          0 && 0 && 0
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // Colors for Fat, Protein, Carbs
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Gray color when no data
        hoverBackgroundColor:
          0 && 0 && 0
            ? ["#D3D3D3", "#D3D3D3", "#D3D3D3"] // Colors for Fat, Protein, Carbs
            : ["#FFCC8A", "#68afac", "#66b7cd"], // Gray color when no data
      },
    ],
    totalCalories: 100,
  };
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
            (Brand Name) Food Name
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
              Protein: 0g
              <span style={{ color: "#68afac" }}>%</span>
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
              Carbs: 0g
              <span style={{ color: "#66b7cd" }}>%</span>
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
              Fat: 0g
              <span style={{ color: "#FFCC8A" }}>%</span>
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
            sx={{
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Food Brand - (optional)"
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
            type="number"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Carbs (g)"
            type="number"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            size="small"
            label="Fat (g)"
            type="number"
            sx={{ mb: 2 }}
          />
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
