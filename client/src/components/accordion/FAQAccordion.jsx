import React from "react";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RoundedAccordion = styled(Accordion)(() => ({
  borderRadius: "16px", // Increased border radius for a rounder look
  boxShadow: "none",
  width: "100%", // Full width
  maxWidth: "1000px", // Maximum width
  "&:before": {
    display: "none", // Removes the default bottom border/shadow
  },

  // Styling for the summary section
  "& .MuiAccordionSummary-root": {
    borderRadius: "16px 16px 0 0",
    minHeight: "60px", // Increased height for summary
  },

  // Styling for the details section
  "& .MuiAccordionDetails-root": {
    borderRadius: "0 0 16px 16px",
    backgroundColor: "#ffffff",
    padding: "16px",
  },
}));

const FAQAccordion = ({ question, answer }) => {
  return (
    <RoundedAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {question}
      </AccordionSummary>
      <AccordionDetails>
        <div dangerouslySetInnerHTML={{ __html: answer }} />
      </AccordionDetails>
    </RoundedAccordion>
  );
};

export default FAQAccordion;
