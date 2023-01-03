import React from "react";
import { Link, useParams } from "react-router-dom";
import { styled, Grid, Box, Autocomplete, Skeleton } from "@mui/material";
import { formatADA, formatPrice } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import CopyButton from "../../commons/CopyButton";
import styles from "./index.module.scss";
import infoIcon from "../../commons/resources/images/infoIcon.svg";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronDown } from "react-icons/bi";
import { AIcon } from "../../../commons/resources";
import { TextField } from "@mui/material";
import { EmptyIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";

const AddressHeader = () => {
  const { address } = useParams<{ address: string }>();
  const { data, loading } = useFetch<WalletAddress>(`/address/${address}`);
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(`/stakeKey/${address}`);

  const itemRight = [
    { title: "Transaction", value: data?.txCount || 0 },
    {
      title: "ADA Balance",
      value: (
        <>
          {formatADA(data?.balance || 0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </>
      ),
    },
    { title: "ADA Value", value: "NaN" },
    {
      value: (
        <Autocomplete
          options={data?.tokens || []}
          getOptionLabel={option => option.displayName}
          noOptionsText="No data found"
          renderOption={(props, option: WalletAddress["tokens"][number]) => (
            <li {...props}>
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
                width={"100%"}
                fontSize={"14px"}
                padding={1}
                paddingLeft={0}
              >
                <Box display="flex" alignItems={"center"}>
                  <Box width={50}>
                    <img src={AIcon} alt="a icon" />
                  </Box>
                  <Box textAlign={"left"} overflow={"hidden"} textOverflow={"ellipsis"}>
                    {option.displayName} #{option.name || option.fingerprint}
                  </Box>
                </Box>
                <Box fontWeight={"bold"}>{formatPrice(option.quantity || 0)}</Box>
              </Box>
            </li>
          )}
          renderInput={params => <StyledTextField {...params} placeholder="Search Token" />}
          popupIcon={<BiChevronDown />}
        />
      ),
    },
  ];
  const itemLeft = [
    {
      title: "Total Stake",
      value: (
        <>
          {formatADA(dataStake?.totalStake || 0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </>
      ),
    },
    {
      title: "POOL NAME",
      value: (
        <Link
          to={
            dataStake?.pool?.poolName ? routers.DELEGATION_POOL_DETAIL.replace(":poolId", dataStake.pool.poolId) : "#"
          }
          style={{ fontFamily: "var(--font-family-text)", color: "var(--color-blue)" }}
        >
          {dataStake?.pool?.poolName || ""}
        </Link>
      ),
    },
    {
      title: "Reward",
      value: (
        <>
          {formatADA(dataStake?.rewardAvailable || 0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </>
      ),
    },
  ];

  return (
    <Card title="Address Detail">
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
            <DetailCard
              title={"Wallet address"}
              type="left"
              address={data?.address || ""}
              item={itemRight}
              loading={loading}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
            <DetailCard
              title={"Stake address"}
              type="right"
              address={data?.stakeAddress || ""}
              item={itemLeft}
              loading={loading || loadingStake}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressHeader;

interface DetailCardProps {
  title: string;
  address: string;
  item: { title?: string; value: React.ReactNode }[];
  type: "left" | "right";
  loading: boolean;
}
const DetailCard: React.FC<DetailCardProps> = ({ title, address, item, type, loading }) => {
  if (loading) {
    return (
      <CardItem padding={0}>
        <Skeleton variant="rectangular" height={"100%"} width="100%" />
      </CardItem>
    );
  }
  if (type === "right" && !address) {
    return (
      <CardItem>
        <Box height={"100%"} display="flex" alignItems="center" justifyContent="center">
          <img alt="icon" src={EmptyIcon} />
        </Box>
      </CardItem>
    );
  }
  return (
    <CardItem padding={props => props.spacing(4)}>
      <Box className={styles.titleDetail}>{title}</Box>
      <Box className={styles.addressGroup}>
        <Link
          className={styles.address}
          to={
            type === "left"
              ? routers.ADDRESS_DETAIL.replace(":address", address)
              : routers.STAKE_DETAIL.replace(":stakeId", address)
          }
        >
          {address}
        </Link>
        <CopyButton text={address} />
      </Box>
      <Box>
        {item.map((item, index) => {
          return (
            <Box key={index} className={styles.itemDetail}>
              {item.title && (
                <Box className={styles.left}>
                  <img src={infoIcon} alt="info icon" />
                  <Box className={styles.title}>{item.title}:</Box>
                </Box>
              )}
              <Box className={styles.value} style={{ width: `${item.title ? "auto" : "100%"}` }}>
                {item.value}
              </Box>
            </Box>
          );
        })}
      </Box>
    </CardItem>
  );
};

const CardItem = styled(Box)(({ theme }) => ({
  background: "#fff",
  minHeight: 200,
  height: "100%",
  borderRadius: theme.borderRadius,
  overflow: "hidden",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
}));

const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    font-size: 14px;
  }
`;
