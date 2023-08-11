import { Box, styled } from "@mui/material";

export const Icon = styled("img")`
  width: 100%;
  aspect-ratio: 1;
`;

export const StyledADASymbol = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[0],
  borderRadius: "50%",
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
