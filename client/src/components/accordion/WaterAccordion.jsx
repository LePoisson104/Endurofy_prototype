import {
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddWaterModal from "../modals/AddWaterModal";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const WaterAccordion = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpenModal(true);
    setExpanded(true);
  };

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
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
              onClick={handleOpen}
              sx={{ color: theme.palette.mode == "dark" ? "white" : "black" }}
            >
              <AddIcon />
            </IconButton>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography> Water</Typography>
              <Typography>0 / 128 fl oz</Typography>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark" ? colors.primary[400] : "white",
          borderBottom: "1px solid black",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            bgcolor:
              theme.palette.mode == "light" ? "#f2f2f2" : colors.primary[500],
            p: 2,
            borderRadius: 2,
            mt: 1,
            gap: 1,
          }}
        >
          <IconButton sx={{ color: "#fbc02d", fontSize: "small" }}>
            <EditOutlinedIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography>Total Water - 0 / 128 fl oz</Typography>
              <Typography>0%</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "10px",
                bgcolor: "#708090",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  height: "10px",
                  bgcolor: "white",
                  borderRadius: 2,
                  width: "20%",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
      <AddWaterModal openModal={openModal} setOpenModal={setOpenModal} />
    </Accordion>
  );
};

export default WaterAccordion;
