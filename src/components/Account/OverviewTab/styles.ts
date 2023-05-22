import { Box, styled } from "@mui/material";

export const TextNote = styled(Box)`
  color: ${({ theme }) => theme.palette.common.black};
  opacity: 0.5;
  margin-bottom: 15px;
  font-size: 14px;
`;

export const Label = styled(Box)`
  color: ${({ theme }) => theme.palette.common.black};
  opacity: 0.6;
  width: 190px;
`;

export const Value = styled(Box)`
  font-weight: bold;
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

export const WrapInfoItemMobile = styled(Box)(({ theme }) => ({
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
