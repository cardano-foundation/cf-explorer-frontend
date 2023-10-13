import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)`
  margin-top: 28px;
`;

export const Item = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background: ${(props) => props.theme.palette.secondary[0]};
  box-shadow: ${(props) => props.theme.shadow.card};
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
`;

export const Title = styled("span")`
  font-family: var(--font-family-title);
  line-height: 24px;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const Value = styled("span")(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontSize: 22,
  lineHeight: "33px",
  color: theme.palette.secondary.main,
  fontFamily: "var(--font-family-title)",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14
  }
}));

export const FixedCostBox = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  & > svg {
    margin-top: -2px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    & {
      display: inline;
    }
  }
`;
