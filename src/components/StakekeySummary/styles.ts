import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  textOverflow: "unset",
  whiteSpace: "break-spaces",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  lineHeight: 1.5,
  overflow: "hidden"
}));
