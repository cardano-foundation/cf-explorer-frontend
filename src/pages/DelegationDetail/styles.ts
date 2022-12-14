import { MenuItem, Select, styled } from "@mui/material";

export const Title = styled("h2")``;

export const SelectComponent = styled(Select)(({ theme }) => ({
  height: "40px",
  minWidth: 250,
  borderRadius: theme.borderRadius,
  padding: "0 10px",
  color: theme.textColor,
  textAlignLast: "left",
  fontSize: "var(--font-size-text-small)",
  ":focus-visible": {
    outline: "none",
  },
  "&>div": {
    padding: "8.5px 14px",
  },
}));

export const OptionSelect = styled(MenuItem)(({ theme }) => ({
  padding: "6px 20px",
  textAlign: "center",
  height: "40px",
}));
