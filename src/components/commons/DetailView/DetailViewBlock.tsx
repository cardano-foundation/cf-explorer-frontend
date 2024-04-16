import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronRight } from "react-icons/bi";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { CubeIconComponent, RocketIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, formatNameBlockNo, getShortHash } from "src/commons/utils/helper";
import { RootState } from "src/stores/types";

import ADAicon from "../ADAIcon";
import CopyButton from "../CopyButton";
import CustomIcon from "../CustomIcon";
import CustomTooltip from "../CustomTooltip";
import FormNowMessage from "../FormNowMessage";
import ProgressCircle from "../ProgressCircle";
import ViewAllButton from "../ViewAllButton";
import ViewMoreButton from "../ViewMoreButton";
import {
  BlockDefault,
  CloseButton,
  DetailLabel,
  DetailLabelSkeleton,
  DetailLink,
  DetailLinkIcon,
  DetailLinkName,
  DetailLinkRight,
  DetailValue,
  DetailValueSkeleton,
  DetailsInfoItem,
  EpochNumber,
  EpochText,
  Group,
  HeaderContainer,
  IconSkeleton,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  ProgressSkeleton,
  StyledLink,
  TimeDuration,
  ViewDetailContainer,
  ViewDetailDrawer,
  ViewDetailHeader,
  ViewDetailScroll
} from "./styles";
import DatetimeTypeTooltip from "../DatetimeTypeTooltip";

type DetailViewBlockProps = {
  blockNo?: number | string;
  handleClose: () => void;
  open?: boolean;
};

