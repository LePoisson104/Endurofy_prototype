import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";

const AccordionUsage = () => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#6d76fa",
          }}
        >
          Uncategorized
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", color: "black" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#6d76fa",
          }}
        >
          Breakfast
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", color: "black" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#6d76fa",
          }}
        >
          Lunch
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", color: "black" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#6d76fa",
          }}
        >
          Dinner
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", color: "black" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#6d76fa",
          }}
        >
          Snacks
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", color: "black" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccordionUsage;
