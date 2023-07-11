import { Box, styled } from "@mui/material";

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
  fontSize: "1.125rem",
  color: active ? theme.palette.green[200] : theme.palette.grey[300]
}));
