import { styled, Box, Typography } from "@mui/material";

export const ContractDiagramsContainer = styled(Box)<{ isTxPageView?: boolean }>`
  background: ${(props) => (props.isTxPageView ? "inherit" : props.theme.palette.background.paper)};
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export const ContractHeader = styled(Box)`
  text-align: left;
`;

export const ContractText = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
`;

export const ContractAddress = styled(Box)`
  color: ${(props) => props.theme.palette.blue[100]};
  font-size: 14px;
  font-weight: 400;
  padding-top: 10px;
  word-break: break-all;
`;

export const TabLabel = styled(Typography)`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.common.white};
  padding: 7px 11px;
  border-radius: 5px;
  background: ${(props) => props.theme.palette.grey[400]};
  position: absolute;
  left: 20px;
  top: -25px;
`;

export const CardDiagram = styled(Box)`
  position: relative;
  margin-top: 50px;
`;

export const TabElement = styled(Box)<{ isContractPage?: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  word-break: break-word;
  padding: 18px 20px;
  border-radius: 5px;
  background: ${({ isContractPage, theme }) => (isContractPage ? theme.palette.common.white : theme.palette.grey[500])};
  color: ${(props) => props.theme.palette.grey[400]};
`;

export const TabItem = styled(Box)`
  display: flex;
  text-align: left;
`;

export const TitleText = styled(Typography)`
  display: inline;
  color: ${(props) => props.theme.palette.grey[300]};
  margin-right: 10px;
  min-width: 50px;
`;

export const DatumnElement = styled(Box)<{ isContractPage?: number }>`
  background: ${({ isContractPage, theme }) => (isContractPage ? theme.palette.common.white : theme.palette.grey[500])};
  color: ${(props) => props.theme.palette.common.black};
  word-break: break-word;
  text-align: left;
  padding: 18px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
`;

export const DatumnItem = styled(Box)`
  display: flex;
  gap: 50px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    gap: 20px;
  }
`;

export const DatumnText = styled(TitleText)`
  text-align: left;
  min-width: 100px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-width: 50px;
  }
`;

export const IconContainer = styled(Box)`
  display: flex;
  margin: 20px 50px;
`;
