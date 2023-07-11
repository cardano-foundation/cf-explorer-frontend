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
  background: ${(props) => props.theme.palette.common.white};
  box-shadow: ${(props) => props.theme.shadow.card};
  border-radius: 12px;
  padding: 24px;
`;

export const Title = styled("span")`
  font-family: var(--font-family-title);
  line-height: 24px;
  color: ${(props) => props.theme.palette.grey[300]};
`;

export const Value = styled("span")(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontSize: 22,
  lineHeight: "33px",
  color: theme.palette.grey[400],
  fontFamily: "var(--font-family-title)",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14
  }
}));
