import { Box, styled } from "@mui/material";

export const AssetName = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-text-small);
  color: #344054;
`;

export const LogoEmpty = styled(Box)`
  width: 30px;
  height: 30px;
  background: #ffffff99;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
`;

export const Amount = styled(Box)`
  font-size: var(--font-size-text-small);
  color: #344054;
`;
