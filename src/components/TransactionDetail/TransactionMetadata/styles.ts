import { Accordion, Box, styled } from "@mui/material";

export const Title = styled("h3")<{ active: number }>`
  background: ${(props) => props.theme.palette.common.white};
  padding: 25px;
  margin-bottom: 0px;
  color: ${({ theme, active }) => (active ? theme.palette.text.dark : theme.palette.text.hint)};
  text-align: left;
  text-transform: capitalize !important;
`;

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "18px",
  color: active ? theme.palette.primary.main : theme.palette.secondary[600]
}));

export const CustomAccordion = styled(Accordion)<{
  expanded: boolean;
  customBorderRadius: string;
  isDisplayBorderTop: boolean;
}>(({ expanded, customBorderRadius, isDisplayBorderTop, theme }) => ({
  borderRadius: expanded ? "12px" : customBorderRadius,
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
    display: isDisplayBorderTop ? "block" : "none",
    width: "calc(100% - 40px)",
    margin: "0 auto",
    height: "2px",
    background: theme.palette.primary[200]
  }
}));
