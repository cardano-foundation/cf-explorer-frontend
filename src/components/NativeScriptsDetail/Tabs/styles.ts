import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { TruncateSubTitleContainer } from "src/components/share/styled";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 12px 25px 12px;
  flex: 1;
`;

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

export const VerifyScriptButton = styled("button")`
  all: unset;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.secondary[0]};
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.palette.primary.main};
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
