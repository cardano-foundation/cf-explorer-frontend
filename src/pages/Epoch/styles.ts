import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.palette.text.primary};
`;

export const Index = styled(StyledColorBlueDard)``;

export const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  color: ${({ status, theme }) =>
    status === "finished"
      ? theme.palette.info.main
      : status === "rewarding"
      ? theme.palette.success.main
      : theme.palette.warning.main};
  background: ${({ status, theme }) =>
    status === "finished"
      ? theme.palette.info.light
      : status === "rewarding"
      ? theme.palette.success.light
      : theme.palette.warning.light};
`;

export const Blocks = styled(StyledColorBlueDard)``;

export const Output = styled(Blocks)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
