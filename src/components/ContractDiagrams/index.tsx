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
          <ContractAddress>{txHash || item.address || item.scriptHash}</ContractAddress>
        </Link>
      </ContractHeader>
      <ContractRedeemer item={item} txHash={txHash} />
      {item.datumHashIn && (
        <>
          <IconContainer>
            <RedeemerPlusIcon />
          </IconContainer>
          <ContractDatumn txHash={txHash} key="in" item={item} type="in" />
        </>
      )}
      <IconContainer>
        <RedeemerArrowDownIcon />
      </IconContainer>
      <ContractBytecode item={item} txHash={txHash} />

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
      <TabElement flexDirection={!txHash ? "row" : "column"} isContractPage={+!!txHash}>
        <TabItem>
          <TitleText>Tag</TitleText>
          <DataTitle color={({ palette }) => palette.grey[400]}>{item.purpose}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>Data</TitleText>
          <DataTitle color={({ palette }) => palette.grey[400]}>{item.redeemerBytes}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>Mem</TitleText>
          <DataTitle color={({ palette }) => palette.grey[400]}>{item.redeemerMem}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>Steps</TitleText>
          <DataTitle color={({ palette }) => palette.grey[400]}>{item.redeemerSteps}</DataTitle>
        </TabItem>
      </TabElement>
    </CardDiagram>
  );
};

export const ContractDatumn = ({ item, type, txHash }: IContractDiagramProps) => {
  const isTypeIn = type === "in";
  return (
    <DatumnElement isContractPage={+!!txHash}>
      <DatumnItem
        isTxHash={!!txHash}
        sx={{
          borderBottom: (props) => `1px solid ${props.palette.border.line}`,
          paddingBottom: "10px"
        }}
      >
        <DatumnText>Datum Hash</DatumnText>
        <DataTitle color={({ palette }) => palette.grey[400]}>
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
        <DataTitle color={({ palette }) => palette.grey[400]}>
          {isTypeIn ? item.datumBytesIn : item.datumBytesOut}
        </DataTitle>
      </DatumnItem>
    </DatumnElement>
  );
};

const ContractBytecode = ({ item, txHash }: IContractDiagramProps) => {
  return (
    <CardDiagram>
      <TabLabel>Contract Bytecode</TabLabel>
      <TabElement isContractPage={+!!txHash}>{item.scriptBytes}</TabElement>
    </CardDiagram>
  );
};

export default ContractDiagrams;
