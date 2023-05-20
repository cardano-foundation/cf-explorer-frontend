import { Box, Grid } from "@mui/material";
import CopyButton from "~/components/commons/CopyButton";
import { TextLabel, TextNormal, TextRightValue, TextValue } from "./styles";
import Link from "~/components/commons/Link";
import { getShortHash, getShortWallet } from "~/commons/utils/helper";
import { AdaValue } from "~/components/TabularView/StakeTab/Tabs/StakeRegistrationTab";
import { details } from "~/commons/routers";
import { useScreen } from "~/commons/hooks/useScreen";
import CustomTooltip from "~/components/commons/CustomTooltip";

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
      linkTo: details.delegation(data.poolId),
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
    },
    {
      label: "Metadata Hash",
      value: data.metadataHash ? getShortHash(data.metadataHash) : "",
      isHyperLink: false,
      originValue: data.metadataHash
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
    },
    {
      label: "Relay nNode",
      value: (
        <Box display='flex' flexDirection='column'>
          {(data?.relays || []).map((relay, index) => (
            <TextNormal key={index}>
              IPv4: <TextRightValue>{relay.ipv4}</TextRightValue> {isGalaxyFoldSmall ? <br /> : <>|</>} Port:
              <TextRightValue>{relay.port}</TextRightValue>
            </TextNormal>
          ))}
        </Box>
      )
    },
    {
      label: "Metadata URL",
      value: (
        <Box sx={{ wordBreak: "break-all" }}>
          {data?.metadataUrl}
          {data?.metadataUrl && <CopyButton text={data?.metadataUrl} sx={{ height: 16 }} />}
        </Box>
      )
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
                        <TextValue>
                          {isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}
                        </TextValue>
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
    </Box >
  );
};
export default StakeKeyBox;
