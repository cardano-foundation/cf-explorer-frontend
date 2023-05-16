import { TabList } from "@mui/lab";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import breakpoints from "~/themes/breakpoints";

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.common.black : theme.palette.text.hint
}));

export const LabelStatus = styled(Box)(({ theme }) => ({
  textTransform: "uppercase",
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontFamily: '"Roboto", sans-serif',
  fontWeight: "bold",
  fontSize: "0.875rem",
  borderRadius: 4,
  height: "60%",
  width: "max-content"
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main}!important;
`;

export const StyledTabList = styled(TabList)`
  & > div > div {
    justify-content: space-between;
    @media screen and (max-width: ${breakpoints.values.sm}px) {
      overflow-x: auto;
      white-space: nowrap;
    }
  }
`;

export const WrapperTabList = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.border.secondary}`,
  overflowX: "auto"
}));
