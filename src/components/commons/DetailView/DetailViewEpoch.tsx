import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { BiChevronRight } from "react-icons/bi";
import { useSelector } from "react-redux";
import moment from "moment";
import { Box } from "@mui/material";

import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { BlockIcon, CubeIcon, RocketIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";

import ProgressCircle from "../ProgressCircle";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import ViewAllButton from "../ViewAllButton";
import ADAicon from "../ADAIcon";
import FormNowMessage from "../FormNowMessage";
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
  ViewDetailScroll,
  ViewDetailHeader,
  TimeDuration
} from "./styles";

type DetailViewEpochProps = {
  epochNo: number;
  handleClose: () => void;
  callback: (callback: (data: IDataEpoch[]) => IDataEpoch[]) => void;
};

const DetailViewEpoch: React.FC<DetailViewEpochProps> = ({ epochNo, handleClose, callback }) => {
  const { currentEpoch, blockNo } = useSelector(({ system }: RootState) => system);
  const { data, lastUpdated } = useFetch<IDataEpoch>(
    `${API.EPOCH.DETAIL}/${epochNo}`,
    undefined,
    false,
    epochNo === currentEpoch?.no ? blockNo : 0
  );

  useEffect(() => {
    if (data) {
      callback((list) => {
        const index = list.findIndex((item) => item.no === data?.no);
        if (index >= 0) list[index] = { ...list[index], ...data };
        return [...list];
      });
    }
  }, [data, callback]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open hideBackdrop variant="permanent">
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle="View Detail" to={details.epoch(epochNo)} />
          <CustomTooltip title="Close">
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
        <ViewMoreButton to={details.epoch(epochNo)} />
      </ViewDetailDrawer>
    );

  const slot =
    data.no === currentEpoch?.no
      ? moment(formatDateTimeLocal(data.endTime)).diff(moment()) >= 0
        ? currentEpoch.slot
        : data.maxSlot || MAX_SLOT_EPOCH
      : data.maxSlot || MAX_SLOT_EPOCH;

  const progress = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(0);
  return (
    <ViewDetailDrawer anchor="right" open hideBackdrop variant="permanent">
      <ViewDetailHeader>
        <ViewAllButton tooltipTitle="View Detail" to={details.epoch(epochNo)} />
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <CustomTooltip title="Close">
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
              percent={progress}
              trailOpacity={1}
            >
              <EpochNumber>{epochNo}</EpochNumber>
              <EpochText>Epoch</EpochText>
            </ProgressCircle>
          </HeaderContainer>
          <ListItem>
            <Item>
              <Icon src={CubeIcon} alt="socket" />
              <ItemName>Blocks</ItemName>
              <ItemValue>{data.blkCount}</ItemValue>
            </Item>
            <Item>
              <Icon src={RocketIcon} alt="socket" />
              <ItemName>slot</ItemName>
              <ItemValue>
                {slot}
                <BlockDefault>/{MAX_SLOT_EPOCH}</BlockDefault>
              </ItemValue>
            </Item>
          </ListItem>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>Start Timestamp</DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.startTime || "")}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>End Timestamp</DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.endTime || "")}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Blocks</DetailLabel>
              <DetailValue>{data.blkCount}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Unique Accounts</DetailLabel>
              <DetailValue>{data.account}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Tx Count</DetailLabel>
              <DetailValue>{data.txCount}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Rewards Distributed</DetailLabel>
              <DetailValue>
                {data?.rewardsDistributed ? (
                  <Box>
                    {formatADAFull(data?.rewardsDistributed)}&nbsp;
                    <ADAicon />
                  </Box>
                ) : (
                  "Not available"
                )}
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Total Output</DetailLabel>
              <DetailValue>
                {formatADAFull(data.outSum)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
          </Group>
          <Group>
            <DetailLink to={details.epoch(epochNo)}>
              <DetailLabel style={{ fontSize: 18 }}>
                <DetailLinkIcon>
                  <BlockIcon />
                </DetailLinkIcon>
                Blocks
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
      <ViewMoreButton to={details.epoch(epochNo)} />
    </ViewDetailDrawer>
  );
};

export default DetailViewEpoch;
