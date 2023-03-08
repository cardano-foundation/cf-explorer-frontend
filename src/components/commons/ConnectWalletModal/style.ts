import { Box, Button, Dialog, IconButton, Paper, styled } from "@mui/material";

export const ConnectDialog = styled(Dialog)<{ connecting: number }>`
  * {
    ${props => (props.connecting ? `cursor: wait;` : ``)}
  }
`;

export const ConnectOption = styled(Paper)`
  position: absolute;
  top: calc(100% + 10px);
  right: 0px;
  border-radius: 20px;
  width: 480px;
`;

export const WrapContent = styled(Box)`
  padding: 30px 40px;
  position: relative;
`;

export const Title = styled("h3")`
  margin: 0;
  text-align: left;
`;

export const CloseButton = styled(IconButton)<{ connecting: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${props => props.theme.gray_9};
  cursor: ${props => (props.connecting ? `wait` : `pointer`)};
  &:hover {
    ${props => (props.connecting ? `background: none;` : ``)}
  }
`;

export const WalletItem = styled(Box)<{ active: number; connecting: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 60px;
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: ${props => (props.connecting ? `wait` : `pointer`)};
  box-shadow: ${props => (props.active ? props.theme.shadow_0 : "none")};
  background-color: ${props => (props.active ? props.theme.bodyBackground : props.theme.gray_5_10)};
  &:hover {
    background-color: ${props => props.theme.bodyBackground};
  }
`;

export const GroupFlex = styled(Box)`
  flex: 1;
  min-width: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export const WalletName = styled("h4")`
  margin: 0px;
  color: ${props => props.theme.textColorLight};
`;

export const InstallButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  background: ${props => props.theme.purple_6};
  border-radius: 5px;
  padding: 4px 10px;
  height: 29px;
  color: ${props => props.theme.purple_2};
  text-transform: none;
  font-size: var(--font-size-text-x-small);
  font-weight: var(--font-weight-bold);
`;

export const WalletIcon = styled("img")`
  width: 29px;
  height: 29px;
`;
