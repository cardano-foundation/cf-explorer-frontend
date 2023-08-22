import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, useTheme } from "@mui/material";
import React, { useMemo, useRef } from "react";
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
import { TitleTab } from "./styles";

interface TransactionMetadataProps {
  data: Transaction | null;
  loading: boolean;
}

const TransactionMetadata: React.FC<TransactionMetadataProps> = ({ data }) => {
  let { tabActive = "summary" } = useParams<{ tabActive: keyof Transaction }>();
  const history = useHistory();
  const theme = useTheme();
  const tabRef = useRef(null);
  if (!data?.[tabActive]) tabActive = "summary";

  const handleChange = (event: React.SyntheticEvent, tab: keyof Transaction) => {
    (tabRef as any)?.current.scrollIntoView();
    history.replace(details.transaction(data?.tx?.hash, tab));
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

  const tabs: {
    key: keyof Transaction;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    children: React.ReactNode;
  }[] = [
    {
      key: "summary",
      icon: SummaryIcon,
      label: "Summary",
      children: <Summary data={data?.summary || null} isFailed={data?.tx.status === TRANSACTION_STATUS.FAILED} />
    },
    {
      key: "utxOs",
      icon: UtxoIcon,
      label: "UTXOs",
      children: (
        <UTXO data={data?.utxOs} fee={data?.tx.fee || 0} isFailed={data?.tx.status === TRANSACTION_STATUS.FAILED} />
      )
    },
    {
      key: "contracts",
      icon: ContractIcon,
      label: `Contracts(${data?.contracts?.length || 0})`,
      children: <Contracts data={data?.contracts} />
    },
    {
      key: "collaterals",
      icon: CollateralIcon,
      label: `Collateral(${
        data?.collaterals?.collateralInputResponses?.length === data?.collaterals?.collateralOutputResponses?.length
          ? 1
          : data?.collaterals?.collateralInputResponses?.length
      })`,
      children: <Collaterals data={data?.collaterals} />
    },
    {
      key: "notes",
      icon: NoteIcon,
      label: `Notes(${data?.notes?.length || 0})`,
      children: ""
    },
    {
      key: "withdrawals",
      icon: WithdrawalIcon,
      label: `Withdrawal(${data?.withdrawals?.length || 0})`,
      children: <Withdrawals data={data?.withdrawals} />
    },
    {
      key: "delegations",
      icon: TransactionDelegationIcon,
      label: `Delegations(${data?.delegations?.length || 0})`,
      children: <Delegations data={data?.delegations} />
    },
    {
      key: "mints",
      icon: MintingIcon,
      label: "Minting",
      children: <Minting data={data?.mints} />
    },
    {
      key: "poolCertificates",
      icon: RewardsDistributionIcon,
      label: `Pool certificates (${data?.poolCertificates?.length || 0})`,
      children: <PoolCertificate data={data?.poolCertificates} />
    },
    {
      key: "stakeCertificates",
      icon: StakeCertificates,
      label: `Stake Certificates (${data?.stakeCertificates?.length || 0})`,
      children: <StakeCertificate data={data?.stakeCertificates} />
    },
    {
      key: "protocols",
      icon: ProtocolUpdateIcon,
      label: "Protocol Update",
      children: <ProtocolUpdate data={protocolsMergeData} />
    },
    {
      key: "instantaneousRewards",
      icon: InstantaneousHistoryIcon,
      label: `Instantaneous Rewards (${data?.instantaneousRewards?.length || 0})`,
      children: <InstantaneousRewards data={data?.instantaneousRewards} />
    },
    {
      key: "metadata",
      icon: MetadataIconTx,
      label: `Metadata`,
      children: <Metadata data={data?.metadata} hash={data?.metadataHash} />
    }
  ];

  const items = tabs.filter((item) => data?.[item.key]);

  return (
    <Box mt={4} ref={tabRef}>
      <TabContext value={tabActive}>
        <Box sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary[200]}` }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { background: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.main }
            }}
            variant="scrollable"
            scrollButtons={false}
          >
            {items?.map(({ key, icon: Icon, label }) => (
              <Tab
                key={key}
                value={key}
                data-testid={`tab-${key}`}
                style={{ padding: "12px 0px", marginRight: 40 }}
                label={
                  <Box display={"flex"} alignItems="center">
                    <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light} />
                    <TitleTab pl={1} active={+(key === tabActive)}>
                      {label}
                    </TitleTab>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {items.map((item) => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0, paddingTop: 12 }}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TransactionMetadata;
