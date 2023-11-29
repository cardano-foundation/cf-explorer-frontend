import { Box, List, ListItem, ListItemText, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const ModalContent = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 70dvh;
  padding: 4px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;

export const SlotContainer = styled(Box)`
  flex: 1;
  overflow: auto;
  min-height: 20vh;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-height: 70dvh;
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
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

export const FoldCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 8px;
  gap: 8px;
  box-shadow: ${(props) => props.theme.shadow.card};
  border-radius: 6px;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0])};
`;
export const FoldCardName = styled(Box)`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.secondary.main} !important;
  & a {
    color: ${({ theme }) => theme.palette.primary.main} !important;
    font-weight: 400;
  }
`;
export const FoldCardValue = styled(Box)`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.secondary.main} !important;
  & span {
    font-weight: 400;
    line-break: anywhere;
  }
`;

export const TitleReference = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontWeight: "bold",
  fontSize: 16
}));
export const ValueReference = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: 16
}));
export const UTXOReference = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: 16,
  fontWeight: "bold"
}));
export const ExternalLink = styled("a")(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  textDecoration: "underline !important"
}));

export const Index = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
`;

export const UTXOWapper = styled(Box)<{ index?: number }>`
  position: relative;
  &::after {
    content: ${({ index }) => `"#${index}"`};
    display: inline-block;
    position: absolute;
    width: 40px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.secondary.light};
    top: 3px;
    right: 1px;
    cursor: unset;
  }
`;
