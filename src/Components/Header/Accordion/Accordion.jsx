import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function SimpleAccordion({description}) {
  return (
    <div>
      <Accordion
      >
        <AccordionSummary
          expandIcon={<VisibilityIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Descripción</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{height:"auto"}}>
          <Typography>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}