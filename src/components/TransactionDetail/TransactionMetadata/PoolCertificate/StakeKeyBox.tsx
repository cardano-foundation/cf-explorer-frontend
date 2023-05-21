import { Box, Grid } from "@mui/material";
import CopyButton from "~/components/commons/CopyButton";
import { TextLabel, TextNormal, TextRightValue, TextValue } from "./styles";
import Link from "~/components/commons/Link";
import { getShortHash, getShortWallet } from "~/commons/utils/helper";
import { AdaValue } from "~/components/TabularView/StakeTab/Tabs/StakeRegistrationTab";
import { details } from "~/commons/routers";
import { useScreen } from "~/commons/hooks/useScreen";

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const { isGalaxyFoldSmall } = useScreen();
  const leftRow = [
    {
      label: "Pool Id",
      value: getShortHash(data.poolId),
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
          <Box display='flex' flexDirection='column' gap='15px'>
            {(leftRow || []).map(({ label, value, isHyperLink, originValue, linkTo, isMultipleValue }) => {
              return (
                <Box key={label} display='flex' alignItems='flex-start'>
                  <TextLabel>{label}: </TextLabel>
                  {isMultipleValue ? (
                    <Box display='flex' flexDirection='column'>
                      {value.map((item, index) => (
                        <TextValue key={index}>
                          <Link to={details.stake(item || "")}>{getShortWallet(item)}</Link>
                          <CopyButton sx={{ marginLeft: 1, height: 16 }} text={item} />
                        </TextValue>
                      ))}
                    </Box>
                  ) : (
                    <TextValue>
                      {isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}
                      {value && <CopyButton sx={{ marginLeft: 1, height: 16 }} text={originValue} />}
                    </TextValue>
                  )}
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display='flex' flexDirection='column' gap='15px'>
            {(rightRow || []).map(({ label, value }) => {
              return (
                <Box key={label} display='flex'>
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
