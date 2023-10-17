import { Box, List, ListItem, ListItemText, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const ModalContent = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 70vh;
  padding: 4px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-height: 70vh;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    border-radius: 8px 0px 0px 8px;
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;

export const StyledList = styled(List)`
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white)};
  border-radius: 8px;
  box-shadow: 1px 2px 4px 0px rgba(67, 70, 86, 0.2);
  overflow-y: auto;
  padding: 0px;
`;

export const StyledItem = styled(ListItem)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary[200]};
  padding: 12px 20px;
  &:last-child {
    border: none;
  }
`;

export const StyledLink = styled(Link)<{ color?: string }>`
  text-decoration: underline;
  color: ${({ color }) => color};
  font-size: 1rem;
  color: blue;
`;

export const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    & a {
      display: inline-block;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const TitleModal = styled(Box)`
  color: ${({ theme }) => theme.palette.secondary.light};
`;
