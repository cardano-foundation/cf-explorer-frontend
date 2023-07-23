import { styled, Box, Container } from "@mui/material";

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary[600]
}));

export const DelegationData = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.secondary}`
}));

export const StyledContainer = styled(Container)`
  max-width: 95vw !important;
`;
