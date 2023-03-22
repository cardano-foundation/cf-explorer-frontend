import React from "react";
import { Tab, Box, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./index.css";
import UTXO from "./UTXOs";
import Summary from "./Summary";
import Contracts from "./Contracts";
import Collaterals from "./Collaterals";
import Withdrawals from "./Withdrawals";
import Delegations from "./Delegations";
import Minting from "./Minting";
import { ReactComponent as SummaryIcon } from "../../../commons/resources/images/summaryIcon.svg";
import { ReactComponent as UtxoIcon } from "../../../commons/resources/images/utxoIcon.svg";
import { ReactComponent as ContractIcon } from "../../../commons/resources/images/contractIcon.svg";
import { ReactComponent as CollateralIcon } from "../../../commons/resources/images/collateralIcon.svg";
import { ReactComponent as NoteIcon } from "../../../commons/resources/images/noteIcon.svg";
import { ReactComponent as WithdrawalIcon } from "../../../commons/resources/images/WithdrawalIcon.svg";
import { ReactComponent as MintingIcon } from "../../../commons/resources/images/mintingIcon.svg";
import { ReactComponent as DelegationIcon } from "../../../commons/resources/images/DelegationIcon.svg";
import { useHistory, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";
import { Title } from "./styles";

interface TransactionMetadataProps {
  data: Transaction | null;
  loading: boolean;
}

const TransactionMetadata: React.FC<TransactionMetadataProps> = ({ data, loading }) => {
  let { tabActive = "summary" } = useParams<{ tabActive: keyof Transaction }>();
  const history = useHistory();
  const theme = useTheme();

  if (!data?.[tabActive]) tabActive = "summary";

  const handleChange = (event: React.SyntheticEvent, tab: keyof Transaction) => {
    history.push(details.transaction(data?.tx?.hash, tab));
  };

  const tabs: { label: React.ReactNode; key: keyof Transaction; children: React.ReactNode }[] = [
    {
      label: (
        <Title active={tabActive === "summary" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <SummaryIcon fill={tabActive === "summary" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}>Summary</Box>
          </Box>
        </Title>
      ),
      key: "summary",
      children: <Summary data={data?.summary || null} />,
    },
    {
      label: (
        <Title active={tabActive === "utxOs" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <UtxoIcon fill={tabActive === "utxOs" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}> UTXOs</Box>
          </Box>
        </Title>
      ),
      key: "utxOs",
      children: <UTXO data={data?.utxOs || null} fee={data?.tx.fee || 0} />,
    },
    {
      label: (
        <Title active={tabActive === "contracts" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <ContractIcon fill={tabActive === "contracts" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}> Contracts({data?.contracts?.length || 0})</Box>
          </Box>
        </Title>
      ),
      key: "contracts",
      children: <Contracts data={data?.contracts || null} />,
    },
    {
      label: (
        <Title active={tabActive === "collaterals" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <CollateralIcon fill={tabActive === "collaterals" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}> Collaterals({data?.collaterals?.length || 0})</Box>
          </Box>
        </Title>
      ),
      key: "collaterals",
      children: <Collaterals data={data?.collaterals || null} />,
    },
    {
      label: (
        <Title active={tabActive === "notes" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <NoteIcon fill={tabActive === "notes" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}> Notes({data?.notes?.length || 0})</Box>
          </Box>
        </Title>
      ),
      key: "notes",
      children: "",
    },
    {
      label: (
        <Title active={tabActive === "withdrawals" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <WithdrawalIcon fill={tabActive === "withdrawals" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}>Withdrawals({data?.withdrawals?.length || 0})</Box>
          </Box>
        </Title>
      ),
      key: "withdrawals",
      children: <Withdrawals data={data?.withdrawals || null} />,
    },
    {
      label: (
        <Title active={tabActive === "delegations" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <DelegationIcon fill={tabActive === "delegations" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}> Delegations({data?.delegations?.length || 0})</Box>
          </Box>
        </Title>
      ),
      key: "delegations",
      children: <Delegations data={data?.delegations || null} />,
    },
    {
      label: (
        <Title active={tabActive === "mints" ? 1 : 0}>
          <Box display={"flex"} alignItems="center">
            <MintingIcon fill={tabActive === "mints" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}>Minting</Box>
          </Box>
        </Title>
      ),
      key: "mints",
      children: <Minting data={data?.mints || null} />,
    },
  ];

  const items = tabs.filter(item => data?.[item.key]);

  return (
    <>
      <TabContext value={tabActive}>
        <Box paddingX={3}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { background: theme => theme.palette.primary.main, color: theme => theme.palette.primary.main },
            }}
          >
            {items?.map(item => (
              <Tab key={item.key} label={item.label} value={item.key} />
            ))}
          </TabList>
        </Box>
        {items.map(item => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0, paddingTop: 12 }}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
};

export default TransactionMetadata;
