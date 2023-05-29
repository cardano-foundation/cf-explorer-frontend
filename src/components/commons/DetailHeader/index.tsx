import React, { useState } from "react";
import { Backdrop, Box, MenuItem, OutlinedInput, useTheme } from "@mui/material";

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
  AllowSearchButton,
  StyledSelect,
  StyledMenuItem,
  TimeDuration,
} from "./styles";
import { details, routers } from "../../../commons/routers";
import Bookmark from "../BookmarkIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { useHistory } from "react-router-dom";
import { SearchIcon } from "../../../commons/resources";
import { BiChevronDown } from "react-icons/bi";
import { numberWithCommas } from "../../../commons/utils/helper";
import moment from "moment";

interface DetailHeaderProps {
  type: Bookmark["type"];
  bookmarkData?: string;
  loading: boolean;
  title: number | string;
  lastUpdated?: number;
  hash?: string;
  transactionStatus?: keyof typeof TransactionStatus;
  stakeKeyStatus?: StakeStatus;
  epoch?: DetailHeaderBlock | null;
  listItem: {
    icon: string;
    title: React.ReactNode;
    value?: React.ReactNode;
    allowSearch?: boolean;
    dataSearch?: any[];
    isSent?: boolean;
  }[];
}

const DetailHeader: React.FC<DetailHeaderProps> = props => {
  const { loading, listItem, epoch, type, title, hash, transactionStatus, bookmarkData, stakeKeyStatus, lastUpdated } =
    props;
  const history = useHistory();
  const theme = useTheme();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const getHashLabel = () => {
    if (type === "BLOCK") return "Block Id";
    if (type === "STAKE_KEY") return "Token Id";
    if (type === "POOL") return "Pool Id";
    if (type === "TOKEN") return "Token ID";
  };

  const hashLabel = getHashLabel();

  const numberOfItems = listItem.length;
  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
        <HeaderContainer>
          <HeaderTitle>
            <HeaderTitleSkeleton variant="rectangular" />
          </HeaderTitle>
        </HeaderContainer>
        <DetailsInfo container items_length={numberOfItems}>
          {new Array(4).fill(0).map((_, index) => {
            return (
              <CardItem
                item
                xs={12}
                sm={6}
                md={4}
                lg={numberOfItems > 6 ? 3 : true}
                items_length={numberOfItems}
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
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>{title}</HeaderTitle>
            {bookmarkData && <Bookmark type={type} keyword={bookmarkData} />}
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
          {!!lastUpdated && <TimeDuration>Last updated {moment(lastUpdated).fromNow()}</TimeDuration>}
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
              <EpochNumber is_epoch={+(type === "EPOCH")} to={details.epoch(epoch.no || 0)}>
                {epoch?.no}
              </EpochNumber>
              <EpochText>Epoch</EpochText>
            </ProgressCircle>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <DetailsInfo container items_length={numberOfItems}>
        {listItem.map((item, index) => {
          return (
            <CardItem
              item
              xs={12}
              sm={6}
              md={listItem.length === 4 ? 3 : 4}
              lg={numberOfItems > 6 ? 3 : true}
              items_length={numberOfItems}
              key={index}
            >
              <Box position="relative">
                <img src={item.icon} alt="" height={20} />
                {item.allowSearch && (
                  <AllowSearchButton onClick={() => setOpenBackdrop(true)}>
                    <SearchIcon stroke={theme.palette.grey[400]} />
                  </AllowSearchButton>
                )}
                {item.allowSearch && openBackdrop && (
                  <StyledSelect
                    renderValue={() => (item.isSent ? "Received Token" : "Sent Token")}
                    displayEmpty
                    value={""}
                    onChange={() => {}}
                    IconComponent={BiChevronDown}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 2,
                          marginTop: 0.5,
                        },
                      },
                    }}
                  >
                    {item?.dataSearch?.map((item, index) => (
                      <StyledMenuItem onClick={() => {}} key={index}>
                        <Box>{item.assetName}</Box>
                        <Box fontWeight={600}>
                          {item.isSent ? "-" : "+"}
                          {numberWithCommas(item.assetQuantity)}
                        </Box>
                      </StyledMenuItem>
                    ))}
                  </StyledSelect>
                )}
              </Box>
              <Box my={1}>{item.title}</Box>
              <ValueCard>{item.value}</ValueCard>
            </CardItem>
          );
        })}
      </DetailsInfo>
      <Backdrop sx={{ zIndex: 100 }} onClick={() => setOpenBackdrop(false)} open={openBackdrop} />
    </HeaderDetailContainer>
  );
};

export default DetailHeader;
