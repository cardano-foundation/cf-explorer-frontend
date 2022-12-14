import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)`
  margin-top: 28px;
`;

export const Item = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  padding: 24px;
`;

export const Title = styled("span")`
  font-family: var(--font-family-title);
  line-height: 24px;
  color: #667085;
`;

export const Value = styled("span")`
  font-family: var(--font-family-title);
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
`;
