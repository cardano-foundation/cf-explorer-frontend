import { styled, Box, Button, Accordion, AccordionSummary as AccordionSummaryMUI, alpha } from "@mui/material";

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const FilterContainer = styled(Box)(({ theme }) => ({
  width: 300,
  backgroundColor: theme.palette.secondary[0],
  zIndex: 15,
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  borderRadius: theme.spacing(1),
  boxShadow: "rgba(189, 197, 209, 0.2) 0px 0.5rem 1.2rem",
  [theme.breakpoints.down("md")]: {
    left: "0"
  },
  ":hover": {
    backgroundColor: theme.palette.secondary[0]
  },
  ":after": {
    content: "''",
    display: "block",
    background: theme.palette.secondary[0],
    zIndex: 9,
    position: "absolute",
    top: "-6px",
    right: "32px",
    width: "14px",
    height: "16px",
    transform: "rotate(45deg)",
    [theme.breakpoints.down("md")]: {
      right: "0",
      left: "32px"
    }
  }
}));

export const ButtonFilter = styled(Button)(({ theme }) => ({
  display: "inline-block",
  textTransform: "capitalize",
  textAlign: "left",
  color: theme.palette.common.black,
  height: 40,
  pading: "12px 0"
}));

export const AccordionContainer = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  width: "100%",
  backgroundColor: theme.palette.secondary[0]
}));
export const AccordionSummary = styled(AccordionSummaryMUI)(() => ({
  padding: "0 8px !important",
  textAlign: "left"
}));

export const ApplyFilterButton = styled(Button)(({ theme }) => ({
  width: "100%",
  textTransform: "capitalize",
  fontWeight: "bold",
  color: theme.palette.secondary[0],
  background: theme.palette.secondary.main,
  ":hover": {
    background: alpha(theme.palette.secondary.main, 0.8)
  },
  ":disabled": {
    color: theme.palette.common.white,
    background: alpha(theme.palette.secondary.main, 0.3)
  }
}));

export const UpdatableParameters = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  ".title": {
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "left",
    [`@media screen and (max-width: ${theme.breakpoints.values.sm}px)`]: {
      width: "50%"
    }
  }
}));

export const ColumnProtocol = styled(Box)<{ isLink: number; to: string }>(({ isLink, theme }) => ({
  padding: "24px 20px",
  maxWidth: 200,
  overflow: "hidden",
  whiteSpace: "nowrap",
  minHeight: "16px",
  textOverflow: "ellipsis",
  display: "block",
  background: isLink ? theme.palette.success[100] : "transparent",
  color: isLink ? `${theme.palette.success[800]} !important` : `${theme.palette.secondary.light} !important`,
  fontWeight: isLink ? "bold" : "normal"
}));

export const StyledDropdownItem = styled("label")`
  color: ${({ theme }) => theme.palette.secondary.main};
`;
