import { Box, Dialog, IconButton, Paper, styled } from "@mui/material";

export const ConnectDialog = styled(Dialog)<{ connecting: number }>`
  * {
    ${props => (props.connecting ? `cursor: wait;` : ``)}
  }
`;

export const ConnectOption = styled(Paper)`
  position: absolute;
  right: 0px;
  border-radius: 20px;
  width: 400px;
  height: 400px;
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
  border: 1px solid #a3a3a3;
  cursor: ${props => (props.connecting ? `wait` : `pointer`)};
  &:hover {
    ${props => (props.connecting ? `background: none;` : ``)}
  }
`;

export const WalletItem = styled(Box)<{ active: number; connecting: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: ${props => (props.connecting ? `wait` : `pointer`)};
  box-shadow: ${props => (props.active ? props.theme.shadowRaised : "none")};
  background-color: ${props => (props.active ? props.theme.bodyBackground : "rgba(152, 162, 179, 0.1)")};
  &:hover {
    background-color: ${props => props.theme.bodyBackground};
  }
`;

export const WalletIcon = styled("img")`
  width: 36px;
  height: 36px;
`;

export const WalletName = styled("h4")`
  margin: 0px;
  color: #667085;
`;
