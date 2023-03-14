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
  background: ${props => props.theme.palette.background.neutral};
  box-shadow: ${props => props.theme.shadow.card};
  border-radius: 12px;
  padding: 24px;
`;

export const Title = styled("span")`
  font-family: var(--font-family-title);
  line-height: 24px;
  color: ${props => props.theme.palette.grey[400]};
`;

export const Value = styled("span")`
  font-family: var(--font-family-title);
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
`;
