import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;

export const Horizon = styled("div")`
  margin: 30px 0;
  width: 100%;
  border: 1px solid #000000;
  opacity: 0.07;
`;

export const SearchContainer = styled("div")`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
`;
