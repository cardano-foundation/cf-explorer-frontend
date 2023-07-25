import { Box, Modal, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Container = styled(Box);

export const ModalTitle = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: rgba(19, 21, 47, 1);
`;

export const ModalContainer = styled(Box)`
  width: min(100%, 810px);
`;

export const ModalContent = styled(Box)``;

export const RewardBalanceHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const RewardBalanceTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
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

export const AmountADARow = styled(Typography)`
  font-size: 14px;
  color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const EpochRow = styled(Link)`
  font-size: 14px !important;
  color: ${({ theme }) => theme.palette.blue[800]} !important;
`;

export const TableContainer = styled(Box)`
  overflow: auto;
  margin-top: 16px;
`;

export const CustomModal = styled(Modal)`
  width: 100%;
  max-width: 810px;
`;
