import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.textColor};
`;

export const Index = styled(StyledColorBlueDard)``;

export const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  color: ${({ status, theme }) =>
    status === "finished" ? theme.blue_0 : status === "rewarding" ? theme.green_2 : theme.warning_1};
  background: ${({ status, theme }) =>
    status === "finished" ? theme.blue_0_20 : status === "rewarding" ? theme.green_2_20 : theme.warning_1_20};
`;

export const Blocks = styled(StyledColorBlueDard)``;

export const Output = styled(Blocks)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
