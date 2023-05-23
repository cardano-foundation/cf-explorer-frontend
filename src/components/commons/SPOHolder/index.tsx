import { Box, BoxProps, styled, IconButton } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import React, { forwardRef, useRef } from "react";
import { SPOHolderIconUrl, SPOInfo, SPOKey, PolygonSPOUrl } from "~/commons/resources";
import PolygonShape from "../PolygonShape";
import CustomTooltip from "~/components/commons/CustomTooltip";
import PopoverStyled from "../PopoverStyled";
import { getShortHash, getShortWallet } from "~/commons/utils/helper";
import { details } from "~/commons/routers";
import CopyButton from "../CopyButton";

interface ISPOPropsData {
  poolName?: string;
  poolView?: string;
  stakeKeys?: string[];
}
interface ISPOProps extends BoxProps {
  data: ISPOPropsData;
}

export const SPOHolder: React.FC<ISPOProps> = forwardRef(({ children, data, ...props }, boxRef) => {
  const { poolName, poolView, stakeKeys } = data;
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);
  const history = useHistory();
  return (
    <PolygonShapeSPO {...props} ref={boxRef}>
      <SPOImage src={SPOHolderIconUrl} alt='SPO image' />
      <SPOTitle>SPO</SPOTitle>
      <CustomTooltip title={poolName}>
        <PoolName> {poolName}</PoolName>
      </CustomTooltip>
      <PopoverStyled
        render={({ handleClick }) => (
          <ButtonSPO
            ref={SPOInfoRef}
            component={IconButton}
            left={"33%"}
            onClick={() => {
              SPOInfoRef?.current && handleClick(SPOInfoRef.current);
            }}
          >
            <SPOInfo />
          </ButtonSPO>
        )}
        content={
          <Box>
            <Box display={"flex"} alignItems={"center"}>
              <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                Pool ID:
              </Box>
              <PoolNamePopup to={details.delegation(poolView)}>{getShortHash(poolView || "")}</PoolNamePopup>
              <CopyButton text={poolView} />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                Pool name:
              </Box>
              <PoolNamePopup to={details.delegation(poolView)}>{poolName}</PoolNamePopup>
            </Box>
          </Box>
        }
      />
      <Box>
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
            <Box display={"flex"} alignItems={"center"}>
              {stakeKeys && stakeKeys.length > 0 && (
                <>
                  <SPOKey fill='#108AEF' />
                  <PoolNamePopup to={details.stake(stakeKeys[0] || "")}>
                    {getShortWallet(stakeKeys[0] || "")}
                  </PoolNamePopup>
                  <CopyButton text={stakeKeys[0]} />
                </>
              )}
            </Box>
          }
        >
          <ButtonSPO
            ref={SPOKeyRef}
            component={IconButton}
            onClick={() => stakeKeys?.[0] && history.push(details.stake(stakeKeys[0]))}
            left={"52%"}
          >
            <SPOKey fill='#438F68' />
          </ButtonSPO>
        </CustomTooltip>
      </Box>
    </PolygonShapeSPO>
  );
});

SPOHolder.displayName = "SPOHolder";
export default SPOHolder;

const PolygonShapeSPO = styled(PolygonShape)(({ theme }) => ({
  height: "250px",
  width: 190,
  position: "relative",
  backgroundImage: `url(${PolygonSPOUrl})`
}));

export const SPOImage = styled("img")(() => ({
  width: 100,
  height: 100
}));

export const SPOTitle = styled(Box)(() => ({}));

export const PoolName = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: "30%",
  color: theme.palette.grey[400],
  fontWeight: 500,
  transform: "translate(-50%, 0)",
  maxWidth: "70%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));
export const ButtonSPO = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "12%",
  padding: 0,
  zIndex: 3
}));
export const PoolNamePopup = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.blue[800]} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`,
  maxWidth: 180,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));
