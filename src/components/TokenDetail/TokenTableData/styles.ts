import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const SelectComponent = styled("select")(({ theme }) => ({
  height: "40px",
  minWidth: 250,
  borderRadius: theme.borderRadius,
  border: "1px solid #0000001a",
  padding: "0 10px",
  color: theme.textColor,
  textAlignLast: "left",
  ":focus-visible": {
    outline: "none",
  },
}));

export const OptionSelect = styled("option")(({ theme }) => ({
  padding: "6px 0",
  textAlign: "center",
  height: "40px",
}));

const Bold = styled("span")`
  font-weight: var(--font-weight-bold);
`;

const Flex = styled("div")`
  display: flex;
`;

const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-bold);
`;

/* Transactions */
const TransactionIndex = styled(Bold)``;

const TransactionHash = styled(StyledLink)``;

const TransactionAddressInput = styled(Flex)``;

const TransactionAddressOutput = styled(TransactionAddressInput)`
  padding-top: 8px;
`;

const TransactionAddressTitle = styled("div")`
  min-width: 60px;
`;

const StyledImg = styled("img")`
  margin-right: 8px;
`;

const TransactionFee = styled(Bold)``;

const TransactionOutput = styled(Bold)``;

export const Transaction = {
  TransactionIndex,
  TransactionHash,
  TransactionAddressInput,
  TransactionAddressOutput,
  TransactionAddressTitle,
  TransactionFee,
  TransactionOutput,
  StyledImg,
};

/* Top Holders */
const TopHolderIndex = styled(Bold)``;
const TopHolderHash = styled(StyledLink)``;
const TopHolderBalance = styled(Bold)``;
const TopHolderShare = styled(Bold)``;

export const TopHolder = {
  TopHolderIndex,
  TopHolderHash,
  TopHolderBalance,
  TopHolderShare,
  StyledImg,
};

/* Minting */
const MintingIndex = styled(Bold)``;
const MintingHash = styled(StyledLink)``;
const MintingBalance = styled(Bold)``;

export const Minting = {
  MintingIndex,
  MintingHash,
  MintingBalance,
  StyledImg,
};
