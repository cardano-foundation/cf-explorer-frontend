import { Autocomplete, Box, Grid } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { AIcon } from "../../../commons/resources";
import { formatADA, formatPrice } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import CardAddress from "../../share/CardAddress";
import { StyledAAmount, StyledTextField, WrapPaperDropdown } from "./styles";

const AddressOverview: React.FC = () => {
  const itemLeft = [
    { title: "Transaction", value: 0 },
    {
      title: "ADA Balance",
      value: (
        <StyledAAmount>
          {formatADA(0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    { title: "ADA Value", value: formatPrice(1412332136913) },
    {
      value: (
        <Autocomplete
          // value={selectedToken}
          // onChange={(event, newValue) => {
          //   setSelectedToken(newValue as WalletAddress["tokens"][number]);
          // }}
          PaperComponent={({ children }) => <WrapPaperDropdown>{children}</WrapPaperDropdown>}
          options={[]}
          getOptionLabel={_ => "option.displayName"}
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
                  <Box>
                    {option.displayName} #{option.name || option.fingerprint}
                  </Box>
                </Box>
                <Box fontWeight={"bold"}>{formatPrice(0)}</Box>
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
          {formatADA(0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Available",
      value: (
        <StyledAAmount>
          {formatADA(0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Withdrawn",
      value: (
        <StyledAAmount>
          {formatADA(0)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </StyledAAmount>
      ),
    },
    {
      title: "Delegated To",
      value: <div />,
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
              address={"d043a5c980ae0f373a1a8712536658fa500a3cf9d8436dea748e54753d794250"}
              item={itemLeft}
              loading={false}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={props => props.borderRadius} height={"100%"}>
            <CardAddress
              title={"Controlled stake key"}
              type="right"
              address={"d043a5c980ae0f373a1a8712536658fa500a3cf9d8436dea748e54753d794250"}
              item={itemRight}
              loading={false}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressOverview;
