import { Link } from "react-router-dom";
import { Grid, Box, Autocomplete } from "@mui/material";
import {
  exchangeADAToUSD,
  formatADAFull,
  formatPrice,
  getShortWallet,
  numberWithCommas,
} from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronDown } from "react-icons/bi";
import { AIcon } from "../../../commons/resources";
import CardAddress from "../../share/CardAddress";
import { details } from "../../../commons/routers";
import { StyledTextField, WrapPaperDropdown } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { useEffect, useState } from "react";
import { API } from "../../../commons/utils/api";
import BookmarkButton from "../../commons/BookmarkIcon";
import { EmptyIcon } from "../../../commons/resources";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
}
const AddressHeader: React.FC<Props> = ({ data, loading }) => {
  const [stakeKey, setStakeKey] = useState("");
  const [selected, setSelected] = useState("");
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(
    stakeKey ? `${API.STAKE.DETAIL}/${stakeKey}` : ""
  );
  const { adaRate } = useSelector(({ system }: RootState) => system);

  useEffect(() => {
    setStakeKey(data?.stakeAddress || "");
  }, [data]);

  const itemLeft = [
    { title: "Transaction", value: data?.txCount || 0 },
    {
      title: "ADA Balance",
      value: (
        <Box display="flex" alignItems="center">
          {formatADAFull(data?.balance)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </Box>
      ),
    },
    {
      title: "ADA Value",
      value: <Box>$ {exchangeADAToUSD(data?.balance || 0, adaRate, true)}</Box>,
    },
    {
      value: (
        <Autocomplete
          options={data?.tokens || []}
          componentsProps={{ paper: { elevation: 2 } }}
          getOptionLabel={option => option.displayName || option.name || option.fingerprint}
          noOptionsText={
            <Box>
              <Box maxHeight="200px" component={"img"} src={EmptyIcon}></Box>
            </Box>
          }
          onChange={(e, value) => {
            setSelected(value?.fingerprint || "");
          }}
          renderOption={(props, option: WalletAddress["tokens"][number]) => (
            <li
              {...props}
              key={option.fingerprint}
              style={{ background: selected === option.fingerprint ? "rgba(67, 143, 104, 0.1)" : "#fff" }}
            >
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
                  <Box textAlign={"left"} overflow={"hidden"} textOverflow={"ellipsis"} maxWidth="200px">
                    {option.displayName} #{option.name || option.fingerprint}
                  </Box>
                </Box>
                <Box fontWeight={"bold"}>{numberWithCommas(option.quantity)}</Box>
              </Box>
            </li>
          )}
          renderInput={params => <StyledTextField {...params} placeholder="Search Token" />}
          popupIcon={<BiChevronDown />}
        />
      ),
    },
  ];
  const itemRight = [
    {
      title: "Total Stake",
      value: (
        <Box>
          {formatADAFull(dataStake?.totalStake)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </Box>
      ),
    },
    {
      title: "POOL NAME",
      value: (
        <Link
          to={dataStake?.pool?.poolName ? details.delegation(dataStake.pool.poolId) : "#"}
          style={{ fontFamily: "var(--font-family-text)", color: "var(--color-blue)" }}
        >
          {dataStake?.pool?.poolName ||
            (dataStake?.pool?.poolId && `Pool [${getShortWallet(dataStake.pool.poolId)}]`) ||
            ""}
        </Link>
      ),
    },
    {
      title: "Reward",
      value: (
        <Box>
          {formatADAFull(dataStake?.rewardAvailable)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </Box>
      ),
    },
  ];

  return (
    <Card
      title={
        <Box display={"flex"}>
          <Box>Address Detail</Box>
          <BookmarkButton keyword={data?.address || ""} type="ADDRESS" />
        </Box>
      }
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
            <CardAddress
              title={"Wallet address"}
              type="left"
              address={data?.address || ""}
              item={itemLeft}
              loading={loading}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
            <CardAddress
              title={"Stake address"}
              type="right"
              address={data?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(data?.stakeAddress)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressHeader;
