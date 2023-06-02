import { styled, Box } from "@mui/material";

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.common.black : theme.palette.text.hint
}));

export const DelegationData = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.secondary}`
}));
