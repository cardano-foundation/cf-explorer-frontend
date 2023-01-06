import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { Box, ButtonBase, CircularProgress, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { WalletIcon } from "../../../../../commons/resources";
import { RootState } from "../../../../../stores/types";
import { setOpenModal } from "../../../../../stores/user";
import ConnectedProfileOption from "../../../ConnectedProfileOption";
import ConnectWalletModal from "../../../ConnectWalletModal";

interface Props {}

const StyledButton = styled(ButtonBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;
  background: ${props => props.theme.colorBlueDark};
  border-radius: 8px;
  cursor: pointer;
  height: auto;
  border: none;
  font-size: var(--font-size-text);
  line-height: 1;
  height: 40px;
`;

const Span = styled("span")`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.textColorReverse};
  white-space: nowrap;
  line-height: 1;
`;

const Image = styled("img")`
  width: 24px;
  height: 24px;
`;
const Spin = styled(CircularProgress)`
  color: ${props => props.theme.textColorReverse};
`;

const ConnectWallet: React.FC<Props> = () => {
  const { network, openModal } = useSelector(({ user }: RootState) => user);

  const { isEnabled, stakeAddress, isConnected } = useCardano({
    limitNetwork: network === "mainnet" ? NetworkType.MAINNET : NetworkType.TESTNET,
  });

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return isEnabled && stakeAddress ? (
    <ConnectedProfileOption />
  ) : isConnected ? (
    <StyledButton type="button">
      <Spin size={20} />
      <Span>Re-Connecting</Span>
    </StyledButton>
  ) : (
    <Box position="relative">
      <StyledButton type="button" onClick={handleClick}>
        <Image src={WalletIcon} alt="wallet" />
        <Span>Connect Wallet</Span>
      </StyledButton>
      {openModal && <ConnectWalletModal />}
    </Box>
  );
};

export default ConnectWallet;
