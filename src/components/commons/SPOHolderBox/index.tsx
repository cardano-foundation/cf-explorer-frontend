import { Box, Typography, styled, IconButton as IconButtonMui, useTheme, BoxProps } from "@mui/material";
import React, { useRef } from "react";
import { isArray } from "lodash";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SPOHolderIconUrl, SPOInfo, SPOKey } from "src/commons/resources";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import CustomTooltip from "../CustomTooltip";
import { PoolNamePopup } from "../SPOHolder";
import CopyButton from "../CopyButton";

interface ISPOPropsData {
  poolName?: string;
  poolView?: string;
  stakeKeys?: string[] | string;
}
interface ISPOProps extends BoxProps {
  data: ISPOPropsData;
}

const SPOHolderBox: React.FC<ISPOProps> = React.forwardRef(({ data, ...props }, boxRef) => {
  const { poolName, stakeKeys, poolView } = data;
  const history = useHistory();
  const { t } = useTranslation();
  const SPOKeyRef = useRef(null);
  const SPOInfoRef = useRef(null);

  const theme = useTheme();
  const rewardAccounts = isArray(stakeKeys) ? stakeKeys : [stakeKeys];

  const onViewPoolDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(details.delegation(poolView));
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container {...props} ref={boxRef}>
      <Image src={SPOHolderIconUrl} alt="SPO image" />
      <Content>
        <Title>{t("common.spo")}</Title>
        <SubTitle>{poolName}</SubTitle>
        <IconGroup>
          <CustomTooltip
            wOpacity={false}
            componentsProps={{
              transition: {
                style: {
                  backgroundColor: theme.isDark ? "black" : "white",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                  padding: "10px"
                }
              },
              arrow: { style: { color: theme.isDark ? "black" : "white" } }
            }}
            title={
              <Box onClick={stopPropagation}>
                <Box display={"flex"} alignItems={"center"}>
                  <Box fontSize="1.125rem" color={({ palette }) => palette.secondary.light}>
                    {t("common.poolId")}:
                  </Box>
                  <PoolNamePopup to={details.delegation(poolView)}>{getShortHash(poolView || "", 8)}</PoolNamePopup>
                  <CopyButton text={poolView} />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box fontSize="1.125rem" color={({ palette }) => palette.secondary.light}>
                    {t("common.poolName")}:
                  </Box>
                  <PoolNamePopup to={details.delegation(poolView)}>{poolName}</PoolNamePopup>
                </Box>
              </Box>
            }
          >
            <ButtonSPO ref={SPOInfoRef} component={IconButton} onClick={onViewPoolDetail}>
              <SPOInfo fill={theme.palette.primary.main} data-testid="spo-info" />
            </ButtonSPO>
          </CustomTooltip>
          <CustomTooltip
            leaveDelay={100}
            wOpacity={false}
            componentsProps={{
              transition: {
                style: {
                  backgroundColor: theme.isDark ? "black" : "white",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                  padding: "10px"
                }
              },
              arrow: { style: { color: theme.isDark ? "black" : "white" } }
            }}
            title={
              rewardAccounts.length > 0 && (
                <StakeKeyItemList onClick={stopPropagation}>
                  {rewardAccounts.map((item) => (
                    <StakeKeyItem key={item}>
                      <SPOKey fill={theme.palette.primary.main} />
                      <PoolNamePopup to={details.stake(item)}>{getShortHash(item, 8)}</PoolNamePopup>
                      <CopyButton text={item} />
                    </StakeKeyItem>
                  ))}
                </StakeKeyItemList>
              )
            }
          >
            <ButtonSPO ref={SPOKeyRef} component={IconButton} onClick={stopPropagation}>
              <SPOKey fill={theme.palette.primary.main} />
            </ButtonSPO>
          </CustomTooltip>
        </IconGroup>
      </Content>
    </Container>
  );
});

SPOHolderBox.displayName = "SPOHolder";

export default SPOHolderBox;

const Container = styled(Box)`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.secondary["0"]};
  border-radius: 12px;
  gap: 12px;
  align-items: center;
`;

const Title = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const SubTitle = styled(Typography)`
  font-size: 16px;
  text-align: left;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Image = styled("img")`
  width: 68px;
  height: 68px;
`;

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.primary[100]
}));

const IconGroup = styled(Box)`
  display: flex;
  gap: 6px;
  & svg {
    cursor: pointer;
  }
`;

export const ButtonSPO = styled(Box)(() => ({
  padding: 0,
  background: "transparent"
}));

export const StakeKeyItem = styled(Box)(() => ({
  display: "flex"
}));

export const StakeKeyItemList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4
}));
