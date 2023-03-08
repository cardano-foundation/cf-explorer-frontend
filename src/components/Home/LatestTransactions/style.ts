import { Box, styled } from "@mui/material";
import { BoxRaised } from "../../commons/BoxRaised";

export const TransactionContainer = styled(Box)`
  margin-bottom: 24px;
  padding: 24px 0px;
  text-align: left;
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 10px;
`;

export const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin: 0px;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: var(--color-green-light);
  }
`;

export const Item = styled(BoxRaised)`
  display: block;
  position: relative;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: var(--font-family-text);
  cursor: pointer;
  height: calc(100% - 56px);
  &:hover {
    box-shadow: ${props => props.theme.shadow_1};
  }
`;
export const ItemHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const PriceImage = styled("img")`
  width: 30px;
  height: 30px;
`;

export const PriveValue = styled("span")`
  font-size: var(--font-size-text-x-large);
  font-weight: var(--font-weight-bold);
`;

export const ItemDetail = styled("div")`
  color: var(--text-color-pale);
`;

export const Hash = styled("small")`
  font-style: normal;
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.linkColor};
  font-family: var(--font-family-text);
`;

export const BlockNo = styled("small")`
  font-style: normal;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
`;

export const WalletAddress = styled("small")`
  color: ${props => props.theme.linkColor};
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
`;

export const BlankImage = styled("img")`
  margin-left: 6px;
  margin-bottom: -1px;
  width: 14px;
  height: 14px;
  vertical-align: baseline;
`;
