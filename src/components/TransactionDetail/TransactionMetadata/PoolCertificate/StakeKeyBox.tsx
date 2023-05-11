import { Box, Grid } from "@mui/material";
import CopyButton from "../../../commons/CopyButton";
import { TextLabel, TextNormal, TextRightValue, TextValue } from "./styles";
import Link from "../../../commons/Link";
import { getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { AdaValue } from "../../../TabularView/StakeTab/Tabs/StakeRegistrationTab";
import { details, routers } from "../../../../commons/routers";

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
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
      value: getShortHash(data?.vrfKey),
      isHyperLink: false,
      originValue: data.vrfKey,
    },
    {
      label: "Reward Account",
      value: getShortWallet(data.rewardAccount),
      isHyperLink: true,
      originValue: data.rewardAccount,
      linkTo: routers.REGISTRATION_POOLS.replace(":poolType", ""),
    },
    {
      label: "Pool Operator",
      value: getShortWallet(data.poolOwners[0]),
      isHyperLink: true,
      originValue: data.poolOwners[0],
      linkTo: routers.REGISTRATION_POOLS.replace(":poolType", ""),
    },
    {
      label: "Metadata Hash",
      value: getShortHash(data.metadataHash),
      isHyperLink: false,
      originValue: data.metadataHash,
    },
  ];

  const rightRow = [
    {
      label: "Margin",
      value: `${data.margin * 100}%`,
    },
    {
      label: "Cost",
      value: <AdaValue value={data.cost} />,
    },
    {
      label: "Pledge",
      value: <AdaValue value={data.pledge} />,
    },
    {
      label: "Relay nNode",
      value: (
        <Box display="flex" flexDirection="column">
          {data.relays.map((relay, index) => (
            <TextNormal key={index}>
              IPv4: <TextRightValue>{relay.ipv4}</TextRightValue> | Port:
              <TextRightValue>{relay.port}</TextRightValue>
            </TextNormal>
          ))}
        </Box>
      ),
    },
    {
      label: "Metadata URL",
      value: (
        <div>
          {data?.metadataUrl} <CopyButton text={data?.metadataUrl} sx={{height: 16}} />
        </div>
      ),
    },
  ];

  return (
    <Box py={"15px"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap="15px">
            {leftRow.map(({ label, value, isHyperLink, originValue, linkTo }) => {
              return (
                <Box key={label} display="flex" alignItems="center">
                  <TextLabel>{label}: </TextLabel>
                  <TextValue>
                    {isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}
                    <CopyButton sx={{ marginLeft: 1, height: 16 }} text={originValue} />
                  </TextValue>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap="15px">
            {rightRow.map(({ label, value }) => {
              return (
                <Box key={label} >
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
