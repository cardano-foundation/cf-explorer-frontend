import { Box, Typography, styled } from "@mui/material";

import Table from "../commons/Table";

export const CIPHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CIPHeaderTitle = styled(Box)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.secondary[600]};
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 72dvh;
  height: auto;
  box-sizing: border-box;
  width: 100%;
  &::-webkit-scrollbar {
    width: 5px;
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

export const CIPModalSubtitle = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const OtherPropetiesContent = styled(Box)`
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0])};
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  margin-top: 14px;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const OtherPropetiesDesc = styled(Typography)`
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600])} !important;
`;

export const CIPModalDesc = styled(Typography)`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.secondary.light};
  font-weight: 400;
  margin-bottom: 12px;
`;

export const CIPLabel = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BoxTooltip = styled(Box)(({ theme }) => ({
  maxHeight: "200px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    height: "3px",
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
}));

export const CIPPropertyTable = styled(Table)(({ theme }) => ({
  marginBottom: "30px",
  "& .table-wrapper": {
    padding: 0,
    border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    borderBottom: "0px",
    boxShadow: theme.shadow.card
  },
  "& td, th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    paddingTop: "18px",
    paddingBottom: "18px"
  },

  "& tr th:nth-child(4), & tr td:nth-child(4)": {
    borderLeft: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },

  "& tr th:nth-child(4), & tr th:nth-child(5), & tr th:nth-child(6), & tr td:nth-child(4), & tr td:nth-child(5), & tr td:nth-child(6) ":
    {
      backgroundColor: theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100]
    }
}));
