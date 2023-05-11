import { styled, Box } from "@mui/material";

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${props => props.theme.palette.text.secondary};
  font-weight: var(--font-weight-bold);
`;
