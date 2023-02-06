import React from "react";
import { Box, IconButton } from "@mui/material";

import { HiArrowLongLeft } from "react-icons/hi2";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import ProgressCircle from "../ProgressCircle";
import {
  BackButton,
  BackText,
  EpochNumber,
  EpochText,
  HeaderContainer,
  HeaderStatus,
  HeaderTitle,
  HeaderDetailContainer,
  DetailsInfo,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  SlotLeader,
  SlotLeaderValue,
  SlotLeaderCopy,
  HeaderTitleSkeleton,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ProgressSkeleton,
  SlotLeaderSkeleton,
  SlotLeaderTitle,
  CardItem,
  ValueCard,
} from "./styles";
import { routers } from "../../../commons/routers";

import { authAxios } from "../../../commons/utils/axios";
import Bookmark from "../BookmarkIcon";
interface DetailHeaderProps {
  loading: boolean;
  data?: TransactionHeaderDetail | BlockHeaderDetail | EpochHeaderDetail | null;
  listItem?: { icon: string; title: React.ReactNode; value?: React.ReactNode }[];
}

const DetailHeader: React.FC<DetailHeaderProps> = props => {
  const { data, loading, listItem } = props;
  const getRouterList = () => {
    if (data?.type === "transaction") return routers.TRANSACTION_LIST;
    if (data?.type === "block") return routers.BLOCK_LIST;
    if (data?.type === "epoch") return routers.EPOCH_LIST;
    else return "/";
  };

  if (loading || !data) {
    return (
      <HeaderDetailContainer>
        <BackButton to={getRouterList()}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
        <HeaderContainer>
          <HeaderTitle>
            <HeaderTitleSkeleton variant="rectangular" />
          </HeaderTitle>
        </HeaderContainer>
        <SlotLeader>
          <SlotLeaderSkeleton variant="rectangular" />
        </SlotLeader>
        <DetailsInfo container>
          <DetailsInfoItem item xs={12} sm center={1}>
            <ProgressSkeleton variant="circular" />
          </DetailsInfoItem>
          {new Array(4).fill(0).map((_, index) => {
            return (
              <DetailsInfoItem key={index} item xs={12} sm>
                <IconSkeleton variant="circular" />
                <DetailLabel>
                  <DetailValueSkeleton variant="rectangular" />
                </DetailLabel>
                <DetailValue>
                  <DetailLabelSkeleton variant="rectangular" />
                </DetailValue>
              </DetailsInfoItem>
            );
          })}
        </DetailsInfo>
      </HeaderDetailContainer>
    );
  }

  const { header, blockDetail } = data;
  const bookmarkData: { [key: string]: { keyword: string | number; type: "EPOCH" | "BLOCK" | "TRANSACTION" } } = {
    epoch: {
      keyword: blockDetail?.epochNo,
      type: "EPOCH",
    },
    block: {
      keyword: blockDetail?.blockNo,
      type: "BLOCK",
    },
    transaction: {
      keyword: header?.hash,
      type: "TRANSACTION",
    },
  };

  return (
    <HeaderDetailContainer>
      <Box display={"flex"} justifyContent="space-between" flexWrap={"wrap"}>
        <Box>
          <BackButton to={getRouterList()}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>{header.title}</HeaderTitle>
            <Bookmark {...bookmarkData[data?.type]} />
            {header.status && <HeaderStatus status={header.status}>{header.status}</HeaderStatus>}
            {header.epochStatus && (
              <HeaderStatus status={header.epochStatus}>{EPOCH_STATUS[header.epochStatus]}</HeaderStatus>
            )}
          </HeaderContainer>
          {header.hash && (
            <SlotLeader>
              {header.slotLeader && (
                <SlotLeaderTitle>{data.type === "block" ? "Block ID:" : "Slot leader:"}</SlotLeaderTitle>
              )}{" "}
              <SlotLeaderValue>{header.hash}</SlotLeaderValue>
              <SlotLeaderCopy text={header.hash} />
            </SlotLeader>
          )}
        </Box>
        <Box>
          <ProgressCircle size={120} pathWidth={8} percent={((blockDetail?.epochSlot || 0) / MAX_SLOT_EPOCH) * 100}>
            <EpochNumber>{blockDetail?.epochNo}</EpochNumber>
            <EpochText>Epoch</EpochText>
          </ProgressCircle>
        </Box>
      </Box>

      <DetailsInfo container>
        {listItem?.map((item, idx) => {
          return (
            <CardItem item sm={12} md={6} xl key={idx}>
              <Box>
                <img src={item.icon} alt="" height={20} />
              </Box>
              <Box my={1}>{item.title}</Box>
              <ValueCard>{item.value}</ValueCard>
            </CardItem>
          );
        })}
      </DetailsInfo>
    </HeaderDetailContainer>
  );
};

export default DetailHeader;
