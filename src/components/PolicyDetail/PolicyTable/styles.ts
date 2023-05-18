import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { TabList } from "@mui/lab";

export const LinkComponent = styled(Link)(({ theme }) => ({
  color: `${theme.palette.secondary.main} !important`
}));
export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.common.black : theme.palette.grey[300]
}));

export const StyledTabList = styled(TabList)(({ theme }) => ({
  "& button:nth-of-type(1)": {
    paddingLeft: "0px"
  }
}));
