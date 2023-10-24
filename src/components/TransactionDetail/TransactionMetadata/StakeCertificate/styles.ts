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
