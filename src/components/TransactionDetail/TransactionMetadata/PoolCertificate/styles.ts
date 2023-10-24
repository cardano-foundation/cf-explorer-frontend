import { Box, styled } from "@mui/material";

export const TextLabel = styled("div")(({ theme }) => ({
  display: "inline-block",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "16px",
  color: theme.palette.secondary.light,
  width: 130,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: "fit-content",
    marginRight: "8px"
  }
}));

export const TextValue = styled("div")`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  word-break: break-word;
  color: ${(props) => props.theme.palette.secondary.main};
  width: 100%;
`;

export const TextRightValue = styled("div")`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const CardHeader = styled(Box)(({ theme }) => ({
  padding: "15px 0px",
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  borderRadius: theme.spacing(2),
  overflow: "hidden"
}));

export const ValueItem = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "70%",
  [theme.breakpoints.up("sm")]: {
    width: "80%"
  },
  [theme.breakpoints.up("md")]: {
    width: "50%"
  },
  [theme.breakpoints.up("lg")]: {
    width: "80%"
  }
}));

export const ValueItemMultiple = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    width: "100%%"
  }
}));

export const EllipsisContainer = styled(Box)<{ isFailed?: boolean }>`
  font-weight: bold;
  color: ${({ theme, isFailed }) => (isFailed ? theme.palette.secondary[600] : theme.palette.primary.main)};
  max-width: 80vw;
`;
