import { Box, styled } from "@mui/material";

export const TextLabel = styled("div")`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.palette.secondary.light};
  min-width: 100px;
  text-wrap: nowrap;
  align-seft: center;
  margin-bottom: -4px;
`;

export const TextValue = styled(Box)`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
  margin-left: 12px;
`;
export const Wrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  borderRadius: theme.spacing(2),
  overflow: "hidden"
}));

export const EllipsisContainer = styled(Box)<{ isFailed?: boolean }>`
  font-weight: bold;
  line-height: 18px;
  word-break: normal;
  color: ${({ theme, isFailed }) => (isFailed ? theme.palette.secondary[600] : theme.palette.primary.main)};
  max-width: 50vw;
  display: grid;
  ${({ theme }) => theme.breakpoints.up(420)} {
    max-width: 60vw;
    width: auto;
  }
`;

export const StyledItem = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingBottom: "15px",
  overflow: "auto",
  justifyContent: "flex-start",
  alignItems: "center",
  [theme.breakpoints.down(388)]: {
    alignItems: "baseline"
  }
}));
