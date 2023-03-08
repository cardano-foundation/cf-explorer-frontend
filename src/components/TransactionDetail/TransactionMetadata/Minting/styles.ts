import { Box, styled } from "@mui/material";

export const AssetName = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-text-small);
  color: ${props => props.theme.gray_3};
`;

export const LogoEmpty = styled(Box)`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.white_60};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const Amount = styled(Box)`
  font-size: var(--font-size-text-small);
  color: ${props => props.theme.gray_3};
`;
