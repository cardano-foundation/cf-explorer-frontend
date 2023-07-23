import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import CopyButton from "../../../commons/CopyButton";
import { TextLabel, TextValue } from "./styles";
import { getShortWallet } from "../../../../commons/utils/helper";
import { details } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";

type TProps = {
  data: TStakeCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const leftRow = [
    {
      label: "Address Stake Key",
      value: data.stakeAddress,
      originValue: data.stakeAddress
    }
  ];

  return (
    <Box pt={"15px"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {leftRow.map(({ label, value, originValue }) => {
            return (
              <Box key={label} sx={{ marginBottom: "15px" }}>
                <TextLabel>{label}: </TextLabel>
                <TextValue>
                  <CustomTooltip title={value}>
                    <Box
                      color={({ palette }) => `${palette.primary.main} !important`}
                      component={Link}
                      to={details.stake(value)}
                    >
                      {getShortWallet(value)}
                    </Box>
                  </CustomTooltip>
                  <CopyButton text={originValue} />
                </TextValue>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
