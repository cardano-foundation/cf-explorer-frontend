import {
  Box,
  Typography,
  styled,
  Accordion,
  AccordionSummary as AccordionSummaryMUI,
  Slider,
  AccordionDetails
} from "@mui/material";

export const HashName = styled(Typography)(({ theme }) => ({
  paddingBottom: "15px",
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "28px",
  textAlign: "center",
  paddingLeft: "20px",
  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
  [theme.breakpoints.down("lg")]: {
    fontSize: "24px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px"
  }
}));

export const AccordionContainer = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  width: "100%",
  margin: 0,
  backgroundColor: theme.palette.secondary[0]
}));

export const AccordionSummary = styled(AccordionSummaryMUI)(() => ({
  padding: "0 16px !important",
  textAlign: "left",
  height: "40px !important",
  minHeight: "40px !important"
}));
export const StyledSlider = styled(Slider)`
  & .MuiSlider-track {
    height: 10px;
  }

  & .MuiSlider-rail {
    height: 10px;
  }

  & .MuiSlider-valueLabel,
  .MuiSlider-valueLabelLabe,
  .MuiSlider-valueLabelOpen {
    transform: translateY(160%) scale(1) !important;
    background: ${(props) => props.theme.palette.secondary[600]} !important;
    padding: 6px 8px;
    font-weight: 400;
    bottom: 4px;
    &::before {
      top: -8px !important;
    }
  }

  & .MuiSlider-thumb {
    width: 18px !important;
    height: 18px !important;
  }
`;
export const AccordionDetailsFilter = styled(AccordionDetails)(({ theme }) => ({
  padding: `0 18px !important`,
  backgroundColor: theme.palette.primary[100],
  borderRadius: theme.spacing(1),
  color: theme.palette.secondary.light
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
  width: 300,
  backgroundColor: theme.palette.secondary[0],
  zIndex: 15,
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  borderRadius: theme.spacing(1),
  boxShadow: "rgba(189, 197, 209, 0.2) 0px 0.5rem 1.2rem",
  [theme.breakpoints.down("sm")]: {
    width: 250,
    right: 0,
    "& p": {
      fontSize: "13px"
    },
    "& .MuiAccordionSummary-content > div": {
      fontSize: "13px"
    }
  },

  "& .Mui-expanded": {
    margin: "0 !important"
  },

  "& .MuiAccordionSummary-gutters": {
    height: "48px !important",
    minHeight: "48px !important"
  },

  "& .MuiAccordion-root::before": {
    position: "unset !important"
  },

  ":hover": {
    backgroundColor: theme.palette.secondary[0]
  },

  ":after": {
    content: "''",
    display: "block",
    background: theme.palette.secondary[0],
    zIndex: -1,
    position: "absolute",
    top: "-6px",
    right: "36px",
    width: "14px",
    height: "16px",
    transform: "rotate(45deg)"
  }
}));
