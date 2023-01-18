import { Autocomplete, Box, Grid } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import useFetch from "../../../commons/hooks/useFetch";
import { AIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { exchangeADAToUSD, formatADA, formatPrice } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import Card from "../../commons/Card";
import CardAddress from "../../share/CardAddress";
import { Pool, StyledAAmount, StyledTextField, WrapPaperDropdown } from "./styles";

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
          {formatADA(data?.balance || 0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    { title: "ADA Value", value: exchangeADAToUSD(data?.balance || 0, adaRate) },
    {
      value: (
        <Autocomplete
          PaperComponent={({ children }) => <WrapPaperDropdown>{children}</WrapPaperDropdown>}
          options={data?.tokens || []}
          getOptionLabel={option => option.displayName}
          renderOption={(props, option: WalletAddress["tokens"][number]) => (
            <li {...props} key={option.fingerprint}>
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
                  <Box>{option.displayName}</Box>
                </Box>
                <Box fontWeight={"bold"}>{formatPrice(option.quantity || 0)}</Box>
              </Box>
            </li>
          )}
          renderInput={params => <StyledTextField {...params} placeholder="Select Token" />}
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
          {formatADA(dataStake?.totalStake)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Available",
      value: (
        <StyledAAmount>
          {formatADA(dataStake?.rewardAvailable)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Withdrawn",
      value: (
        <StyledAAmount>
          {formatADA(dataStake?.rewardWithdrawn)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Delegated To",
      value: <Pool to={details.delegation(dataStake?.pool.poolId)}>{dataStake?.pool.poolName}</Pool>,
    },
  ];
  return (
    <Card title="Contract Detail">
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
              title={"Controlled stake key"}
              type="right"
              address={dataStake?.stakeAddress || ""}
              item={itemRight}
              loading={loadingStake}
              addressDestination={details.stake(dataStake?.stakeAddress)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressOverview;
