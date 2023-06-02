import { Box, Grid } from "@mui/material";

import CopyButton from "src/components/commons/CopyButton";
import Link from "src/components/commons/Link";
import { getShortHash, getShortWallet } from "src/commons/utils/helper";
import { AdaValue } from "src/components/TabularView/StakeTab/Tabs/StakeRegistrationTab";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { TextLabel, TextRightValue, TextValue } from "./styles";

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const leftRow = [
    {
      label: "Pool Id",
      value: getShortWallet(data.poolId),
      isHyperLink: true,
      originValue: data.poolId,
      linkTo: details.delegation(data.poolId)
    },
    {
      label: "VRF Key",
      value: data?.vrfKey ? getShortHash(data?.vrfKey) : "",
      isHyperLink: false,
      originValue: data.vrfKey
    },
    {
      label: "Reward Account",
      value: data.rewardAccount ? getShortWallet(data.rewardAccount) : "",
      isHyperLink: true,
      originValue: data.rewardAccount,
      linkTo: details.stake(data.rewardAccount)
    },
    {
      label: "Pool Operator",
      value: data.poolOwners || [],
      isHyperLink: true,
      originValue: data.poolOwners && data.poolOwners.length > 0 ? data.poolOwners[0] : "",
      isMultipleValue: true
    }
  ];

  const rightRow = [
    {
      label: "Margin",
      value: data.margin ? `${data.margin * 100}%` : 0
    },
    {
      label: "Cost",
      value: <AdaValue value={data.cost} />
    },
    {
      label: "Pledge",
      value: <AdaValue value={data.pledge} />
    }
  ];

  return (
    <Box py={"15px"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap="15px">
            {(leftRow || []).map(({ label, value, isHyperLink, originValue, linkTo, isMultipleValue }) => {
              return (
                <Box key={label} display="flex" alignItems="flex-start">
                  <TextLabel>{label}: </TextLabel>
                  {isMultipleValue ? (
                    <Box display="flex" flexDirection="column">
                      {value.map((item, index) => (
                        <Box key={index} display={"flex"}>
                          <CustomTooltip title={item}>
                            <TextValue>
                              <Link to={details.stake(item || "")}>{getShortWallet(item)}</Link>
                            </TextValue>
                          </CustomTooltip>
                          <CopyButton sx={{ marginLeft: 1, height: 16 }} text={item} />
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box display={"flex"}>
                      <CustomTooltip title={originValue}>
                        <TextValue>{isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}</TextValue>
                      </CustomTooltip>
                      {value && <CopyButton sx={{ marginLeft: 1, height: 16 }} text={originValue} />}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap="15px">
            {(rightRow || []).map(({ label, value }) => {
              return (
                <Box key={label} display="flex">
                  <TextLabel>{label}: </TextLabel>
                  <TextRightValue>{value}</TextRightValue>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
