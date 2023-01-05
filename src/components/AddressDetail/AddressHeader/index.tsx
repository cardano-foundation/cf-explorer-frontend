import { Link, useParams } from "react-router-dom";
import { Grid, Box, Autocomplete } from "@mui/material";
import { exchangeADAToUSD, formatADA, formatPrice } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronDown } from "react-icons/bi";
import { AIcon } from "../../../commons/resources";
import CardAddress from "../../share/CardAddress";
import { routers } from "../../../commons/routers";
import { StyledTextField, WrapPaperDropdown } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";

const AddressHeader = () => {
  const { address } = useParams<{ address: string }>();
  const { data, loading } = useFetch<WalletAddress>(`/address/${address}`);
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(`/stakeKey/${address}`);
  const { adaRate } = useSelector(({ system }: RootState) => system);

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
    { title: "ADA Value", value: exchangeADAToUSD(data?.balance || 0, adaRate) },
    {
      value: (
        <Autocomplete
          PaperComponent={({ children }) => <WrapPaperDropdown>{children}</WrapPaperDropdown>}
          options={data?.tokens || []}
          getOptionLabel={option => option.displayName}
          noOptionsText="No data found"
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
            <CardAddress
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
            <CardAddress
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
