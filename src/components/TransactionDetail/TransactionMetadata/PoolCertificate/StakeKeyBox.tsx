import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import Link from "src/components/commons/Link";
import { AdaValue } from "src/components/commons/ADAValue";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { TextLabel, TextRightValue, TextValue, ValueItem, ValueItemMultiple } from "./styles";

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const { t } = useTranslation();
  const leftRow = [
    {
      label: t("common.poolID"),
      value: <DynamicEllipsisText value={data.poolId} isTooltip isCopy />,
      isHyperLink: true,
      originValue: data.poolId,
      linkTo: details.delegation(data.poolId)
    },
    {
      label: t("common.vrfKey"),
      value: data?.vrfKey ? <DynamicEllipsisText value={data.vrfKey} isTooltip isCopy /> : "",
      isHyperLink: false,
      originValue: data.vrfKey
    },
    {
      label: t("common.rewardAccount"),
      value: data.rewardAccount ? <DynamicEllipsisText value={data.rewardAccount} isTooltip isCopy /> : "",
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
            {(leftRow || []).map(({ label, value, isHyperLink, linkTo, isMultipleValue }) => {
              return (
                <Box key={label + value} display="flex" alignItems="flex-start">
                  <TextLabel>{label}: </TextLabel>
                  {isMultipleValue ? (
                    <Box width={"100%"}>
                      {value.map((item) => (
                        <ValueItemMultiple key={item}>
                          <TextValue>
                            <Link to={details.stake(item || "")}>
                              <DynamicEllipsisText value={item} isTooltip isCopy />
                            </Link>
                          </TextValue>
                        </ValueItemMultiple>
                      ))}
                    </Box>
                  ) : (
                    <ValueItem>
                      <TextValue>{isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}</TextValue>
                    </ValueItem>
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
