import { Box, BoxProps, Icon, styled } from "@mui/material";

import { WalletGreenIcon } from "src/commons/resources";

export const WrapWalletIcon = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[200])};
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 17px;
    height: 17px;
    color: ${({ theme }) => (theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light)};
    padding-right: 2px;
  }
`;

export const GreenWalletIcon = (props: BoxProps) => {
  return (
    <WrapWalletIcon {...props}>
      <Icon component={WalletGreenIcon} stroke="currentColor" />
    </WrapWalletIcon>
  );
};
