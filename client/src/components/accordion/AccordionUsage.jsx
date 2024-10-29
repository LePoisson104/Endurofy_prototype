import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddFoodModal from "../modals/AddFoodModal";
import FoodMacrosModal from "../modals/FoodMacrosModal";
import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";

const AccordionUsage = ({ title, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [foodModal, setFoodModal] = useState(false);

  const handleOpenModal = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the AccordionSummary
    setModalOpen(true);
    setExpanded(true); // Always expand the accordion when opening the modal
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const handleEditModal = (event) => {
    event.stopPropagation();
    setFoodModal(true);
  };

  const handleCloseEditModal = () => setFoodModal(false);

  let kcal = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  if (data) {
    kcal = data.reduce((acc, item) => acc + item.calories, 0);
    protein = data.reduce((acc, item) => acc + item.protein, 0);
    carbs = data.reduce((acc, item) => acc + item.carbs, 0);
    fat = data.reduce((acc, item) => acc + item.fat, 0);
  }

  const AccordionItem = () => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <AccordionDetails
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[400] : "white",
            borderBottom: "1px solid black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton size="small" sx={{ color: "#F56565" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "#fbc02d" }}
              onClick={handleEditModal}
            >
              <EditNoteIcon />
            </IconButton>
            <Typography>{item.food_name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "20%",
              paddingRight: 5,
            }}
          >
            <Typography>
              {item.serving_size} {item.serving_unit}
            </Typography>
            <Typography>{item.calories} kcal</Typography>
          </Box>
        </AccordionDetails>
      ));
    }
    return null;
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          color: theme.palette.mode == "dark" ? "white" : "black",
          backgroundColor:
            theme.palette.mode === "dark" ? "#23395d" : colors.grey[1000],
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={handleOpenModal}
              sx={{ color: theme.palette.mode == "dark" ? "white" : "black" }}
            >
              <AddIcon />
            </IconButton>
            <Typography fontWeight="bold">{title}</Typography>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 1,
              justifyContent: "end",
              paddingRight: 2,
            }}
          >
            {kcal > 0 && (
              <>
                <Typography fontWeight="bold">{`${kcal} kcal |`}</Typography>
                <Typography fontWeight="bold">{`${protein.toFixed(
                  1
                )}g protein | `}</Typography>
                <Typography fontWeight="bold">{`${carbs.toFixed(
                  1
                )}g carbs | `}</Typography>
                <Typography fontWeight="bold">{`${fat.toFixed(
                  1
                )}g fat`}</Typography>
              </>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionItem />
      <AddFoodModal open={modalOpen} onClose={handleCloseModal} />
      <FoodMacrosModal open={foodModal} onClose={handleCloseEditModal} />
    </Accordion>
  );
};

export default AccordionUsage;
