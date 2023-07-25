import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";

import { RedeemerArrowDownIcon, RedeemerPlusIcon } from "src/commons/resources";
import { details } from "src/commons/routers";

import {
  ContractAddress,
  ContractDiagramsContainer,
  ContractHeader,
  ContractText,
  TabLabel,
  TabElement,
  TitleText,
  TabItem,
  CardDiagram,
  DatumnElement,
  DatumnText,
  DatumnItem,
  IconContainer,
  CloseButton,
  DataTitle
} from "./styles";
import CustomTooltip from "../commons/CustomTooltip";

interface IContractDiagramProps {
  item: IContractItemTx;
  type?: "in" | "out";
  txHash?: string;
  handleClose?: () => void;
}

export const ContractDiagrams = ({ item, txHash, handleClose }: IContractDiagramProps) => {
  const linkToPage = () => {
    if (txHash) return details.transaction(txHash);
    return item.address ? details.contract(item.address) : details.policyDetail(item.scriptHash);
  };

  return (
    <ContractDiagramsContainer isTxPageView={!!txHash}>
      <ContractHeader>
        <ContractText>
          {txHash ? "Transactions" : "Contract"}
          {handleClose ? (
            <CustomTooltip title="Close">
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
          ) : null}
        </ContractText>
        <Link to={linkToPage()}>
          <ContractAddress data-testid={`contract-hash-${txHash || item.address || item.scriptHash}`}>
            {txHash || item.address || item.scriptHash}
          </ContractAddress>
        </Link>
      </ContractHeader>
      <ContractRedeemer item={item} txHash={txHash} />
      {item.datumHashIn && (
        <>
          <IconContainer>
            <RedeemerPlusIcon />
          </IconContainer>
          <ContractDatumn key="in" item={item} type="in" txHash={txHash} />
        </>
      )}
      <IconContainer>
        <RedeemerArrowDownIcon />
      </IconContainer>
      <ContractBytecode item={item} />

      {item.datumHashOut && (
        <>
          <IconContainer>
            <RedeemerArrowDownIcon />
          </IconContainer>
          <ContractDatumn key="out" item={item} type="out" />
        </>
      )}
    </ContractDiagramsContainer>
  );
};

export const ContractRedeemer = ({ item, txHash }: IContractDiagramProps) => {
  return (
    <CardDiagram>
      <TabLabel>Redeemer</TabLabel>
      <TabElement flexDirection={!txHash ? "row" : "column"}>
        <TabItem>
          <TitleText>Tag</TitleText>
          <DataTitle data-testid={`contract-redeemer-tag-${item.address}`}>{item.purpose}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>Data</TitleText>
          <DataTitle data-testid={`contract-redeemer-data-${item.address}`}>{item.redeemerBytes}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>Mem</TitleText>
          <DataTitle data-testid={`contract-redeemer-mem-${item.address}`}>{item.redeemerMem}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>Steps</TitleText>
          <DataTitle data-testid={`contract-redeemer-steps-${item.address}`}>{item.redeemerSteps}</DataTitle>
        </TabItem>
      </TabElement>
    </CardDiagram>
  );
};

export const ContractDatumn = ({ item, type, txHash }: IContractDiagramProps) => {
  const isTypeIn = type === "in";
  return (
    <DatumnElement>
      <DatumnItem
        isTxHash={!!txHash}
        sx={{
          borderBottom: (props) => `1px solid ${props.palette.border.line}`,
          paddingBottom: "10px"
        }}
      >
        <DatumnText>Datum Hash</DatumnText>
        <DataTitle data-testid={`contract-datum-hash-${item.address}`}>
          {isTypeIn ? item.datumHashIn : item.datumHashOut}
        </DataTitle>
      </DatumnItem>
      <DatumnItem
        isTxHash={!!txHash}
        sx={{
          paddingTop: "10px"
        }}
      >
        <DatumnText>Datum</DatumnText>
        <DataTitle data-testid={`contract-datum-bytes-${item.address}`}>
          {isTypeIn ? item.datumBytesIn : item.datumBytesOut}
        </DataTitle>
      </DatumnItem>
    </DatumnElement>
  );
};

const ContractBytecode = ({ item }: IContractDiagramProps) => {
  return (
    <CardDiagram>
      <TabLabel>Contract Bytecode</TabLabel>
      <TabElement>{item.scriptBytes}</TabElement>
    </CardDiagram>
  );
};

export default ContractDiagrams;
