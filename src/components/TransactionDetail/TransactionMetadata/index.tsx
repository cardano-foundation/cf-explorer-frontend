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
  GitCommitIcon,
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
import ContractsList from "src/components/Contracts";
import { CustomNumberBadge } from "src/components/commons/CustomNumberBadge";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";

import Collaterals from "./Collaterals";
import Delegations from "./Delegations";
import InstantaneousRewards from "./InstantaneousRewards";
import Metadata from "./Metadata";
import Minting from "./Minting";
import PoolCertificate from "./PoolCertificate";
import ProtocolUpdate from "./ProtocolUpdate";
import StakeCertificate from "./StakeCertificate";
import Summary from "./Summary";
import TransactionSignatories from "./TransactionSignatories";
import UTXO from "./UTXOs";
import Withdrawals from "./Withdrawals";
import "./index.css";
import { TitleTab } from "./styles";

interface TransactionMetadataProps {
  data: Transaction | null | undefined;
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
  const tabRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tabRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 0);
        tabRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
    tabRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    history.replace(details.transaction(data?.tx?.hash, newExpanded ? panel : ""));
  };

  const protocolsMergeData: TProtocolMerge[] = useMemo(() => {
    const result = [];
    const protocols = data?.protocols;
    const previousProtocols = data?.previousProtocols;
    for (const [key, value] of Object.entries(protocols || {})) {
      if (previousProtocols) {
        const oldValue = previousProtocols[key as keyof TProtocol];
        const pItem: TProtocolMerge = {
          protocol: key,
          oldValue,
          value
        };
        result.push(pItem);
      }
    }
    return result;
  }, [data?.protocols, data?.previousProtocols]);
  const _dataProposing = data?.contracts?.map((item) => ({
    ...item,
    purpose: "PROPOSING",
    governanceAction: "Treasury Withdrawal",
    submissionDate: "03/19/2024 15:40:11",
    expireDate: "04/19/2024 15:40:11",
    proposalPolicy: "1234567443445141436541256435236342",
    governanceActionMetadata: "1111111111111111111111111111111111",
    voterType: "DRep",
    vote: "YES",
    dRepId: "12345678901234567890123456789012345678912551324456932154",
    proposalLink: "https://hornan7.github.io/proposal.txt"
  }));
  const _dataVoting = data?.contracts?.map((item) => ({
    ...item,
    purpose: "VOTING",
    governanceAction: "Treasury Withdrawal",
    submissionDate: "03/19/2024 15:40:11",
    expireDate: "04/19/2024 15:40:11",
    proposalPolicy: "1234567443445141436541256435236342",
    governanceActionMetadata: "1111111111111111111111111111111111",
    voterType: "DRep",
    vote: "YES",
    dRepId: "312413245213123456789012345678901234567890123456789125513244569321543332143543535345"
  }));
  const _data = _dataProposing?.concat(_dataVoting);
  const dataContract = _data?.concat(data?.contracts);

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
      label: (
        <Box display={"flex"} alignItems={"center"} data-testid="contract-tab">
          {t("glossary.contracts")}
          <CustomNumberBadge value={dataContract?.length} />
        </Box>
      ),
      children: <ContractsList data={dataContract} />
    },
    {
      key: "collaterals",
      icon: CollateralIcon,
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("glossary.collateral")}
          <CustomNumberBadge
            value={
              data?.collaterals?.collateralInputResponses?.length ===
              data?.collaterals?.collateralOutputResponses?.length
                ? 1
                : data?.collaterals?.collateralInputResponses?.length
            }
          />
        </Box>
      ),
      children: <Collaterals data={data?.collaterals} />
    },
    {
      key: "notes",
      icon: NoteIcon,
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("tab.notes")}
          <CustomNumberBadge value={data?.notes?.length} />
        </Box>
      ),
      children: ""
    },
    {
      key: "withdrawals",
      icon: WithdrawalIcon,
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("tab.withdrawal")}
          <CustomNumberBadge value={data?.withdrawals?.length} />
        </Box>
      ),
      children: <Withdrawals data={data?.withdrawals} />
    },
    {
      key: "delegations",
      icon: TransactionDelegationIcon,
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("tab.delegations")}
          <CustomNumberBadge value={data?.delegations?.length} />
        </Box>
      ),
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
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("tab.poolCertificates")}
          <CustomNumberBadge value={data?.poolCertificates?.length} />
        </Box>
      ),
      children: <PoolCertificate data={data?.poolCertificates} />
    },
    {
      key: "stakeCertificates",
      icon: StakeCertificates,
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("tab.stakeCertificates")}
          <CustomNumberBadge value={data?.stakeCertificates?.length} />
        </Box>
      ),
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
      label: (
        <Box display={"flex"} alignItems={"center"}>
          {t("glossary.instantaneousRewards")}
          <CustomNumberBadge value={data?.instantaneousRewards?.length} />
        </Box>
      ),
      children: <InstantaneousRewards data={data?.instantaneousRewards} />
    },
    {
      key: "signersInformation",
      icon: GitCommitIcon,
      label: t("tab.signersInformation"),
      children: <TransactionSignatories data={data?.signersInformation} />
    },
    {
      key: "metadata",
      icon: MetadataIconTx,
      label: <Box data-testid="metadata-tab">{t("glossary.metadata")}</Box>,
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
        <StyledAccordion
          key={key}
          expanded={tabActive === key}
          customborderradius={needBorderRadius(key)}
          isdisplaybordertop={tabActive !== key && key !== items[0].key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
        >
          <AccordionSummary
            data-testid={`transactionMetadata.${key}`}
            expandIcon={
              <IoIosArrowDown
                style={{
                  width: "21px",
                  height: "21px"
                }}
                color={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light}
              />
            }
            sx={{
              paddingX: theme.spacing(3),
              paddingY: theme.spacing(1)
            }}
          >
            {" "}
            <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light} />
            <TitleTab data-testid={`transactionMetadata.${key}Title`} pl={1} active={+(key === tabActive)}>
              {label}
            </TitleTab>
          </AccordionSummary>
          <AccordionDetails data-testid={`transactionMetadata.${key}Value`}>{children}</AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default TransactionMetadata;
