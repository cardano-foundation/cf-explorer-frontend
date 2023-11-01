import { Box, Modal, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Container = styled(Box);

export const ModalTitle = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const ModalContainer = styled(Box)`
  width: min(100%, 810px);
`;

export const ModalContent = styled(Box)``;

export const RewardBalanceHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const RewardBalanceTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: ${({ theme }) => theme.palette.secondary.main};
  width: min-content;
`;

export const RewardBalance = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  gap: 5px;
`;

export const TotalTransaction = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 112, 133, 1);
`;

export const AmountADARow = styled(Typography)<{ amount: string }>`
  font-size: 14px;
  color: ${({ amount, theme }) =>
    +amount > 0 ? (theme.isDark ? theme.palette.success[700] : theme.palette.success[800]) : theme.palette.error[700]};
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const EpochRow = styled(Link)`
  font-size: 14px !important;
  color: ${({ theme }) => theme.palette.primary.main} !important;
`;

export const TableContainer = styled(Box)`
  overflow: auto;
  margin-top: 16px;
`;

export const CustomModal = styled(Modal)`
  width: 100%;
  max-width: 810px;
`;
