import { Box, Select, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${props => props.theme.palette.common.white};
  color: ${props => props.theme.palette.text.secondary};
  border-radius: 8px;
  min-width: 250px;
  & > div {
    padding: 6.5px 14px;
    cursor: pointer;
    font-weight: 400;
    text-align: left;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${props => props.theme.palette.text.secondary};
    font-size: 20px;
  }
`;

export const OptionSelect = styled("option")(({ theme }) => ({
  padding: "6px 0",
  textAlign: "center",
  height: "40px",
}));

export const Bold = styled("span")`
  font-weight: var(--font-weight-bold);
`;

export const Flex = styled("div")`
  display: flex;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  font-family: var(--font-family-text) !important;
  font-size: var(--font-size-text-small);
  color: ${props => props.theme.palette.secondary.main} !important;
  margin-bottom: 5px;
`;

export const SmallText = styled("small")`
  display: inline-block;
  color: ${props => props.theme.palette.text.secondary};
  margin-bottom: 5px;
`;

export const PriceValue = styled(Box)`
  display: inline-flex;
  align-items: center;
`;

export const Label = styled(SmallText)`
  min-width: 50px;
`;

export const PriceIcon = styled("img")`
  height: var(--font-size-text-small);
  width: auto;
  margin-left: 8px;
  margin-bottom: 5px;
`;

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
  StyledImg: PriceIcon,
};

/* Minting */
const MintingIndex = styled(Bold)``;
const MintingHash = styled(StyledLink)``;
const MintingBalance = styled(Bold)``;

export const Minting = {
  MintingIndex,
  MintingHash,
  MintingBalance,
  StyledImg: PriceIcon,
};

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.common.black : theme.palette.text.hint,
}));
