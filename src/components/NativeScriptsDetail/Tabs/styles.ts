import { Box, Button, Card, Grid, Typography, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { TruncateSubTitleContainer } from "src/components/share/styled";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 12px 25px 12px;
  flex: 1;
`;

export const ContainerMint = styled(Grid)(() => ({}));

export const ItemMint = styled(Grid)(({ theme }) => ({
  ":last-child >div": {
    border: "none !important"
  },
  [theme.breakpoints.down("lg")]: {
    ":nth-child(2n) >div": {
      border: "none !important"
    },
    ":nth-child(-n+2) >div": {
      borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.07)} !important`
    }
  },
  [theme.breakpoints.down("sm")]: {
    ":nth-child(-n+4) >div": {
      border: "none !important",
      borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.07)} !important`
    },
    ":last-child >div": {
      border: "none !important"
    }
  }
}));

export const AssociatedAddressTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const AssociatedAddressValue = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 700;
  cursor: pointer;
`;

export const Bold = styled("span")`
  font-weight: var(--font-weight-bold);
`;

export const Flex = styled("div")`
  display: flex;
  align-items: baseline;
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
  margin-bottom: 5px;
`;

export const PriceValue = styled(Box)`
  display: inline-flex;
  align-items: center;
`;

export const Label = styled(SmallText)`
  min-width: 50px;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const PriceIcon = styled("img")`
  height: var(--font-size-text-small);
  width: auto;
  margin-left: 8px;
  margin-bottom: 5px;
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  marginTop: "20px"
}));

export const ViewAddressButton = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const DataRow = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const Key = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-weight: 600;
`;

export const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: 16px !important;
  display: inline;
`;

export const VerifyScriptButton = styled("button")<{ loading?: number }>`
  all: unset;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.secondary[0]};
  text-transform: uppercase;
  background-color: ${({ theme, loading }) => (loading ? theme.palette.secondary[600] : theme.palette.primary.main)};
  padding: 12px 14px;
  border-radius: 8px;
  cursor: pointer;
`;

export const Center = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const AddressLink = styled(StyledLink)`
  font-size: 16px;
  font-weight: 700;
  display: inline;
`;

export const AssociatedValue = styled(Typography)`
  display: block;
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-size: 16px;
  font-weight: 700;
`;

export const StyledTruncateSubTitleContainer = styled(TruncateSubTitleContainer)`
  width: 100%;
  max-width: unset !important;
`;
export const MintCard = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${alpha(theme.palette.secondary.main, 0.07)} !important`,
  padding: theme.spacing(2),
  minHeight: 150
}));

export const MintIcon = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`
}));

export const MintTitle = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
  fontSize: 14,
  color: theme.palette.secondary.light
}));

export const ViewSigner = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
  fontSize: 16,
  color: theme.palette.secondary.main,
  textTransform: "capitalize",
  width: "100%",
  border: `2px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  borderRadius: theme.spacing(1)
}));

export const CardSign = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  height: 100%;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[700])};
  box-shadow: 2px 2px 10px 0px #43465633;
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.isDark ? ` 2px 2px 10px 0px ${theme.palette.secondary[100]}` : theme.shadow.cardHover};
  }
`;
