import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
`;

export const Horizon = styled("div")`
  margin: 30px 0;
  width: 100%;
  border: 1px solid ${props => props.theme.black};
  opacity: 0.07;
`;
