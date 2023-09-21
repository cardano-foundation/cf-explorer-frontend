import { Box, useTheme } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";

import {
  CollateralIcon,
  ContractIcon,
  InstantaneousHistoryIcon,
  MetadataIconTx,
  MintingIcon,
  NoteIcon,
  ProtocolUpdateIcon,
  RewardsDistributionIcon,
  StakeCertificates,
  SummaryIcon,
  TransactionDelegationIcon,
  UtxoIcon,
  WithdrawalIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { TRANSACTION_STATUS } from "src/commons/utils/constants";

import Collaterals from "./Collaterals";
import Contracts from "./Contracts";
import Delegations from "./Delegations";
import InstantaneousRewards from "./InstantaneousRewards";
import Metadata from "./Metadata";
import Minting from "./Minting";
import PoolCertificate from "./PoolCertificate";
import ProtocolUpdate from "./ProtocolUpdate";
import StakeCertificate from "./StakeCertificate";
import Summary from "./Summary";
import UTXO from "./UTXOs";
import Withdrawals from "./Withdrawals";
import "./index.css";
import { CustomAccordion, TitleTab } from "./styles";

interface TransactionMetadataProps {
  data: Transaction | null;
  loading: boolean;
}

interface TTab {
  key: keyof Transaction;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  children: React.ReactNode;
}

const TransactionMetadata: React.FC<TransactionMetadataProps> = ({ data }) => {
  const { t } = useTranslation();
  const { tabActive = false } = useParams<{ tabActive: keyof Transaction }>();
  const history = useHistory();
  const theme = useTheme();
  const tabRef = useRef(null);

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    (tabRef as any)?.current.scrollIntoView();
    history.replace(details.transaction(data?.tx?.hash, newExpanded ? panel : ""));
  };

  const protocolsMergeData: TProtocolMerge[] = useMemo(() => {
    const result = [];
    const protocols = data?.protocols;
    const previousProtocols: any = data?.previousProtocols;
    for (const [key, value] of Object.entries(protocols || {})) {
      const oldValue = previousProtocols[key];
      const pItem: TProtocolMerge = {
        protocol: key,
        oldValue,
        value
      };
      result.push(pItem);
    }
    return result;
  }, [data?.protocols, data?.previousProtocols]);

  const tabs: TTab[] = [
    {
      key: "summary",
      icon: SummaryIcon,
      label: <Box pl={"5px"}>{t("drawer.summary")}</Box>,
      children: <Summary data={data?.summary || null} isFailed={data?.tx.status === TRANSACTION_STATUS.FAILED} />
    },
    {
      key: "utxOs",
      icon: UtxoIcon,
      label: t("tab.utxos"),
      children: (
        <UTXO data={data?.utxOs} fee={data?.tx.fee || 0} isFailed={data?.tx.status === TRANSACTION_STATUS.FAILED} />
      )
    },
    {
      key: "contracts",
      icon: ContractIcon,
      label: `${t("glossary.contracts")}(${data?.contracts?.length || 0})`,
      children: <Contracts data={data?.contracts} />
    },
    {
      key: "collaterals",
      icon: CollateralIcon,
      label: `${t("glossary.collateral")}(${
        data?.collaterals?.collateralInputResponses?.length === data?.collaterals?.collateralOutputResponses?.length
          ? 1
          : data?.collaterals?.collateralInputResponses?.length
      })`,
      children: <Collaterals data={data?.collaterals} />
    },
    {
      key: "notes",
      icon: NoteIcon,
      label: `${t("tab.notes")}(${data?.notes?.length || 0})`,
      children: ""
    },
    {
      key: "withdrawals",
      icon: WithdrawalIcon,
      label: `${t("tab.withdrawal")}(${data?.withdrawals?.length || 0})`,
      children: <Withdrawals data={data?.withdrawals} />
    },
    {
      key: "delegations",
      icon: TransactionDelegationIcon,
      label: `${t("tab.delegations")}(${data?.delegations?.length || 0})`,
      children: <Delegations data={data?.delegations} />
    },
    {
      key: "mints",
      icon: MintingIcon,
      label: <Box pl={"1px"}>{t("tab.minting")}</Box>,
      children: <Minting data={data?.mints} />
    },
    {
      key: "poolCertificates",
      icon: RewardsDistributionIcon,
      label: `${t("tab.poolCertificates")} (${data?.poolCertificates?.length || 0})`,
      children: <PoolCertificate data={data?.poolCertificates} />
    },
    {
      key: "stakeCertificates",
      icon: StakeCertificates,
      label: `${t("tab.stakeCertificates")} (${data?.stakeCertificates?.length || 0})`,
      children: <StakeCertificate data={data?.stakeCertificates} />
    },
    {
      key: "protocols",
      icon: ProtocolUpdateIcon,
      label: t("tab.protocolUpdate"),
      children: <ProtocolUpdate data={protocolsMergeData} />
    },
    {
      key: "instantaneousRewards",
      icon: InstantaneousHistoryIcon,
      label: `${t("glossary.instantaneousRewards")} (${data?.instantaneousRewards?.length || 0})`,
      children: <InstantaneousRewards data={data?.instantaneousRewards} />
    },
    {
      key: "metadata",
      icon: MetadataIconTx,
      label: t("glossary.metadata"),
      children: <Metadata data={data?.metadata} hash={data?.metadataHash} />
    }
  ];

  const items = tabs.filter((item) => data?.[item.key]);
  const indexExpand = items.findIndex((item) => item.key === tabActive);

  const needBorderRadius = (currentKey: string) => {
    if (!tabActive) return "0";
    const indexCurrent = items.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < items.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  return (
    <Box mt={4} ref={tabRef}>
      {items?.map(({ key, icon: Icon, label, children }, index) => (
        <CustomAccordion
          key={key}
          expanded={tabActive === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tabActive !== key && key !== items[0].key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
        >
          <AccordionSummary
            expandIcon={
              <IoIosArrowDown
                style={{
                  width: "21px",
                  height: "21px"
                }}
                color={key === tabActive ? theme.palette.primary.main : theme.palette.secondary[600]}
              />
            }
            sx={{
              paddingX: theme.spacing(3),
              paddingY: theme.spacing(1)
            }}
          >
            {" "}
            <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary[600]} />
            <TitleTab pl={1} active={+(key === tabActive)}>
              {label}
            </TitleTab>
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </CustomAccordion>
      ))}
    </Box>
  );
};

export default TransactionMetadata;
