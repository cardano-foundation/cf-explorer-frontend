import React, { useEffect } from "react";
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
  ViewDetailHeader,
} from "./styles";
import { ADAToken } from "../Token";
import useFetch from "../../../commons/hooks/useFetch";
import { HiOutlineCube } from "react-icons/hi2";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADAFull, formatDateTimeLocal } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import { API } from "../../../commons/utils/api";
import { useSelector } from "react-redux";
import ViewAllButton from "../ViewAllButton";

type DetailViewEpochProps = {
  epochNo: number;
  handleClose: () => void;
  callback: (callback: (data: IDataEpoch[]) => IDataEpoch[]) => void;
};

const DetailViewEpoch: React.FC<DetailViewEpochProps> = ({ epochNo, handleClose, callback }) => {
  const { data } = useFetch<IDataEpoch>(`${API.EPOCH.DETAIL}/${epochNo}`);
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  useEffect(() => {
    if (data) {
      callback(list => {
        const index = list.findIndex(item => item.no === data?.no);
        if (index >= 0) list[index] = { ...list[index], ...data };
        return [...list];
      });
    }
  }, [data, callback]);

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

  const slot = data.no === currentEpoch?.no ? currentEpoch.slot : MAX_SLOT_EPOCH;

  const progress = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(0);
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
              <DetailValue>{formatDateTimeLocal(data.startTime || "")}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                End time
              </DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.endTime || "")}</DetailValue>
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
                {formatADAFull(data.outSum)}
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
