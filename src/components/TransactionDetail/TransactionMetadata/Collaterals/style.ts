import { alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.common.white};
  padding: 25px;
`;
export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.grey[300]};
  border-bottom: 1px solid ${(props) => alpha(props.theme.palette.common.black, 0.1)};
  padding-bottom: 8px;
`;

export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: alpha(theme.palette.grey[300], 0.2),
  color: theme.palette.grey[300],
  fontSize: "var(--font-size-text)",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  display: "inline",
  whiteSpace: "nowrap"
}));

export const Item = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: "10px 0px",
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`
}));
export const ItemBox = styled(Box)(() => ({
  "> *:last-child > div": {
    padding: "10px 0 0",
    borderBottom: "none"
  }
}));

export const ItemContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const WrapToken = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  width: "auto",
  [theme.breakpoints.down("md")]: {
    wordBreak: "break-all",
    "& > a": {
      whiteSpace: "unset",
      margin: 0
    }
  }
}));
