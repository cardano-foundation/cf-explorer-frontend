import { alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  background: ${props => props.theme.palette.common.white};
  padding: 25px;
`;
export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.palette.text.hint};
  border-bottom: 1px solid ${props => alpha(props.theme.palette.common.black, 0.1)};
  padding-bottom: 8px;
`;

export const StyledItem = styled(Box)`
  background-color: white;
  text-align: left;
  padding: 10px 0;
  font-size: var(--font-size-text);
  border-bottom: 1px solid ${props => alpha(props.theme.palette.common.black, 0.1)};
`;

export const ItemContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StatusIcon = styled("img")`
  padding-right: 10px;
  width: 35px;
`;

export const AddressLink = styled(Link)`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-size-text);
  color: ${props => props.theme.palette.secondary.main} !important;
  margin-right: 8px;
`;

export const Amount = styled("span")`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-size-text);
  color: ${props => props.theme.palette.success.main};
`;
