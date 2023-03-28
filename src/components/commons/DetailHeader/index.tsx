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
  SlotLeader,
  SlotLeaderValue,
  SlotLeaderCopy,
  HeaderTitleSkeleton,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  SlotLeaderTitle,
  ValueCard,
  CardItem,
  StakeKeyStatus,
} from "./styles";
import { details, routers } from "../../../commons/routers";
import Bookmark from "../BookmarkIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";

interface DetailHeaderProps {
  type: Bookmark["type"];
  bookmarkData: string;
  loading: boolean;
  title: number | string;
  hash?: string;
  transactionStatus?: keyof typeof TransactionStatus;
  stakeKeyStatus?: StakeStatus;
  epoch?: DetailHeaderBlock | null;
  listItem: { icon: string; title: React.ReactNode; value?: React.ReactNode }[];
}

const DetailHeader: React.FC<DetailHeaderProps> = props => {
  const { loading, listItem, epoch, type, title, hash, transactionStatus, bookmarkData, stakeKeyStatus } = props;

  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  const getRouterList = () => {
    if (type === "TRANSACTION") return routers.TRANSACTION_LIST;
    if (type === "BLOCK") return routers.BLOCK_LIST;
    if (type === "EPOCH") return routers.EPOCH_LIST;
    if (type === "STAKE_KEY") return routers.STAKE_LIST.replace(":poolType?", "");
    else return "/";
  };

  const getHashLabel = () => {
    if (type === "BLOCK") return "Block ID";
    if (type === "STAKE_KEY") return "Token ID";
    if (type === "POOL") return "Pool ID";
  };

  const hashLabel = getHashLabel();

  const numberOfItems = listItem.length;
  if (loading) {
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
        <DetailsInfo container numberOfItems={numberOfItems}>
          {new Array(4).fill(0).map((_, index) => {
            return (
              <CardItem
                item
                xs={12}
                sm={6}
                md={4}
                lg={numberOfItems > 6 ? 3 : true}
                numberOfItems={numberOfItems}
                key={index}
              >
                <IconSkeleton variant="circular" />
                <DetailValueSkeleton variant="rectangular" />
                <ValueCard>
                  <DetailLabelSkeleton variant="rectangular" />
                </ValueCard>
              </CardItem>
            );
          })}
        </DetailsInfo>
      </HeaderDetailContainer>
    );
  }

  return (
    <HeaderDetailContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap={"wrap"}>
        <Box>
          <BackButton to={getRouterList()}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>{title}</HeaderTitle>
            <Bookmark type={type} keyword={bookmarkData} />
            {transactionStatus && <HeaderStatus status={transactionStatus}>{transactionStatus}</HeaderStatus>}
            {epoch?.status && <HeaderStatus status={epoch.status}>{EPOCH_STATUS[epoch.status]}</HeaderStatus>}
            {stakeKeyStatus && <StakeKeyStatus status={stakeKeyStatus}>{stakeKeyStatus}</StakeKeyStatus>}
          </HeaderContainer>
          {hash && (
            <SlotLeader>
              {hashLabel ? <SlotLeaderTitle>{hashLabel}: </SlotLeaderTitle> : ""}
              <SlotLeaderValue>{hash}</SlotLeaderValue>
              <SlotLeaderCopy text={hash} />
            </SlotLeader>
          )}
        </Box>
        {epoch ? (
          <Box>
            <ProgressCircle
              size={100}
              pathWidth={8}
              percent={
                currentEpoch && (epoch?.no || 0) < currentEpoch?.no ? 100 : ((epoch?.slot || 0) / MAX_SLOT_EPOCH) * 100
              }
            >
              <EpochNumber to={details.epoch(epoch.no || 0)}>{epoch?.no}</EpochNumber>
              <EpochText>Epoch</EpochText>
            </ProgressCircle>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <DetailsInfo container numberOfItems={numberOfItems}>
        {listItem.map((item, index) => {
          return (
            <CardItem
              item
              xs={12}
              sm={6}
              md={listItem.length === 4 ? 3 : 4}
              lg={numberOfItems > 6 ? 3 : true}
              numberOfItems={numberOfItems}
              key={index}
            >
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
