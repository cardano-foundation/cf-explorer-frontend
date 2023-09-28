import { Box, styled } from "@mui/material";

export const DetailHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px;
  width: 100%;
  margin-bottom: 16px;
`;

export const DetailContainer = styled(Box)<{ isMobile?: number }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ isMobile }) => (isMobile ? "0px" : "10px")};
`;

export const DetailContent = styled(Box)`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
`;

export const ContractSideViewContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ContractSideViewContent = styled(Box)`
  margin-top: 16px;
  flex: 1;
`;

export const ContractSideViewHeader = styled(Box)``;
