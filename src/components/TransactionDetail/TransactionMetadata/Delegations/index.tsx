import React from "react";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import sendImg from "src/commons/resources/images/sendImg.svg";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import { UpGreenUtxoDarkmode } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { AddressLink, Header, ItemContainer, StatusIcon, StyledItem, Wrapper } from "./styles";

interface DelegationProps {
  data: Transaction["delegations"] | null;
}

const Delegations: React.FC<DelegationProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Wrapper>
      <Header>{t("common.stakeAddress")}</Header>
      {data?.map((item) => (
        <StyledItem key={item.address}>
          <ItemContainer>
            <Box display="flex" alignItems="center">
              <Box width={50}>
                <StatusIcon src={theme.isDark ? UpGreenUtxoDarkmode : sendImg} alt="wallet icon" />
              </Box>
              <Box width={"100%"}>
                <Box>
                  <Box component={"span"} color={({ palette }) => palette.secondary.light} mr={1}>
                    {t("glossary.from")}:
                  </Box>
                  <CustomTooltip title={item.address}>
                    <AddressLink to={details.stake(item.address)}>{getShortHash(item.address || "")}</AddressLink>
                  </CustomTooltip>
                  <CopyButton text={item.address || ""} />
                </Box>
                <Box>
                  <Box component={"span"} color={({ palette }) => palette.secondary.light} mr={1}>
                    {t("common.poolID")}:
                  </Box>
                  <CustomTooltip title={item.poolId}>
                    <AddressLink to={details.delegation(item.poolId)}>{getShortHash(item.poolId || "")}</AddressLink>
                  </CustomTooltip>
                  <CopyButton text={item.poolId || ""} />
                </Box>
              </Box>
            </Box>
          </ItemContainer>
        </StyledItem>
      ))}
    </Wrapper>
  );
};

export default Delegations;
