import { styled } from "@mui/material";

export const Status = styled("span")`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text);
  margin-left: 25px;
  padding: 5px 12px;
  border-radius: 2px;
`;

export const Active = styled(Status)`
  background: rgba(67, 143, 104, 0.2);
  color: #438f68;
`;

export const Deactive = styled(Status)`
  background: rgba(24, 76, 120, 0.1);
  color: #667085;
`;

export const Title = styled("div")`
  display: flex;
  align-items: center;
`;

export const Flex = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled("span")`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;