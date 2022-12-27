import { Box } from "@mui/material";
import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { routers } from "../../../commons/routers";

import { formatADA } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import ADA from "../../../commons/resources/icons/ADA.svg";
import rocketToken from "../../../commons/resources/images/rocketToken.svg";
import exchangeToken from "../../../commons/resources/images/exchangeToken.svg";
import infoToken from "../../../commons/resources/images/infoToken.png";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";

import {
  BackButton,
  BackText,
  CardInfo,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  TitleCard,
  TokenInfo,
  ValueCard,
  ViewMetaData,
} from "./styles";

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
  tokenMetadataLoading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading, tokenMetadataLoading }) => {
  return (
    <Box>
      <BackButton to={routers.TOKEN_LIST}>
        <HiArrowLongLeft />
        <BackText>Back</BackText>
      </BackButton>
      <HeaderContainer>
        <HeaderTitle>
          {loading && <HeaderTitleSkeleton variant="rectangular" />}
          {!loading && <>{data?.displayName}</>}
        </HeaderTitle>
      </HeaderContainer>
      <SlotLeaderContainer>
        {loading ? (
          <SlotLeaderSkeleton variant="rectangular" />
        ) : (
          <>
            <SlotLeader>
              <Box>{data?.fingerprint}</Box> <CopyButton text={data?.fingerprint} />
            </SlotLeader>
          </>
        )}
      </SlotLeaderContainer>
      <CardInfoOverview>
        <CardItem display={"flex"} gap={2}>
          <Box>
            <img src={policyIcon} alt="" />
          </Box>
          <Box display={"flex"} flexDirection="column" height={"100%"} justifyContent="space-between">
            <Box
              color={props => props.colorGreenLight}
              fontWeight="bold"
              fontFamily={'"Space Mono", monospace, sans-serif'}
              fontSize={"1.125rem"}
              component="button"
              border={"none"}
              bgcolor="transparent"
              padding={0}
              textAlign="left"
              // onClick={() => setOpenModal(true)}
              style={{ cursor: "pointer" }}
            >
              Policy Script
            </Box>
            <Box>
              <Box display={"flex"} alignItems="center">
                {data?.displayName || ""}
                <img
                  width={30}
                  height={30}
                  src={data?.metadata ? `data:image/png;base64,${data.metadata.logo}` : ""}
                  alt="logo icon"
                />
              </Box>
              <Box display={"flex"} alignItems="center">
                {data?.metadata?.description || ""}
              </Box>
            </Box>
          </Box>
        </CardItem>
        <CardItem>
          <Box>
            <img src={timeIcon} alt="" />
          </Box>
          <Box display={"flex"} alignItems="center">
            <TitleCard my={2} mr={1}>
              Policy Asset Holders{" "}
            </TitleCard>
            <img src={infoIcon} alt="info icon" />
          </Box>
          <ValueCard>{/* <ButtonView to={details.policyAssetHolder(policyId)}>View</ButtonView> */}</ValueCard>
        </CardItem>
      </CardInfoOverview>
    </Box>
  );
};

export default TokenOverview;
