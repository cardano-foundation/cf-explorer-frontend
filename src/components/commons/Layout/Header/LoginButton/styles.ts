import { CircularProgress, ButtonBase, styled } from "@mui/material";

export const StyledButton = styled(ButtonBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;
  background: ${({ theme }) => (theme.mode === "light" ? theme.palette.secondary.main : theme.palette.primary.main)};
  border-radius: 8px;
  cursor: pointer;
  height: auto;
  border: none;
  font-size: var(--font-size-text);
  line-height: 1;
  height: 40px;
`;

export const Span = styled("span")`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  color: ${({ theme }) => (theme.mode === "light" ? theme.palette.secondary[0] : theme.palette.secondary[100])};
  white-space: nowrap;
  line-height: 1;
`;

export const Image = styled("img")`
  width: 24px;
  height: 24px;
`;
export const Spin = styled(CircularProgress)`
  color: ${(props) => props.theme.palette.primary.contrastText};
`;
