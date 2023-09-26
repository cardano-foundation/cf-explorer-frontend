import React, { useEffect, useState } from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { BiChevronRight } from "react-icons/bi";
import { useTranslation } from "react-i18next";

import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { CubeIcon, RocketIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, formatNameBlockNo, getShortHash } from "src/commons/utils/helper";
import { RootState } from "src/stores/types";
import { API } from "src/commons/utils/api";

import ProgressCircle from "../ProgressCircle";
import {
  CloseButton,
  EpochNumber,
  EpochText,
  HeaderContainer,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  Icon,
  BlockDefault,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ProgressSkeleton,
  ViewDetailDrawer,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  Group,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
  StyledLink,
  DetailLinkName,
  ViewDetailHeader,
  ViewDetailScroll,
  TimeDuration
} from "./styles";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import CopyButton from "../CopyButton";
import ViewAllButton from "../ViewAllButton";
import ADAicon from "../ADAIcon";
import FormNowMessage from "../FormNowMessage";

type DetailViewBlockProps = {
  blockNo?: number | string;
  handleClose: () => void;
  open?: boolean;
};

const DetailViewBlock: React.FC<DetailViewBlockProps> = (props) => {
  const { t } = useTranslation();
  const { blockNo, handleClose, open } = props;
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

  useEffect(() => {
    if (open && blockNo) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [open, blockNo]);
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
              <CgClose />
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
                <Icon src={CubeIcon} alt="socket" />
                <ItemName>{t("glossary.block")}</ItemName>
                <CustomTooltip title={tooltip}>
                  <ItemValue sx={{ textTransform: "none" }}>{blockName}</ItemValue>
                </CustomTooltip>
              </Item>
              <Item>
                <Icon src={RocketIcon} alt="socket" />
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
                <DetailLabel>{t("createdAt")}</DetailLabel>
                <DetailValue>{formatDateTimeLocal(data.time || "")}</DetailValue>
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
    <ViewDetailDrawer anchor="right" open={Boolean(open && blockNo)} variant="persistent" hideBackdrop>
      {renderContent()}
    </ViewDetailDrawer>
  );
};

export default DetailViewBlock;