const DetailViewBlock: React.FC<DetailViewBlockProps> = (props) => {
  const { t } = useTranslation();
  const { blockNo, handleClose, open } = props;
  const theme = useTheme();
  const currentBlockNo = useSelector(({ system }: RootState) => system.blockNo);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const [lastUpdated, setLastUpdated] = useState<number>();
  const [urlFetch, setUrlFetch] = useState("");
  const { data, loading } = useFetch<BlockDetail>(urlFetch, undefined, false);
  useEffect(() => {
    if (data) setLastUpdated(Date.now());
  }, [data, currentBlockNo]);

  useEffect(() => {
    if (!blockNo) {
      setUrlFetch("");
    } else {
      setUrlFetch(`${API.BLOCK.DETAIL}/${blockNo}`);
    }
  }, [blockNo]);

  const renderContent = () => {
    if (!data || loading || !epochNo) {
      return (
        <>
          <ViewDetailHeader>
            <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.block(blockNo)} />
            <CustomTooltip title={t("common.close")}>
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
          </ViewDetailHeader>
          <ViewDetailContainer>
            <ViewDetailScroll>
              <HeaderContainer>
                <ProgressSkeleton variant="circular" />
              </HeaderContainer>
              <ListItem>
                <Item>
                  <IconSkeleton variant="circular" />
                  <ItemName>
                    <DetailValueSkeleton variant="rectangular" />
                  </ItemName>
                  <ItemValue>
                    <DetailLabelSkeleton variant="rectangular" />
                  </ItemValue>
                </Item>
                <Item>
                  <IconSkeleton variant="circular" />
                  <ItemName>
                    <DetailValueSkeleton variant="rectangular" />
                  </ItemName>
                  <ItemValue>
                    <DetailLabelSkeleton variant="rectangular" />
                  </ItemValue>
                </Item>
              </ListItem>
              <Group>
                {new Array(4).fill(0).map((_, index) => {
                  return (
                    <DetailsInfoItem key={index}>
                      <DetailLabel>
                        <DetailValueSkeleton variant="rectangular" />
                      </DetailLabel>
                      <DetailValue>
                        <DetailLabelSkeleton variant="rectangular" />
                      </DetailValue>
                    </DetailsInfoItem>
                  );
                })}
              </Group>
              {new Array(2).fill(0).map((_, index) => {
                return (
                  <Group key={index}>
                    <DetailsInfoItem>
                      <DetailLabel>
                        <DetailValueSkeleton variant="rectangular" />
                      </DetailLabel>
                      <DetailValue>
                        <DetailLabelSkeleton variant="rectangular" />
                      </DetailValue>
                    </DetailsInfoItem>
                  </Group>
                );
              })}
            </ViewDetailScroll>
          </ViewDetailContainer>
          <ViewMoreButton to={details.block(blockNo)} />
        </>
      );
    }
    const { blockName, tooltip } = formatNameBlockNo(data?.blockNo, data?.epochNo);
    const confirmation = Math.max(0, currentBlockNo ? currentBlockNo - (data.blockNo || 0) : data.confirmation);
    return (
      <>
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.block(blockNo)} />
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <CustomTooltip title={t("common.close")}>
            <CloseButton onClick={handleClose}>
              <CgClose color={theme.palette.secondary.light} />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
        <ViewDetailContainer>
          <ViewDetailScroll>
            <HeaderContainer>
              <ProgressCircle
                size={150}
                pathLineCap="butt"
                pathWidth={4}
                trailWidth={2}
                percent={data?.epochNo === epochNo ? ((data?.epochSlotNo || 0) / MAX_SLOT_EPOCH) * 100 : 100}
                trailOpacity={1}
              >
                <EpochNumber>{data?.epochNo !== null ? data?.epochNo : "_"}</EpochNumber>
                <EpochText>{t("glossary.epoch")}</EpochText>
              </ProgressCircle>
            </HeaderContainer>
            <ListItem>
              <Item>
                <CustomIcon
                  icon={CubeIconComponent}
                  height={30}
                  fill={theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white}
                />
                <ItemName>{t("glossary.block")}</ItemName>
                <CustomTooltip title={tooltip}>
                  <ItemValue sx={{ textTransform: "none" }}>{blockName}</ItemValue>
                </CustomTooltip>
              </Item>
              <Item>
                <CustomIcon
                  icon={RocketIcon}
                  height={30}
                  fill={theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white}
                />
                <ItemName>{t("common.slot")}</ItemName>
                <ItemValue>
                  {data?.epochNo}
                  <BlockDefault>/{data?.epochSlotNo}</BlockDefault>
                </ItemValue>
              </Item>
            </ListItem>
            <Group>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.blockId")}</DetailLabel>
                <DetailValue>
                  <CustomTooltip title={data?.hash}>
                    <StyledLink to={details.block(blockNo)}>{getShortHash(data?.hash)}</StyledLink>
                  </CustomTooltip>
                  <CopyButton text={data?.hash} />
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.absoluteSlot")}</DetailLabel>
                <DetailValue>{data.slotNo}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("createdAt")}</DetailLabel>
                <DatetimeTypeTooltip>
                  <DetailValue>{formatDateTimeLocal(data.time || "")}</DetailValue>
                </DatetimeTypeTooltip>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{confirmation > 1 ? t("glossary.comfirmations") : t("glossary.comfirmation")}</DetailLabel>
                <DetailValue>{confirmation}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.transactionfees")}</DetailLabel>
                <DetailValue>
                  {formatADAFull(data?.totalFees)}
                  <ADAicon />
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.totalOutputInAda")}</DetailLabel>
                <DetailValue>
                  {formatADAFull(data?.totalOutput)}
                  <ADAicon />
                </DetailValue>
              </DetailsInfoItem>
            </Group>
            <Group>
              <DetailLink to={details.block(blockNo)}>
                <DetailLabel>
                  <DetailLinkIcon>
                    <CgArrowsExchange />
                  </DetailLinkIcon>
                  <DetailLinkName>{t("glossary.transactions")}</DetailLinkName>
                </DetailLabel>
                <DetailValue>
                  <DetailLinkRight>
                    <BiChevronRight size={24} />
                  </DetailLinkRight>
                </DetailValue>
              </DetailLink>
            </Group>
          </ViewDetailScroll>
        </ViewDetailContainer>
        <ViewMoreButton to={details.block(blockNo)} />
      </>
    );
  };

  return (
    <ViewDetailDrawer anchor="right" open={Boolean(open && blockNo)} variant="temporary" onClose={handleClose}>
      {renderContent()}
    </ViewDetailDrawer>
  );
};

export default DetailViewBlock;
