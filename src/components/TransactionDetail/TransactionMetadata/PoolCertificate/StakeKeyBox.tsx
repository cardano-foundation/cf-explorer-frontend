import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import Link from "src/components/commons/Link";
import { AdaValue } from "src/components/commons/ADAValue";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { EllipsisContainer, LeftRowContainer, TextLabel, TextRightValue, TextValue, ValueItem } from "./styles";

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const { t } = useTranslation();
  const leftRow = [
    {
      label: t("common.poolID"),
      value: (
        <EllipsisContainer>
          <DynamicEllipsisText value={data.poolId} isTooltip isCopy customTruncateFold={[7, 8]} />
        </EllipsisContainer>
      ),
      isHyperLink: true,
      originValue: data.poolId,
      linkTo: details.delegation(data.poolId)
    },
    {
      label: t("common.vrfKey"),
      value: data?.vrfKey ? (
        <EllipsisContainer>
          <DynamicEllipsisText value={data.vrfKey} isTooltip isCopy customTruncateFold={[7, 8]} />
        </EllipsisContainer>
      ) : (
        ""
      ),
      isHyperLink: false,
      originValue: data.vrfKey
    },
    {
      label: t("common.rewardAccount"),
      value: data.rewardAccount ? (
        <EllipsisContainer>
          <DynamicEllipsisText value={data.rewardAccount} isTooltip isCopy customTruncateFold={[5, 5]} />
        </EllipsisContainer>
      ) : (
        ""
      ),
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
          <LeftRowContainer>
            {(leftRow || []).map(({ label, value, isHyperLink, linkTo, isMultipleValue }) => {
              return (
                <Box key={label + value} display="flex" alignItems="center">
                  <TextLabel>{label}: </TextLabel>
                  {isMultipleValue ? (
                    <ValueItem
                      className="ValueItem"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px"
                      }}
                    >
                      {value.map((item) => (
                        <Box className="ValueItem" key={item}>
                          <TextValue>
                            <Link to={details.stake(item || "")}>
                              <EllipsisContainer>
                                <DynamicEllipsisText value={item} isTooltip isCopy customTruncateFold={[5, 6]} />
                              </EllipsisContainer>
                            </Link>
                          </TextValue>
                        </Box>
                      ))}
                    </ValueItem>
                  ) : (
                    <ValueItem className="ValueItem">
                      <TextValue>{isHyperLink && linkTo ? <Link to={linkTo}>{value}</Link> : value}</TextValue>
                    </ValueItem>
                  )}
                </Box>
              );
            })}
          </LeftRowContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap="15px">
            {(rightRow || []).map(({ label, value }) => {
              return (
                <Box key={label} display="flex" alignItems={"center"}>
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
