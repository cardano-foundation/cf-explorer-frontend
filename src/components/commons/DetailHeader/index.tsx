import React, { memo, useState } from "react";
import { Backdrop, Box, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";

import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { details } from "src/commons/routers";
import { RootState } from "src/stores/types";
import { SearchIcon } from "src/commons/resources";
import { formatDateTimeLocal, formatNumberDivByDecimals, getShortHash } from "src/commons/utils/helper";
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
  TimeDuration,
  WrapLeaderValue
} from "./styles";
import NoRecord from "../NoRecord";
import CustomIcon from "../CustomIcon";

export interface DetailHeaderProps {
  type: Bookmark["type"];
  bookmarkData?: string;
  loading: boolean;
  title: number | string;
  lastUpdated?: number;
  hash?: string;
  transactionStatus?: TransactionStatus;
  stakeKeyStatus?: StakeStatus;
  epoch?: DetailHeaderBlock | null;
  listItem: {
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
    title: React.ReactNode;
    value?: React.ReactNode;
    strokeColor?: string;
    allowSearch?: boolean;
    dataSearch?: any[];
    isSent?: boolean;
    key?: string;
    hideHeader?: boolean;
  }[];
  isHideButtonBack?: boolean;
  isClickAble?: boolean;
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  const { t } = useTranslation();
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
    lastUpdated,
    isClickAble
  } = props;

  const history = useHistory();
  const theme = useTheme();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const [openBackdrop, setOpenBackdrop] = useState<{ [x: string]: boolean }>({
    input: false,
    output: false
  });
  const EPOCH_STATUS_MAPPING = {
    [EPOCH_STATUS.FINISHED]: t("common.epoch.finished"),
    [EPOCH_STATUS.IN_PROGRESS]: t("common.epoch.inProgress"),
    [EPOCH_STATUS.REWARDING]: t("common.epoch.rewarding"),
    [EPOCH_STATUS.SYNCING]: t("common.epoch.cyncing")
  };
  const { isMobile } = useScreen();

  const getHashLabel = () => {
    if (type === "BLOCK") return t("glossary.blockId");
    if (type === "STAKE_KEY") return t("glossary.stakeAddress");
    if (type === "POOL") return t("glossary.poolId");
    if (type === "TOKEN") return t("common.tokenID");
  };

  const isDetailToken = type === "TOKEN";

  const hashLabel = getHashLabel();

  const numberOfItems = listItem.length;
  const itemOnRow = isDetailToken ? 5 : 4;

  const handleClickItem = (link: string) => {
    history.push(link);
  };

  if (loading) {
    return (
      <HeaderDetailContainer>
        {isHideButtonBack === true ? null : (
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft />
            <BackText>{t("common.back")}</BackText>
          </BackButton>
        )}
        <HeaderContainer>
          <HeaderTitle>
            <HeaderTitleSkeleton variant="rectangular" />
          </HeaderTitle>
        </HeaderContainer>
        <DetailsInfo container length={numberOfItems}>
          {new Array(numberOfItems).fill(0).map((_, index) => {
            return (
              <CardItem
                item
                xs={isDetailToken && index === 0 ? 12 : 6}
                md={4}
                lg={numberOfItems > 6 ? 12 / itemOnRow : true}
                length={numberOfItems}
                key={index}
                wide={+isDetailToken}
                itemOnRow={itemOnRow}
              >
                <IconSkeleton variant="circular" />
                <DetailValueSkeleton variant="rectangular" />
                <ValueCard>
                  <DetailLabelSkeleton variant="rectangular" />
                </ValueCard>
              </CardItem>
            );
          })}
          <BufferList numberOfItems={numberOfItems} wide={+isDetailToken} itemOnRow={itemOnRow}>
            <IconSkeleton variant="circular" />
            <DetailValueSkeleton variant="rectangular" />
            <ValueCard>
              <DetailLabelSkeleton variant="rectangular" />
            </ValueCard>
          </BufferList>
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
              <HiArrowLongLeft color={theme.palette.secondary.light} />
              <BackText>{t("common.back")}</BackText>
            </BackButton>
          )}
          <HeaderContainer>
            <HeaderTitle>{title}</HeaderTitle>
            {bookmarkData && <Bookmark type={type} keyword={bookmarkData} />}
            {transactionStatus && <HeaderStatus status={transactionStatus}>{transactionStatus}</HeaderStatus>}
            {epoch?.status && (
              <HeaderStatus status={epoch.status}>{EPOCH_STATUS_MAPPING[EPOCH_STATUS[epoch.status]]}</HeaderStatus>
            )}
            {stakeKeyStatus && (
              <StakeKeyStatus status={stakeKeyStatus}>
                {stakeKeyStatus === "ACTIVE" ? t("status.active") : t("status.deActivated")}
              </StakeKeyStatus>
            )}
          </HeaderContainer>
          {hash && (
            <SlotLeader>
              {hashLabel ? <SlotLeaderTitle>{hashLabel}: </SlotLeaderTitle> : ""}
              <WrapLeaderValue>
                {isMobile ? (
                  <CustomTooltip title={hash}>
                    <SlotLeaderValue>{getShortHash(hash)}</SlotLeaderValue>
                  </CustomTooltip>
                ) : (
                  <SlotLeaderValue>{hash}</SlotLeaderValue>
                )}
                <SlotLeaderCopy text={hash} />
              </WrapLeaderValue>
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
                type === "EPOCH"
                  ? currentEpoch && (epoch?.no || 0) === currentEpoch?.no
                    ? ((moment(formatDateTimeLocal(epoch?.endTime || "")).diff(moment()) > 0 &&
                      epoch?.slot < MAX_SLOT_EPOCH
                        ? epoch?.slot
                        : MAX_SLOT_EPOCH) /
                        MAX_SLOT_EPOCH) *
                      100
                    : 100
                  : (epoch?.slot / MAX_SLOT_EPOCH) * 100
              }
            >
              <EpochNumber is_epoch={+(type === "EPOCH")} to={details.epoch(epoch.no || 0)}>
                {epoch?.no}
              </EpochNumber>
              <EpochText>{t("glossary.epoch")}</EpochText>
            </ProgressCircle>
          </EpochDetail>
        ) : (
          ""
        )}
      </WrapHeader>
      <DetailsInfo isClickAble={+Boolean(isClickAble)} container length={numberOfItems}>
        {listItem.map((item, index) => {
          const keyItem = item.key || "";
          return (
            <CardItem
              item
              xs={isDetailToken && index === 0 ? 12 : 6}
              sm={isDetailToken && index === 0 ? 12 : 6}
              md={numberOfItems === 4 ? 3 : 4}
              lg={numberOfItems > 6 ? 12 / itemOnRow : true}
              length={numberOfItems}
              key={index}
              wide={+isDetailToken}
              itemOnRow={itemOnRow}
            >
              <Box position="relative" display={item.hideHeader ? "none" : ""}>
                {item.icon ? (
                  typeof item.icon === "string" ? (
                    <img src={item.icon} alt="" height={20} />
                  ) : (
                    <CustomIcon
                      fill={!item.strokeColor ? theme.palette.secondary.main : ""}
                      stroke={item.strokeColor ? theme.palette.secondary.main : ""}
                      icon={item.icon}
                      height={22}
                    />
                  )
                ) : null}
                {item.allowSearch && keyItem && (
                  <AllowSearchButton
                    onClick={() => {
                      setOpenBackdrop((prev: any) => ({ ...prev, [keyItem]: true }));
                    }}
                  >
                    <SearchIcon stroke={theme.palette.secondary.light} fill={theme.palette.secondary[0]} />
                  </AllowSearchButton>
                )}
                {item.allowSearch && keyItem && openBackdrop[keyItem] && (
                  <StyledSelect
                    renderValue={() => "Token"}
                    displayEmpty
                    value={""}
                    IconComponent={BiChevronDown}
                    MenuProps={{
                      MenuListProps: {
                        sx: {
                          bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                        }
                      },
                      PaperProps: {
                        sx: {
                          borderRadius: 2,
                          bgcolor: ({ palette }) => `${palette.secondary[0]} !important`,
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
                              background: theme.palette.secondary.light
                            }
                          }
                        }
                      }
                    }}
                  >
                    {!item?.dataSearch || (item?.dataSearch?.length === 0 && <NoRecord />)}
                    {item?.dataSearch &&
                      item?.dataSearch?.length > 0 &&
                      item?.dataSearch?.map((item, index) => (
                        <StyledMenuItem
                          onClick={() => {
                            handleClickItem(details.token(item?.assetId));
                          }}
                          key={index}
                        >
                          <CustomTooltip title={item.assetName}>
                            <Box
                              color={({ palette }) => palette.secondary.main}
                              mr={2}
                              sx={{ maxWidth: "120px", textOverflow: "ellipsis", overflow: "hidden" }}
                            >
                              {item.assetName}
                            </Box>
                          </CustomTooltip>
                          <Box color={({ palette }) => palette.secondary.main} fontWeight={500}>
                            {formatNumberDivByDecimals(item?.assetQuantity || 0, item?.metadata?.decimals || 0)}
                          </Box>
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
        <BufferList numberOfItems={numberOfItems} wide={+isDetailToken} itemOnRow={itemOnRow} />
      </DetailsInfo>
      <Backdrop
        sx={{ zIndex: 100, touchAction: "none" }}
        onClick={() => setOpenBackdrop({ input: false, output: false })}
        open={openBackdrop.input || openBackdrop.output}
      />
    </HeaderDetailContainer>
  );
};
interface BufferListProps {
  numberOfItems: number;
  wide: number;
  itemOnRow: number;
  children?: React.ReactNode;
}

const BufferList = memo(({ numberOfItems, wide, children, itemOnRow }: BufferListProps) => {
  const { isTablet, isLaptop } = useScreen();
  const numberOfRow = isTablet ? 2 : isLaptop ? 3 : itemOnRow;
  // get number of buffer items. Ex: if numberOfItems = 8, first item token detail 2 slot (bufferWide = 1);
  const bufferWide = isTablet ? wide : 0;
  // numberOfRow in tablet screen is 2, numberOfBuffer is 1;
  const numberOfBuffer = numberOfRow - ((numberOfItems - bufferWide) % numberOfRow || numberOfRow);

  if ((isLaptop && numberOfItems > 4) || numberOfItems > 6)
    return (
      <>
        {new Array(numberOfBuffer).fill(0).map((_, index) => {
          return (
            <CardItem
              item
              xs={6}
              md={numberOfItems === 4 ? 3 : 4}
              lg={numberOfItems > 6 ? 12 / itemOnRow : true}
              length={numberOfItems + numberOfBuffer}
              key={index}
              wide={wide}
              itemOnRow={itemOnRow}
            >
              {children}
            </CardItem>
          );
        })}
      </>
    );
  else return null;
});

BufferList.displayName = "BufferList";

export default DetailHeader;
