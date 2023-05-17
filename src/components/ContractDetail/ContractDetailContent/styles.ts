import { styled } from "@mui/material";
import { TabList } from "@mui/lab";

export const TabTitle = styled("h3")`
  margin-bottom: 0px;
  color: ${({ theme }) => theme.palette.text.hint};
  text-align: left;
  text-transform: capitalize !important;

  &.active {
    color: ${({ theme }) => theme.palette.common.black};
  }
`;

export const TabListStyled = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    paddingLeft: "16px !important"
  }
}));
