import { styled, Container, Box } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.palette.text.primary};
`;

export const Index = styled(StyledColorBlueDard)``;

export const ViewAction = styled(Box)`
  text-decoration: underline;
  cursor: pointer;
  color: ${props => props.theme.palette.blue[800]};
`;
