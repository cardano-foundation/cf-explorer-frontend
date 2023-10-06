import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Link from "src/components/commons/Link";
import { AdaValue } from "src/components/commons/ADAValue";

import { TextLabel, TextRightValue, TextValue } from "./styles";

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const { t } = useTranslation();
  const leftRow = [
    {
      label: t("common.poolID"),
      value: getShortHash(data.poolId),
      isHyperLink: true,
      originValue: data.poolId,
      linkTo: details.delegation(data.poolId)
    },
    {
      label: t("common.vrfKey"),
      value: data?.vrfKey ? getShortHash(data?.vrfKey) : "",
      isHyperLink: false,
      originValue: data.vrfKey
    },
    {
      label: t("common.rewardAccount"),
      value: data.rewardAccount ? getShortHash(data.rewardAccount) : "",
      isHyperLink: true,
      originValue: data.rewardAccount,
      linkTo: details.stake(data.rewardAccount)
    },
    {
      label: t("common.poolOperator"),
      value: data.poolOwners || [],
      isHyperLink: true,
      originValue: data.poolOwners && data.poolOwners.length > 0 ? data.poolOwners[0] : "",
      isMultipleValue: true
    }
  ];

  const rightRow = [
    {
      label: t("margin"),
      value: data.margin ? `${data.margin * 100}%` : 0
    },
    {
      label: t("glossary.cost"),
      value: <AdaValue value={data.cost} />
    },
    {
      label: t("glossary.pledge"),
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
                              <Link to={details.stake(item || "")}>{getShortHash(item)}</Link>
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
