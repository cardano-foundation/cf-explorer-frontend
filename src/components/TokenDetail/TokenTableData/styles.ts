import { Box, Select, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${(props) => props.theme.palette.common.white};
  color: ${(props) => props.theme.palette.text.secondary};
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
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 20px;
  }
`;

export const OptionSelect = styled("option")(() => ({
  padding: "6px 0",
  textAlign: "center",
  height: "40px"
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
  color: ${(props) => props.theme.palette.primary.main} !important;
  margin-bottom: 5px;
`;

export const SmallText = styled("small")`
  display: inline-block;
  color: ${(props) => props.theme.palette.secondary.light};
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
  StyledImg: PriceIcon
};

/* Minting */
const MintingIndex = styled(Bold)``;
const MintingHash = styled(StyledLink)``;
const MintingBalance = styled(Bold)``;

export const Minting = {
  MintingIndex,
  MintingHash,
  MintingBalance,
  StyledImg: PriceIcon
};

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  textAlign: "left",
  backgroundColor: `${theme.palette.secondary[0]}`,
  borderRadius: 10,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  maxHeight: "50vh",
  [theme.breakpoints.up("md")]: {
    "& .MuiSvgIcon-root": {
      display: "none !important"
    },
    "&::-webkit-scrollbar": {
      width: "5px"
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent"
    },
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.secondary.light
      },
      "&::-webkit-scrollbar-track": {
        background: theme.palette.primary[100]
      }
    }
  }
}));

export const DescriptionText = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(1)} 0`,
  textAlign: "left",
  fontSize: 14,
  color: theme.mode === "light" ? theme.palette.secondary[600] : theme.palette.secondary[800]
}));
