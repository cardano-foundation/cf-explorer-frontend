import { Box, styled } from "@mui/material";

export const ModalTitle = styled("h3")`
  font-family: var(--font-family-title);
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const Description = styled(Box)`
  margin-bottom: 35px;
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: var(--font-size-text-small);
`;
