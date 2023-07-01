import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "box",
  lineHeight: 1.5,
  overflow: "hidden",
  width: "max-content",
  maxWidth: "100%"
}));
