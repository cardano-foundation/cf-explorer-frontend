import { styled, Container, Box } from "@mui/material";

export const StyledContainer = styled(Container)`
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-bottom: 20px;
  }
`;
export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.875rem",
  minHeight: 20
}));

export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "1.125rem",
  minHeight: 20
}));

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  margin: "15px 0px 0px"
}));
