import React from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
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
  StyledLink,
  DetailLinkName,
  ViewDetailScroll,
  ViewDetailHeader,
} from "./styles";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import CopyButton from "../CopyButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { API } from "../../../commons/utils/api";
import ViewAllButton from "../ViewAllButton";
import ADAicon from "../ADAIcon";

type DetailViewBlockProps = {
  blockNo: number | string;
  handleClose: () => void;
};

const DetailViewBlock: React.FC<DetailViewBlockProps> = props => {
  const { blockNo, handleClose } = props;
  const { data } = useFetch<BlockDetail>(`${API.BLOCK.DETAIL}/${blockNo}`);
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open hideBackdrop variant="permanent">
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle="View Detail" to={details.block(blockNo)} />
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
        <ViewMoreButton to={details.block(blockNo)} />
      </ViewDetailDrawer>
    );

  return (
    <ViewDetailDrawer anchor="right" open hideBackdrop variant="permanent">
      <ViewDetailHeader>
        <ViewAllButton tooltipTitle="View Detail" to={details.block(blockNo)} />
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
              percent={data.epochNo === currentEpoch?.no ? ((data.epochSlotNo || 0) / MAX_SLOT_EPOCH) * 100 : 100}
              trailOpacity={1}
            >
              <EpochNumber>{data.epochNo !== null ? data.epochNo : "_"}</EpochNumber>
              <EpochText>Epoch</EpochText>
            </ProgressCircle>
          </HeaderContainer>
          <ListItem>
            <Item>
              <Icon src={CubeIcon} alt="socket" />
              <ItemName>Block</ItemName>
              <ItemValue>{data.blockNo !== null ? data.blockNo : "_"}</ItemValue>
            </Item>
            <Item>
              <Icon src={RocketIcon} alt="socket" />
              <ItemName>slot</ItemName>
              <ItemValue>
                {data.epochSlotNo || 0}
                <BlockDefault>/{data.totalSlot || MAX_SLOT_EPOCH}</BlockDefault>
              </ItemValue>
            </Item>
          </ListItem>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Block ID
              </DetailLabel>
              <DetailValue>
                <CustomTooltip title={data.hash}>
                  <StyledLink to={details.block(blockNo)}>{getShortHash(data.hash)}</StyledLink>
                </CustomTooltip>
                <CopyButton text={data.hash} />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Created at
              </DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.time || "")}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Transaction
              </DetailLabel>
              <DetailValue>{data.txCount}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Transaction Fees
              </DetailLabel>
              <DetailValue>
                {formatADAFull(data.totalFees)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Total Output
              </DetailLabel>
              <DetailValue>
                {formatADAFull(data.totalOutput)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            {/* <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Slot leader
              </DetailLabel>
              <DetailValue>
                <CustomTooltip title={data.slotLeader}>
                  <Box component={"span"}>{getShortWallet(data.slotLeader)}</Box>
                </CustomTooltip>
                <CopyButton text={data.slotLeader} />
              </DetailValue>
            </DetailsInfoItem> */}
          </Group>
          <Group>
            <DetailLink to={details.block(blockNo)}>
              <DetailLabel>
                <DetailLinkIcon>
                  <CgArrowsExchange />
                </DetailLinkIcon>
                <DetailLinkName>Transactions</DetailLinkName>
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
    </ViewDetailDrawer>
  );
};

export default DetailViewBlock;
