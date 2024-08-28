import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddFoodModal from "./modals/AddFoodModal";
import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";

const AccordionUsage = ({ title, data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  let kcal = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  if (data) {
    kcal = data.reduce((acc, item) => acc + item.kcal, 0);
    protein = data.reduce((acc, item) => acc + item.protein, 0);
    carbs = data.reduce((acc, item) => acc + item.carbs, 0);
    fat = data.reduce((acc, item) => acc + item.fat, 0);
  }

  // AccordionItem is conditionally rendered if 'data' is present
  const AccordionItem = () => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <AccordionDetails
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#e9e9e9",
            color: "black",
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
            <IconButton
              size="small"
              sx={{ color: "black", "&:hover": { background: "#d8d8d8" } }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "black", "&:hover": { background: "#d8d8d8" } }}
            >
              <EditNoteIcon />
            </IconButton>
            <Typography>{item.name}</Typography>
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
            <Typography>{item.amount} g</Typography>
            <Typography>{item.kcal} kcal</Typography>
          </Box>
        </AccordionDetails>
      ));
    }
    return null;
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          color: "white",
          backgroundColor: "#6d76fa",
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
            <IconButton size="small" onClick={handleOpenModal}>
              <AddIcon />
            </IconButton>
            <AddFoodModal open={modalOpen} onClose={handleCloseModal} />
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
            {kcal == 0
              ? false
              : true && (
                  <>
                    <Typography fontWeight="bold">{`${kcal} g kcal |`}</Typography>
                    <Typography fontWeight="bold">{`${protein} g protein |`}</Typography>
                    <Typography fontWeight="bold">{`${carbs} g carbs |`}</Typography>
                    <Typography fontWeight="bold">{`${fat} g fat `}</Typography>
                  </>
                )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionItem />
    </Accordion>
  );
};

export default AccordionUsage;
