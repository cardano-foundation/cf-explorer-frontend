import { styled, Tab } from "@mui/material";

export const TabTitle = styled("h3")`
  margin: 0px;
  color: var(--title-color);
  text-align: left;
  text-transform: capitalize !important;

  &.active {
    color: var(--color-black);
  }
`;

export const WrapTab = styled(Tab)`
  max-width: unset;
`