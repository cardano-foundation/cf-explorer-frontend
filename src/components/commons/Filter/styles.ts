import { Box, Button, ListItemText, MenuItem, styled } from "@mui/material";

export const FilterButton = styled(Button)`
  border: none;
  outline: none;
  background-color: ${({ theme }) => (theme.mode === "dark" ? theme.palette.secondary[0] : theme.palette.primary[200])};
  color: ${({ theme }) => (theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light)};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  padding: 6px 12px 6px 14px;
  font-size: 14px;
  font-weight: 700;
  &::hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? theme.palette.secondary[0] : theme.palette.primary[200]};
  }
`;

export const FilterContent = styled(Box)<{ isMobile?: boolean }>`
  position: absolute;
  right: ${({ isMobile }) => (isMobile ? "65%" : 0)};
  transform: ${({ isMobile }) => (isMobile ? "translateX(45%)" : "none")};
  top: calc(100% + 11px);
  background-color: ${({ theme }) => theme.palette.secondary[0]};
  min-width: 250px;
  border-radius: 6px;
  padding: ${({ theme }) => theme.spacing(1)};
  z-index: 10;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  &::before {
    content: "";
    display: block;
    background: ${({ theme }) => theme.palette.secondary[0]};
    z-index: 9;
    position: absolute;
    top: -6px;
    right: ${({ isMobile }) => (isMobile ? "40%" : "32px")};
    width: 14px;
    height: 16px;
    transform: rotate(45deg);
    box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  }
`;

export const FilterContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary[0]};
  position: relative;
  display: inline-flex;
  border-radius: 5px;
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
