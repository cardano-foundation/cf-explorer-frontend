import { styled } from "@mui/material";

export const TabTitle = styled("h3")`
  margin-bottom: 0px;
  color: var(--title-color);
  text-align: left;
  text-transform: capitalize !important;

  &.active {
    color: var(--color-black);
  }
`;
