import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

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
  DataTitle,
  TxHash
} from "./styles";
import CustomTooltip from "../commons/CustomTooltip";

interface IContractDiagramProps {
  item: IContractItemTx;
  type?: "in" | "out";
  txHash?: string;
  handleClose?: () => void;
}

export const ContractDiagrams = ({ item, txHash, handleClose }: IContractDiagramProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const linkToPage = () => {
    if (txHash) return details.transaction(txHash);
    return item.address ? details.contract(item.address) : details.nativeScriptDetail(item.scriptHash);
  };

  return (
    <ContractDiagramsContainer isTxPageView={!!txHash}>
      <ContractHeader>
        <ContractText>{txHash ? t("glossary.transactions") : t("glossary.contract")}</ContractText>
        {handleClose ? (
          <CustomTooltip title={t("common.close")}>
            <CloseButton onClick={handleClose}>
              <CgClose color={theme.palette.secondary.light} />
            </CloseButton>
          </CustomTooltip>
        ) : null}
      </ContractHeader>
      <TxHash>
        <Link to={linkToPage()}>
          <ContractAddress data-testid={`contract-hash-${txHash || item.address || item.scriptHash}`}>
            {txHash || item.address || item.scriptHash}
          </ContractAddress>
        </Link>
      </TxHash>
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
      <ContractBytecode item={item} txHash={txHash} />

      {item.datumHashOut && (
        <>
          <IconContainer>
            <RedeemerArrowDownIcon />
          </IconContainer>
          <ContractDatumn key="out" item={item} type="out" txHash={txHash} />
        </>
      )}
    </ContractDiagramsContainer>
  );
};

export const ContractRedeemer = ({ item, txHash }: IContractDiagramProps) => {
  const { t } = useTranslation();
  return (
    <CardDiagram>
      <TabLabel>{t("glossary.redeemer")}</TabLabel>
      <TabElement flexDirection={!txHash ? "row" : "column"}>
        <TabItem>
          <TitleText>{t("common.tag")}</TitleText>
          <DataTitle data-testid={`contract-redeemer-tag-${item.address}`}>{item.purpose}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>{t("common.data")}</TitleText>
          <DataTitle data-testid={`contract-redeemer-data-${item.address}`}>{item.redeemerBytes}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>{t("common.mem")}</TitleText>
          <DataTitle data-testid={`contract-redeemer-mem-${item.address}`}>{item.redeemerMem}</DataTitle>
        </TabItem>
        <TabItem>
          <TitleText>{t("common.steps")}</TitleText>
          <DataTitle data-testid={`contract-redeemer-steps-${item.address}`}>{item.redeemerSteps}</DataTitle>
        </TabItem>
      </TabElement>
    </CardDiagram>
  );
};

export const ContractDatumn = ({ item, type, txHash }: IContractDiagramProps) => {
  const { t } = useTranslation();
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
        <DatumnText>{t("glossary.datumHash")}</DatumnText>
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
        <DatumnText>{t("glossary.datum")}</DatumnText>
        <DataTitle data-testid={`contract-datum-bytes-${item.address}`}>
          {isTypeIn ? item.datumBytesIn : item.datumBytesOut}
        </DataTitle>
      </DatumnItem>
    </DatumnElement>
  );
};

const ContractBytecode = ({ item }: IContractDiagramProps) => {
  const { t } = useTranslation();
  return (
    <CardDiagram>
      <TabLabel>{t("glassary.contractBytecode")}</TabLabel>
      <TabElement>{item.scriptBytes}</TabElement>
    </CardDiagram>
  );
};

export default ContractDiagrams;
