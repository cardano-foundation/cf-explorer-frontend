import { Container, Grid, styled } from "@mui/material";

export const StyledContainer = styled(Container)`
  text-align: left;
`;

export const GridWrapper = styled(Grid)`
  min-height: 400px;
  padding: 0 0 0 0;
  text-align: left;
`;

export const Tab = styled("div")`
  display: inline-block;
`;

export const Button = styled("button")<{ active: number }>`
  border: none;
  border-radius: 5px;
  padding: 6px 30px;
  font-weight: var(--font-weight-bold);
  color: ${props => (props.active ? "white" : "var(--text-color-pale)")};
  background-color: ${props => (props.active ? "#438F68" : "#e7e8ea")};
  cursor: pointer;
  font-family: var(--font-family-title);
  font-size: 16px;
  line-height: 24px;
`;

export const ChartContainer = styled("div")`
  padding-top: 20px;
`;

export const GridRight = styled(Grid)`
  height: 100%;
`;

export const Item = styled("div")`
  min-height: 120px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #344054;
  text-align: center;
`;

export const Title = styled("div")`
  color: var(--text-color-pale);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: #ffffff;
`;

export const Value = styled("div")`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  font-size: 32px;
  line-height: 47px;
  color: #ffffff;
`;

export const Horizon = styled("div")`
  width: 100%;
  opacity: 0.07;
  border: 1px solid #ffffff;
`;
