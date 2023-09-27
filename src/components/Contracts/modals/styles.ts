import { Box, List, ListItem, ListItemText, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const ModalContent = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px;
`;

export const StyledList = styled(List)`
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 8px;
  box-shadow: 1px 2px 4px 0px rgba(67, 70, 86, 0.2);
  overflow: hidden;
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
`;
