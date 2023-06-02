import React, { useState } from "react";
import { Backdrop, Box, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { details } from "src/commons/routers";
import { RootState } from "src/stores/types";
import { EmptyIcon, SearchIcon } from "src/commons/resources";
import { formatDateTimeLocal, getShortHash, numberWithCommas } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";

import ProgressCircle from "../ProgressCircle";
import Bookmark from "../BookmarkIcon";
import CustomTooltip from "../CustomTooltip";
import FormNowMessage from "../FormNowMessage";
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
  WrapHeader,
  EpochDetail,
  TimeDuration
} from "./styles";

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
    key?: string;
    hideHeader?: boolean;
  }[];
  isHideButtonBack?: boolean;
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  const {
    loading,
    listItem,
    epoch,
    type,
    title,
    hash,
    transactionStatus,
    bookmarkData,
    stakeKeyStatus,
    isHideButtonBack,
    lastUpdated
  } = props;
  const history = useHistory();
  const theme = useTheme();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const [openBackdrop, setOpenBackdrop] = useState<any>({
    input: false,
    output: false
  });
  const { isMobile } = useScreen();

  const getHashLabel = () => {
    if (type === "BLOCK") return "Block Id";
    if (type === "STAKE_KEY") return "Stake key";
    if (type === "POOL") return "Pool Id";
    if (type === "TOKEN") return "Token ID";
  };
  const isDetailToken = type === "TOKEN";

  const hashLabel = getHashLabel();

  const numberOfItems = listItem.length;

  const handleClickItem = (link: string) => {
    history.push(link);
  };
  if (loading) {
    return (
      <HeaderDetailContainer>
        {isHideButtonBack === true ? null : (
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
        )}
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
                xs={isDetailToken && index === 0 ? 12 : 6}
                sm={isDetailToken && index === 0 ? 12 : 6}
                md={4}
                lg={numberOfItems > 6 ? 3 : true}
                items_length={numberOfItems}
                key={index}
                isDetailToken={isDetailToken}
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
      <WrapHeader>
        <Box width="100%">
          {isHideButtonBack === true ? null : (
            <BackButton onClick={history.goBack}>
              <HiArrowLongLeft />
              <BackText>Back</BackText>
            </BackButton>
          )}
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
              {isMobile ? (
                <CustomTooltip title={hash}>
                  <SlotLeaderValue>{getShortHash(hash)}</SlotLeaderValue>
                </CustomTooltip>
              ) : (
                <SlotLeaderValue>{hash}</SlotLeaderValue>
              )}
              <SlotLeaderCopy text={hash} />
            </SlotLeader>
          )}
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
        </Box>
        {epoch ? (
          <EpochDetail class-name="123">
            <ProgressCircle
              size={100}
              pathWidth={8}
              percent={
                currentEpoch && (epoch?.no || 0) === currentEpoch?.no
                  ? ((moment(formatDateTimeLocal(epoch?.endTime || "")).diff(moment()) > 0
                      ? epoch?.slot
                      : MAX_SLOT_EPOCH) /
                      MAX_SLOT_EPOCH) *
                    100
                  : 100
              }
            >
              <EpochNumber is_epoch={+(type === "EPOCH")} to={details.epoch(epoch.no || 0)}>
                {epoch?.no}
              </EpochNumber>
              <EpochText>Epoch</EpochText>
            </ProgressCircle>
          </EpochDetail>
        ) : (
          ""
        )}
      </WrapHeader>
      <DetailsInfo container items_length={numberOfItems}>
        {listItem.map((item, index) => {
          const keyItem = item.key || "";
          return (
            <CardItem
              item
              xs={isDetailToken && index === 0 ? 12 : 6}
              sm={isDetailToken && index === 0 ? 12 : 6}
              md={listItem.length === 4 ? 3 : 4}
              lg={numberOfItems > 6 ? 3 : true}
              items_length={numberOfItems}
              key={index}
              isDetailToken={isDetailToken}
            >
              <Box position="relative" display={item.hideHeader ? "none" : ""}>
                <img src={item.icon} alt="" height={20} />
                {item.allowSearch && keyItem && (
                  <AllowSearchButton
                    onClick={() => {
                      setOpenBackdrop((prev: any) => ({ ...prev, [keyItem]: true }));
                    }}
                  >
                    <SearchIcon stroke={theme.palette.grey[400]} />
                  </AllowSearchButton>
                )}
                {item.allowSearch && keyItem && openBackdrop[keyItem] && (
                  <StyledSelect
                    renderValue={() => "Token"}
                    displayEmpty
                    value={""}
                    onChange={() => {
                      //To do
                    }}
                    IconComponent={BiChevronDown}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 2,
                          marginTop: 0.5,
                          "&::-webkit-scrollbar": {
                            width: "5px"
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "transparent"
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "transparent"
                          },
                          "&:hover": {
                            "&::-webkit-scrollbar-thumb": {
                              background: theme.palette.grey[300]
                            },
                            "&::-webkit-scrollbar-track": {
                              background: theme.palette.grey[100]
                            }
                          }
                        }
                      }
                    }}
                  >
                    {!item?.dataSearch ||
                      (item?.dataSearch?.length === 0 && <Box height={"200px"} component={"img"} src={EmptyIcon} />)}
                    {item?.dataSearch &&
                      item?.dataSearch?.length > 0 &&
                      item?.dataSearch?.map((item, index) => (
                        <StyledMenuItem
                          onClick={() => {
                            handleClickItem(details.token(item?.assetId));
                          }}
                          key={index}
                        >
                          <Box mr={2} sx={{ maxWidth: "120px", textOverflow: "ellipsis", overflow: "hidden" }}>
                            {item.assetName}
                          </Box>
                          <Box fontWeight={500}>{numberWithCommas(item.assetQuantity)}</Box>
                        </StyledMenuItem>
                      ))}
                  </StyledSelect>
                )}
              </Box>
              <Box
                sx={{
                  my: 1,
                  [theme.breakpoints.down("md")]: {
                    mb: 0
                  }
                }}
              >
                {item.title}
              </Box>
              <ValueCard>{item.value}</ValueCard>
            </CardItem>
          );
        })}
      </DetailsInfo>
      <Backdrop
        sx={{ zIndex: 100 }}
        onClick={() => setOpenBackdrop({ input: false, output: false })}
        open={openBackdrop.input || openBackdrop.output}
      />
    </HeaderDetailContainer>
  );
};

export default DetailHeader;
