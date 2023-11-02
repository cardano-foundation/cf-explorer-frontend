import { Accordion, styled, Box } from "@mui/material";

export const StyledAccordion = styled(Accordion)<{
  expanded: boolean;
  customBorderRadius: string;
  isDisplayBorderTop: boolean;
}>(({ expanded, customBorderRadius, isDisplayBorderTop, theme }) => ({
  borderRadius: expanded ? "12px" : customBorderRadius,
  background: theme.palette.secondary[0],
  textAlign: "left",
  boxShadow: expanded || customBorderRadius !== "0" ? "0px 4px 4px rgba(0, 0, 0, 0.05)" : "none",
  "&.MuiAccordion-root:first-of-type": {
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px"
  },
  "&.MuiAccordion-root:last-of-type": {
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)"
  },
  "&:before": {
    display: isDisplayBorderTop ? "flex" : "none",
    width: "calc(100% - 40px)",
    margin: "0 auto",
    height: "1px",
    borderBottom: `2px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    background: "transparent"
  }
}));

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "18px",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const IconWrapper = styled(Box)<{ fill: string }>`
  display: flex;
  align-items: center;
  & svg > * {
    fill: ${({ fill }) => fill};
  }
`;
