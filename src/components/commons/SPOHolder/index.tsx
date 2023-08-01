import { Box, BoxProps, styled, IconButton, useTheme, alpha } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import React, { forwardRef, useRef } from "react";
import { isArray } from "lodash";

import { SPOHolderIconUrl, SPOInfo, SPOKey, PolygonSPOUrl } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import PolygonShape from "../PolygonShape";
import CopyButton from "../CopyButton";
import { StakeKeyItem, StakeKeyItemList } from "./styles";
interface ISPOPropsData {
  poolName?: string;
  poolView?: string;
  stakeKeys?: string[] | string;
}
interface ISPOProps extends BoxProps {
  data: ISPOPropsData;
}

export const SPOHolder: React.FC<ISPOProps> = forwardRef(({ data, ...props }, boxRef) => {
  const { poolName, poolView, stakeKeys } = data;
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);
  const history = useHistory();
  const theme = useTheme();

  const rewardAccounts = isArray(stakeKeys) ? stakeKeys : [stakeKeys];
  return (
    <PolygonShapeSPO {...props} ref={boxRef}>
      <SPOImage src={SPOHolderIconUrl} alt="SPO image" />
      <SPOTitle>SPO</SPOTitle>
      <Box>
        <CustomTooltip title={poolName}>
          <PoolName> {poolName}</PoolName>
        </CustomTooltip>
        <CustomTooltip
          wOpacity={false}
          componentsProps={{
            transition: {
              style: {
                backgroundColor: "white",
                boxShadow: `0px 0px 10px ${alpha(theme.palette.common.white, 0.25)}`,
                padding: "10px"
              }
            },
            arrow: { style: { color: "white" } }
          }}
          title={
            <Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box fontSize="1.125rem" color={({ palette }) => palette.secondary.light}>
                  Pool ID:
                </Box>
                <PoolNamePopup to={details.delegation(poolView)}>{getShortWallet(poolView || "")}</PoolNamePopup>
                <CopyButton text={poolView} />
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box fontSize="1.125rem" color={({ palette }) => palette.secondary.light}>
                  Pool name:
                </Box>
                <PoolNamePopup to={details.delegation(poolView)}>{poolName}</PoolNamePopup>
              </Box>
            </Box>
          }
        >
          <ButtonSPO
            ref={SPOInfoRef}
            component={IconButton}
            left={"33%"}
            onClick={() => {
              SPOInfoRef?.current && history.push(details.delegation(poolView));
            }}
          >
            <SPOInfo fill={theme.palette.primary.main} />
          </ButtonSPO>
        </CustomTooltip>
        <CustomTooltip
          wOpacity={false}
          componentsProps={{
            transition: {
              style: {
                backgroundColor: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                padding: "10px"
              }
            },
            arrow: { style: { color: "white" } }
          }}
          title={
            rewardAccounts.length > 0 && (
              <StakeKeyItemList>
                {rewardAccounts.map((item) => (
                  <StakeKeyItem key={item}>
                    <SPOKey fill={theme.palette.primary.main} />
                    <PoolNamePopup to={details.stake(item)}>{getShortWallet(item)}</PoolNamePopup>
                    <CopyButton text={item} />
                  </StakeKeyItem>
                ))}
              </StakeKeyItemList>
            )
          }
        >
          <ButtonSPO ref={SPOKeyRef} component={IconButton}>
            <SPOKey fill={theme.palette.primary.main} />
          </ButtonSPO>
        </CustomTooltip>
      </Box>
    </PolygonShapeSPO>
  );
});

SPOHolder.displayName = "SPOHolder";
export default SPOHolder;

const PolygonShapeSPO = styled(PolygonShape)(() => ({
  height: "250px",
  width: 190,
  position: "relative",
  backgroundImage: `url(${PolygonSPOUrl})`
}));

export const SPOImage = styled("img")(() => ({
  position: "absolute",
  top: "10%",
  width: 100,
  height: 100
}));

export const SPOTitle = styled(Box)(() => ({
  position: "absolute",
  top: "55%"
}));

export const PoolName = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "64%",
  left: "50%",
  bottom: "30%",
  color: theme.palette.secondary.light,
  fontWeight: 500,
  transform: "translate(-50%, 0)",
  maxWidth: "70%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));
export const ButtonSPO = styled(Box)(() => ({
  position: "absolute",
  bottom: "12%",
  padding: 0,
  zIndex: 3
}));
export const PoolNamePopup = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.primary.main} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`,
  maxWidth: 180,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1,
  textAlign: "left"
}));
