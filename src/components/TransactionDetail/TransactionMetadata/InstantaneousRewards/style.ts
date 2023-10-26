import { alpha, Box, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.secondary[0]};
  padding: 25px;
  border: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
  border-radius: ${({ theme }) => theme.spacing(2)};
  overflow: "hidden";
`;
export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.main};
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[200]};
  padding-bottom: 8px;
`;

export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));

export const Item = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: "10px 0px",
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`
}));
export const ItemBox = styled(Box)(() => ({
  "> *:last-child > div": {
    padding: "10px 0"
  },
  "> *:last-child > div:last-child": {
    borderBottom: "none"
  }
}));

export const ItemContent = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "var(--font-size-text-small)"
}));

export const WrapToken = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  width: "auto",
  [theme.breakpoints.down("md")]: {
    wordBreak: "break-word",
    "& > a": {
      whiteSpace: "unset",
      margin: 0
    }
  }
}));

export const Content = styled(Box)(() => ({
  width: "auto",
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  alignItems: "center"
}));
export const Title = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold"
}));
export const Value = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  marginRight: theme.spacing(1)
}));
