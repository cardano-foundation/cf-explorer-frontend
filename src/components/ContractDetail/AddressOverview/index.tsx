import { Autocomplete, Box, Grid } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import useFetch from "../../../commons/hooks/useFetch";
import { AIcon, EmptyIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { exchangeADAToUSD, formatADAFull, getShortWallet, numberWithCommas } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import Card from "../../commons/Card";
import CustomTooltip from "../../commons/CustomTooltip";
import CardAddress from "../../share/CardAddress";
import { Logo, LogoEmpty, Pool, StyledAAmount, StyledTextField } from "./styles";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
}

const AddressOverview: React.FC<Props> = ({ data, loading }) => {
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(
    data?.stakeAddress ? `${API.STAKE.DETAIL}/${data?.stakeAddress}` : ""
  );
  const { adaRate } = useSelector(({ system }: RootState) => system);

  const itemLeft = [
    { title: "Transaction", value: data?.txCount },
    {
      title: "ADA Balance",
      value: (
        <StyledAAmount>
          <Box>{formatADAFull(data?.balance)}</Box>
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    { title: "ADA Value", value: exchangeADAToUSD(data?.balance || 0, adaRate, true) },
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
          renderOption={(props, option: WalletAddress["tokens"][number]) => (
            <li key={option.fingerprint} {...props}>
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
                width={"100%"}
                fontSize={"14px"}
                padding={0}
                gap="10px"
                minHeight="34px"
              >
                <Box display="flex" alignItems={"center"} overflow="hidden" gap="10px">
                  <Box>
                    {option?.metadata?.logo ? (
                      <Logo src={`data:/image/png;base64,${option.metadata?.logo}`} alt="icon" />
                    ) : (
                      <LogoEmpty />
                    )}
                  </Box>
                  <CustomTooltip title={`${option.displayName} #${option.name || option.fingerprint}`}>
                    <Box textAlign={"left"} overflow={"hidden"} textOverflow={"ellipsis"} maxWidth="150px">
                      {option.displayName} #{option.name || option.fingerprint}
                    </Box>
                  </CustomTooltip>
                </Box>
                <Box fontWeight={"bold"} flex={1} textAlign="right">
                  {numberWithCommas(option.quantity)}
                </Box>
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
      title: "Controlled Total Stake",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.totalStake)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Available",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardAvailable)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Withdrawn",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardWithdrawn)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Delegated To",
      value: (
        <Pool to={details.delegation(dataStake?.pool ? dataStake?.pool?.poolId : "")}>
          {dataStake?.pool?.poolName || `Pool [${getShortWallet(dataStake?.pool?.poolId || "")}]`}
        </Pool>
      ),
    },
  ];
  return (
    <Card title="Contract Detail">
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={10} height={"100%"}>
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
          <Box overflow="hidden" borderRadius={10} height={"100%"}>
            <CardAddress
              title={"Controlled stake key"}
              type="right"
              address={dataStake?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(dataStake?.stakeAddress)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressOverview;
