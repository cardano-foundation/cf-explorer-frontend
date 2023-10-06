import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import CopyButton from "src/components/commons/CopyButton";
import { getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Link from "src/components/commons/Link";

import StakeKeyBox from "./StakeKeyBox";
import { CardHeader, TextLabel, TextValue, Wrapper } from "./styles";

interface IProps {
  data: Transaction["poolCertificates"] | null;
}

const PoolCertificate: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper>
      {data
        ?.filter((d) => d.type === "POOL_REGISTRATION")
        ?.map((item, index) => {
          return (
            <Box px="15px" key={index} mb="15px" bgcolor={theme.palette.secondary[0]} textAlign="left">
              <CardHeader>{t("title.poolRegistrations")}</CardHeader>
              <StakeKeyBox key={index} data={item} />
            </Box>
          );
        })}
      {data
        ?.filter((d) => d.type === "POOL_DEREGISTRATION")
        ?.map((item, index) => {
          return (
            <Box px="15px" key={index} mb="15px" bgcolor={theme.palette.secondary[0]} textAlign="left">
              <CardHeader>{t("title.poolDeregistrations")}</CardHeader>
              <Box py={2}>
                <Grid item xs={12} md={6}>
                  <Box display="flex" flexDirection="column" gap="15px">
                    <Box display="flex" alignItems="center">
                      <TextLabel>{t("common.poolID")}: </TextLabel>
                      <TextValue>
                        <CustomTooltip title={item.poolId}>
                          <span>
                            <Link to={details.delegation(item.poolId || "")}>{getShortWallet(item.poolId)}</Link>
                          </span>
                        </CustomTooltip>
                        <CopyButton text={item.poolId} />
                      </TextValue>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <TextLabel>{t("glossary.epoch")}: </TextLabel>
                      <TextValue>
                        <Link to={details.epoch(item.epoch)}>{item.epoch}</Link>
                      </TextValue>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>
          );
        })}
    </Wrapper>
  );
};

export default PoolCertificate;
