import { MenuItem, Select, styled } from "@mui/material";

export const Title = styled("h2")``;

export const SelectComponent = styled(Select)(({ theme }) => ({
  height: "40px",
  minWidth: 250,
  borderRadius: theme.borderRadius,
  border: "1px solid #0000001a",
  padding: "0 10px",
  color: theme.textColor,
  textAlignLast: "left",
  ":focus-visible": {
    outline: "none",
  },
}));

export const OptionSelect = styled(MenuItem)(({ theme }) => ({
  padding: "6px",
  textAlign: "center",
  height: "40px",
}));
