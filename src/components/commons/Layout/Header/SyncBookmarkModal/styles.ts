import { Box, Button, styled } from "@mui/material";

export const ModalTitle = styled("h3")`
  font-family: var(--font-family-title);
  margin-top: 0px;
`;

export const Description = styled(Box)`
  margin-bottom: 35px;
  font-size: var(--font-size-text-small);
`;

export const StyledButton = styled(Button)`
  padding: 10px 20px;
  min-width: 150px;
  background: transparent;
  border: 2px solid ${(props) => props.theme.palette.border.hint};
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-text);
  height: 40px;
  color: ${(props) => props.theme.palette.text.secondary};
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  text-transform: unset;
`;
