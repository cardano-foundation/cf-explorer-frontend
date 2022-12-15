import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0px var(--container-margin);
  padding: 30px 0 40px;
`;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.colorBlueDark};
`;

export const Index = styled(StyledColorBlueDard)``;

export const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  color: ${props =>
    props.status === "finished"
      ? props.theme.colorBlue
      : props.status === "rewarding"
      ? props.theme.colorGreenLight
      : props.theme.colorYellow};
  background: ${props =>
    props.status === "finished"
      ? "rgba(16, 138, 239, 0.2)"
      : props.status === "rewarding"
      ? "rgba(67, 143, 104, 0.2)"
      : "rgba(255, 168, 0, 0.2)"};
`;

export const Blocks = styled(StyledColorBlueDard)``;

export const Output = styled(Blocks)`
  display: flex;
  align-items: center;
  gap: 10px;
`;
