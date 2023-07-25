import { styled, Box, Typography, IconButton } from "@mui/material";

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
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: self-end;
`;

export const ContractAddress = styled(Box)`
  color: ${(props) => props.theme.palette.blue[400]};
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
  background: ${(props) => props.theme.palette.common.black};
  position: absolute;
  left: 20px;
  top: -25px;
`;

export const CardDiagram = styled(Box)`
  position: relative;
  margin-top: 50px;
`;

export const TabElement = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px 50px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    gap: 10px 20px;
  }
  word-break: break-word;
  padding: 18px 20px;
  border-radius: 5px;
  text-align: left;
  background: ${(props) => props.theme.palette.grey[80]};
  color: ${(props) => props.theme.palette.common.black};
  text-align: left;
  max-height: 150px;
  overflow: scroll;
  font-size: 14px;
`;

export const TabItem = styled(Box)`
  display: flex;
  text-align: left;
`;

export const TitleText = styled(Typography)`
  display: inline;
  color: ${(props) => props.theme.palette.grey[300]};
  margin-right: 10px;
  min-width: 36px;
  font-size: 14px;
`;

export const DataTitle = styled(Typography)`
  font-size: 14px;
`;
export const DatumnElement = styled(Box)`
  background: ${(props) => props.theme.palette.grey[80]};
  color: ${(props) => props.theme.palette.common.black};
  word-break: break-word;
  text-align: left;
  padding: 18px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
`;

export const DatumnItem = styled(Box)<{ isTxHash?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isTxHash ? `column` : `row`)};
  gap: ${(props) => (props.isTxHash ? `10px` : `50px`)};
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

export const CloseButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.hint};
  padding: 5.5px;
`;
