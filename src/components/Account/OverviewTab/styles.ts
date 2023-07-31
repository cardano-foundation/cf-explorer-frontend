import { Box, Button, styled } from "@mui/material";

export const TextNote = styled(Box)`
  color: ${({ theme }) => theme.palette.secondary.light};
  opacity: 0.5;
  margin-bottom: 15px;
  font-size: 14px;
`;

export const Label = styled(Box)`
  color: ${({ theme }) => theme.palette.secondary.light};
  opacity: 0.6;
  width: 190px;
`;

export const Value = styled(Box)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.secondary.main};
  flex: 1;
`;

export const StyledRowItem = styled(Box)`
  display: flex;
  padding-right: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
  height: 50px;
  align-items: center;
  font-size: var(--font-size-text-small);
`;

export const WrapInfoItemMobile = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px"
}));

export const StyledAction = styled(Box)`
  cursor: pointer;
`;

export const WalletAddress = styled(Box)`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-right: 15px;
`;
