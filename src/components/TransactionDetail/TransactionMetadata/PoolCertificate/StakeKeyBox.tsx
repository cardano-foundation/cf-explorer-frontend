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
      value: data.poolOwners && data.poolOwners.length > 0 ? getShortWallet(data.poolOwners[0]) : "",
      isHyperLink: true,
      originValue: data.poolOwners && data.poolOwners.length > 0 ? data.poolOwners[0] : "",
      linkTo: details.stake(data.poolOwners && data.poolOwners.length > 0 ? data.poolOwners[0] : "")
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
            {(leftRow || []).map(({ label, value, isHyperLink, originValue, linkTo }) => {
              return (
                <Box key={label} display='flex' alignItems='center'>
                  <TextLabel>{label}: </TextLabel>
                  <TextValue>
                    {isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}
                    {value && <CopyButton sx={{ marginLeft: 1, height: 16 }} text={originValue} />}
                  </TextValue>
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
