import { Box, styled } from "@mui/material";

export const TitleTab = styled(Box)<{ active: boolean }>(({ active }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Space Mono", monospace, sans-serif',
  fontSize: "1.125rem",
  color: active ? "#000000" : "unset",
}));
export const LabelStatus = styled(Box)(({ theme }) => ({
  textTransform: "uppercase",
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontFamily: '"Space Mono", monospace, sans-serif',
  fontWeight: "bold",
  fontSize: "0.875rem",
  borderRadius: 4,
  height: "60%",
  width: "max-content",
}));

