import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled, Container, Grid, Box, Select, MenuItem, Autocomplete } from "@mui/material";

import { formatADA, formatNumber, numberWithCommas } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import CopyButton from "../../components/commons/CopyButton";
import styles from "./index.module.scss";
import infoIcon from "../../commons/resources/images/infoIcon.svg";
import WalletAddressChart from "../../components/WalletAddressChart";
import useFetch from "../../commons/hooks/useFetch";
import { BiChevronDown } from "react-icons/bi";
import useFetchList from "../../commons/hooks/useFetchList";
import TransactionList from "../../components/TransactionLists";
import { AIcon } from "../../commons/resources";

import { parse } from "qs";
import { TextField } from "@mui/material";

const AddressWalletDetail = () => {
  const [selectedToken, setSelectedToken] = useState<WalletAddress["tokens"][number]>();
  const [analyticTime, setAnalyticTime] = useState("ONE_DAY");

  const { address } = useParams<{ address: string }>();

  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const {
    data: dataTx,
    initialized: initializedTx,
    loading: loadingTx,
    total,
    totalPage,
    currentPage,
    error: errorTx,
  } = useFetchList<Transactions>("tx/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
    address,
  });
  const { data, error, initialized, loading } = useFetch<WalletAddress>(`/address/${address}`);

  const {
    data: dataAnalyst,
    error: errorAnalyst,
    loading: loadingAnalyst,
  } = useFetch<WalletAddressAnalyst>(`/address/analytics/${address}/${analyticTime}`);

  const itemRight = [
    { title: "Transaction", value: data?.txCount || 0 },
    { title: "ADA Balance", value: formatADA(data?.balance || 0) },
    { title: "ADA Value", value: "NaN" },
    {
      value: (
        // <StyledSelect
        //   value={selectedToken}
        //   IconComponent={BiChevronDown}
        //   onChange={e => setSelectedToken(e.target.value as string)}
        //   placeholder="jiji"
        //   displayEmpty
        //   renderValue={() =>
        //     selectedToken !== "" ? selectedToken : <Box className={styles.placeholder}>Search Token</Box>
        //   }
        // >
        //   {data?.tokens.map((t, i) => (
        //     <MenuItem value={t.displayName || ""} key={i}>
        //       {t.displayName || ""}
        //     </MenuItem>
        //   ))}
        // </StyledSelect>
        <Autocomplete
          value={selectedToken}
          onChange={(event, newValue) => {
            setSelectedToken(newValue as WalletAddress["tokens"][number]);
          }}
          options={data?.tokens || []}
          getOptionLabel={option => option.displayName}
          renderOption={(props, option: WalletAddress["tokens"][number]) => (
            <li {...props}>
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
                width={"100%"}
                padding={1}
                paddingLeft={0}
              >
                <Box display="flex" alignItems={"center"}>
                  <Box width={50}>
                    <img src={AIcon} alt="a icon" />
                  </Box>
                  <Box>
                    {option.displayName} #{option.name}
                  </Box>
                </Box>
                <Box fontWeight={"bold"}>{numberWithCommas(option.quantity || 0)}</Box>
              </Box>
            </li>
          )}
          renderInput={params => <TextField {...params} placeholder="Search Token" />}
          // IconComponent={}
          popupIcon={<BiChevronDown />}
        />
      ),
    },
  ];
  const itemLeft = [
    { title: "Total Stake", value: "NaN" },
    { title: "POOL ID", value: "NaN" },
    { title: "Reward", value: "NaN" },
  ];

  return (
    <ContainerBox>
      <Card title="Address Detail">
        <Box>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
                <DetailCard title={"Wallet address"} type="left" address={data?.address || ""} item={itemRight} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
                <DetailCard title={"Stake address"} type="right" address={data?.stakeAddress || ""} item={itemLeft} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Box pt={5}>
        <WalletAddressChart
          setAnalyticTime={setAnalyticTime}
          analyticTime={analyticTime}
          loading={loadingAnalyst}
          data={dataFake["epochChart"] || null}
        />
      </Box>
      <Box>
        <TransactionList
          currentPage={currentPage}
          loading={loadingTx}
          initialized={initializedTx}
          transactions={dataTx}
          total={total}
          totalPage={totalPage}
          error={errorTx}
        />
      </Box>
    </ContainerBox>
  );
};
const dataFake: AnalyticsDelegators = {
  epochChart: {
    highest: 34142323532,
    lowest: 472464161,
    dataByDays: [
      {
        xchart: "77",
        ychart: 472464161,
      },
    ],
  },
  delegatorChart: {
    highest: 12,
    lowest: 1,
    dataByDays: [
      {
        xchart: "77",
        ychart: 1,
      },
    ],
  },
};
export default AddressWalletDetail;

interface DetailCardProps {
  title: string;
  address: string;
  item: { title?: string; value: React.ReactNode }[];
  type: "left" | "right";
}
const DetailCard: React.FC<DetailCardProps> = ({ title, address, item, type }) => {
  if (type === "right" && !address) {
    return <CardItem></CardItem>;
  }
  return (
    <CardItem>
      <Box className={styles.titleDetail}>{title}</Box>
      <Box className={styles.addressGroup}>
        <span className={styles.address}>{address} </span>
        <CopyButton />
      </Box>
      <Box>
        {item.map((i, ii) => {
          return (
            <Box key={ii} className={styles.itemDetail}>
              {i.title && (
                <Box className={styles.left}>
                  <img src={infoIcon} alt="info icon" />
                  <Box className={styles.title}>{i.title}:</Box>
                </Box>
              )}
              <Box className={styles.value} style={{ width: `${i.title ? "auto" : "100%"}` }}>
                {i.value}
              </Box>
            </Box>
          );
        })}
      </Box>
    </CardItem>
  );
};

const ContainerBox = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;

const CardItem = styled(Box)(({ theme }) => ({
  background: "#fff",
  minHeight: 200,
  height: "100%",
  borderRadius: theme.borderRadius,
  overflow: "hidden",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
  padding: theme.spacing(4),
}));
const StyledSelect = styled(Select)`
  min-width: 250px;
  width: 100%;
  text-align: left;
  font-family: var(--font-family-title);
  border: 2px solid #c8cdd8;
  background: transparent;
  color: #344054;
  border-radius: 8px;
  & > div {
    padding: 6.5px 12px;
    font-weight: var(--font-weight-bold);
    cursor: pointer;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: #344054;
    font-size: 20px;
  }
`;
