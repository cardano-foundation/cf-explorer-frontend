import { Box, Button, ListItemText, MenuItem, alpha, styled } from "@mui/material";

export const FilterButton = styled(Button)`
  border: none;
  outline: none;
  background-color: ${({ theme }) => alpha(theme.palette.green[200], 0.15)};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  padding: 6px 12px 6px 14px;
  font-size: 14px;
  font-weight: 700;
`;

export const FilterContent = styled(Box)`
  position: absolute;
  right: 0px;
  top: calc(100% + 11px);
  background-color: ${({ theme }) => theme.palette.common.white};
  min-width: 200px;
  border-radius: 6px;
  padding: 6px 0px;
  z-index: 10;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  &::before {
    content: "";
    display: block;
    background: ${({ theme }) => theme.palette.common.white};
    z-index: 9;
    position: absolute;
    top: -6px;
    right: 32px;
    width: 14px;
    height: 16px;
    transform: rotate(45deg);
    box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  }
`;

export const FilterContainer = styled(Box)`
  position: relative;
  display: inline-flex;
`;

export const FilterIconContainer = styled(Box)`
  width: 16px;
  display: flex;
  align-items: center;
`;

export const FilterListItemText = styled(ListItemText)`
  font-size: 14px;
  text-align: left;
  color: ${(props) => props.theme.palette.secondary.main};
`;
export const FilterMenuItem = styled(MenuItem)<{ active?: number }>`
  padding: 8px 16px;
  color: ${({ theme, active }) => (active ? theme.palette.primary.main : "inherit")};
`;
