import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
  IconContainer
} from "./styles";

interface IContractDiagramProps {
  item: IContractItemTx;
  type?: "in" | "out";
  txHash?: string;
}

export const ContractDiagrams = ({ item, txHash }: IContractDiagramProps) => {
  const linkToPage = () => {
    if (txHash) return details.transaction(txHash);
    return item.address ? details.contract(item.address) : details.policyDetail(item.scriptHash);
  };

  return (
    <ContractDiagramsContainer isTxPageView={!!txHash}>
      <ContractHeader>
        <ContractText>{txHash ? "Transactions" : "Contract"}</ContractText>
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
      <TabElement flexDirection={!txHash ? "row" : "column"}>
        <TabItem>
          <TitleText>Tag</TitleText>
          <Typography color={({ palette }) => palette.grey[400]} component={"span"}>
            {item.purpose}
          </Typography>
        </TabItem>
        <TabItem>
          <TitleText>Data</TitleText>
          <Typography color={({ palette }) => palette.grey[400]} component={"span"}>
            {item.redeemerBytes}
          </Typography>
        </TabItem>
        <TabItem>
          <TitleText>Mem</TitleText>
          <Typography color={({ palette }) => palette.grey[400]} component={"span"}>
            {item.redeemerMem}
          </Typography>
        </TabItem>
        <TabItem>
          <TitleText>Steps</TitleText>
          <Typography color={({ palette }) => palette.grey[400]} component={"span"}>
            {item.redeemerSteps}
          </Typography>
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
        sx={{
          borderBottom: (props) => `1px solid ${props.palette.border.line}`,
          paddingBottom: "10px"
        }}
      >
        <DatumnText>Datum Hash</DatumnText>
        <Typography color={({ palette }) => palette.grey[400]} component={"span"}>
          {isTypeIn ? item.datumHashIn : item.datumHashOut}
        </Typography>
      </DatumnItem>
      <DatumnItem
        sx={{
          paddingTop: "10px"
        }}
      >
        <DatumnText>Datum</DatumnText>
        <Typography color={({ palette }) => palette.grey[400]} component={"span"}>
          {isTypeIn ? item.datumHashIn : item.datumBytesOut}
        </Typography>
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
