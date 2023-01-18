import React from "react";
import { CgClose } from "react-icons/cg";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { CubeIcon, RocketIcon } from "../../../commons/resources";
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
  InfoIcon,
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
  StyledViewMore,
} from "./styles";
import { ADAToken } from "../Token";
import useFetch from "../../../commons/hooks/useFetch";
import moment from "moment";
import { HiOutlineCube } from "react-icons/hi2";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADA, formatDateTimeLocal } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import { API } from "../../../commons/utils/api";

type DetailViewEpochProps = {
  epochNo: number;
  handleClose: () => void;
};

const DetailViewEpoch: React.FC<DetailViewEpochProps> = props => {
  const { epochNo, handleClose } = props;
  const { data } = useFetch<IDataEpoch>(epochNo ? `${API.EPOCH.DETAIL}/${epochNo}` : ``);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!epochNo} hideBackdrop variant="permanent">
        <ViewDetailContainer>
          <ViewDetailScroll>
            <StyledViewMore tooltipTitle="View Detail" to={details.epoch(epochNo)} />
            <CustomTooltip title="Close">
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
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
    data.status === "FINISHED"
      ? MAX_SLOT_EPOCH
      : (data?.endTime && data.startTime && moment(data.endTime).diff(data.startTime) / 1000) || 0;
  const progress = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(0);
  return (
    <ViewDetailDrawer anchor="right" open={!!epochNo} hideBackdrop variant="permanent">
      <ViewDetailContainer>
        <ViewDetailScroll>
          <StyledViewMore tooltipTitle="View Detail" to={details.epoch(epochNo)} />
          <CustomTooltip title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
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
              <ItemName>Block</ItemName>
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
              <DetailLabel>
                <InfoIcon />
                Start time
              </DetailLabel>
              <DetailValue>
                {formatDateTimeLocal(data.startTime || "")}
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                End time
              </DetailLabel>
              <DetailValue>
                {formatDateTimeLocal(data.endTime || "")}
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Blocks
              </DetailLabel>
              <DetailValue>{data.blkCount}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Total Output
              </DetailLabel>
              <DetailValue>
                {formatADA(data.outSum) || 0}
                <ADAToken color="black" />
              </DetailValue>
            </DetailsInfoItem>
          </Group>
          <Group>
            <DetailLink to={details.epoch(epochNo)}>
              <DetailLabel style={{ fontSize: 18 }}>
                <DetailLinkIcon>
                  <HiOutlineCube />
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
