import { styled } from "@mui/material";

export const Title = styled("h3")<{ active: number }>`
  background: ${props => props.theme.palette.common.white};
  padding: 25px;
  margin-bottom: 0px;
  color: ${({ theme, active }) => (active ? theme.palette.text.dark : theme.palette.text.hint)};
  text-align: left;
  text-transform: capitalize !important;
`;
