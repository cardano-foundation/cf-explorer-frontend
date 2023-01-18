import React, { useState } from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import { routers } from "../../../commons/routers";

import { formatADA, formatDateTimeLocal, numberWithCommas } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import decimalIcon from "../../../commons/resources/icons/decimal.svg";
import { ReactComponent as Bookmark } from "../../../commons/resources/icons/Bookmark.svg";

import {
  BackButton,
  BackText,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  LogoEmpty,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  TitleCard,
  ValueCard,
} from "./styles";
import moment from "moment";
import ScriptModal from "../../ScriptModal";
import CustomTooltip from "../../commons/CustomTooltip";

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [policyId, setPolicyId] = useState("");

  const listItem = [
    {
      title: "Total Supply",
      value: (
        <CustomTooltip title={numberWithCommas(data?.supply || 0)}>
          <Box>{formatADA(data?.supply ? data.supply * 1000000 : 0)}</Box>
        </CustomTooltip>
      ),
      icon: slotIcon,
    },
    { title: "Decimal", icon: decimalIcon, value: data?.metadata?.decimals || 0 },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            Transactions
          </Box>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      icon: exchageIcon,
      value: numberWithCommas(data?.txCount || 0),
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            Created at
          </Box>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      icon: timeIcon,
      value: formatDateTimeLocal(data?.createdOn || ""),
    },
  ];

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
          <Box mx={1} component={IconButton} style={{ width: 45, height: 45 }}>
            <Bookmark />
          </Box>
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
      {loading && (
        <Box height={150} width="100%" borderRadius={props => props.borderRadius} overflow="hidden">
          <Skeleton height={"100%"} width="100%" variant="rectangular" />
        </Box>
      )}
      {!loading && (
        <CardInfoOverview>
          <CardItem display={"flex"} gap={2} flex={3}>
            <Box>
              <img src={policyIcon} alt="" />
            </Box>
            <Box display={"flex"} flexDirection="column" height={"80%"} justifyContent="space-between">
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
                onClick={() => {
                  setOpenModal(true);
                  setPolicyId(data?.policy || "");
                }}
                style={{ cursor: "pointer" }}
              >
                Policy Script
              </Box>
              <Box>
                <Box display={"flex"} alignItems="center" fontWeight={"bold"} mb={1}>
                  {data?.displayName || ""}
                  {data?.metadata && data?.metadata?.logo ? (
                    <Box
                      component={"img"}
                      width={"auto"}
                      height={20}
                      src={`data:image/png;base64,${data.metadata.logo}`}
                      alt="logo icon"
                      ml={1}
                    />
                  ) : (
                    <LogoEmpty ml={1} />
                  )}
                </Box>
                <Box display={"flex"} alignItems="center" fontSize={"0.75rem"} color="rgba(0,0,0,0.5)">
                  {data?.metadata?.description || ""}
                </Box>
              </Box>
            </Box>
          </CardItem>
          {listItem.map((item, idx) => (
            <CardItem key={idx} flex={1}>
              <Box>
                <img src={item.icon} alt="" />
              </Box>
              <Box display={"flex"} alignItems="center">
                <TitleCard my={1} mr={1}>
                  {item.title}
                </TitleCard>
              </Box>
              <ValueCard>{item.value}</ValueCard>
            </CardItem>
          ))}
        </CardInfoOverview>
      )}
      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={policyId} />
    </Box>
  );
};

export default TokenOverview;
