import { Box, Dialog, DialogContent, DialogTitle, IconButton, styled } from "@mui/material";

export const ConnectDialog = styled(Dialog)<{ connecting: boolean }>`
  * {
    ${props => (props.connecting ? `cursor: wait;` : ``)}
  }
`;

export const Header = styled(DialogTitle)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 30px;
  overflow: hidden;
`;

export const Title = styled("h3")`
  margin: 0;
`;

export const CloseButton = styled(IconButton)<{ connecting: boolean }>`
  cursor: ${props => (props.connecting ? `wait` : `pointer`)};
  &:hover {
    ${props => (props.connecting ? `background: none;` : ``)}
  }
`;

export const Content = styled(DialogContent)`
  display: block;
  margin: 0;
  padding: 0px 30px 30px;
`;

export const WalletItem = styled(Box)<{ active: boolean; connecting: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid ${props => props.theme.borderColor};
  box-sizing: border-box;
  border-radius: 10px;
  cursor: ${props => (props.connecting ? `wait` : `pointer`)};
  box-shadow: ${props => (props.active ? props.theme.shadowRaised : "none")};
  background-color: ${props => (props.active ? props.theme.bodyBackground : "unset")};
  &:hover {
    box-shadow: ${props => (!props.connecting ? props.theme.shadowRaised : "none")};
    background-color: ${props => (!props.connecting ? props.theme.bodyBackground : "unset")};
  }
`;

export const WalletIcon = styled("img")`
  width: 36px;
  height: 36px;
`;

export const WalletName = styled("h4")`
  margin: 0px;
`;
