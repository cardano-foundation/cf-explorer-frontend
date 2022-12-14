import React from "react";
import { CgClose } from "react-icons/cg";
import { CONFIRMATION_STATUS, EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { RocketIcon } from "../../../commons/resources";
import ProgressCircle from "../ProgressCircle";
import {
  CloseButton,
  EpochNumber,
  EpochText,
  HeaderContainer,
  HeaderTitle,
  ViewDetailContainer,
  DetailsInfo,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  Icon,
  BlockDefault,
  SlotLeader,
  InfoIcon,
  HeaderTitleSkeleton,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ProgressSkeleton,
  SlotLeaderSkeleton,
  ProgressLiner,
  ProgressStatusText,
  ProgressPercent,
  ViewDetailDrawer,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  Group,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
} from "./styles";
import { ADAToken } from "../Token";
import NotFound from "../../../pages/NotFound";
import useFetch from "../../../commons/hooks/useFetch";
import { getShortHash } from "../../../commons/utils/helper";
import moment from "moment";
import { HiOutlineCube } from "react-icons/hi2";
import { BiChevronRight } from "react-icons/bi";

type DetailViewProps = { handleClose: () => void } & (
  | { type: "block" | "epoch"; id: number }
  | { type: "tx"; id: string }
);

type DataDetail = BlockDetail | IDataEpoch | Transaction;

const DetailView: React.FC<DetailViewProps> = props => {
  const { id, type, handleClose } = props;
  const { loading, data } = useFetch<DataDetail>(id ? `${type}/${id}` : ``);

  if (!loading && !data) return <NotFound />;

  const getData = (data: DataDetail) => {
    switch (type) {
      case "block":
        const block = data as BlockDetail;
        return {
          type: "block",
          header: {
            title: block.blockNo,
            hash: block.hash,
            slotLeader: true,
          },

          blockDetail: {
            epochNo: block.epochNo,
            epochSlot: block.epochSlotNo,
            maxEpochSlot: block.totalSlot,
            blockNo: block.blockNo,
          },
          transactionFees: {
            fee: block.totalFees,
            token: "ADA",
          },
          totalOutput: {
            totalOutput: block.totalOutput,
            token: "ADA",
          },
        };
      case "tx":
        const transaction = data as Transaction;
        return {
          type: "transaction",
          header: {
            title: getShortHash(transaction.tx.hash),
            hash: transaction.tx.hash,
            status: transaction.tx.status,
          },

          blockDetail: {
            epochNo: transaction.tx.epochNo,
            epochSlot: transaction.tx.epochSlot,
            maxEpochSlot: transaction.tx.maxEpochSlot,
            blockNo: transaction.tx.blockNo,
          },
          confirmation: {
            confirmation: transaction.tx.confirmation,
            status: CONFIRMATION_STATUS.MEDIUM,
          },
          transactionFees: {
            fee: transaction.tx.fee,
            token: "ADA",
          },
        };
      default:
        const epoch = data as IDataEpoch;
        const slot = (epoch?.endTime && epoch.startTime && moment(epoch.endTime).diff(epoch.startTime) / 1000) || 0;
        const progress = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(0);
        return {
          type: "epoch",
          header: {
            title: epoch.no,
            hash: "",
          },
          epochDetail: {
            startTime: epoch.startTime,
            endTime: epoch.endTime,
          },
          blockDetail: {
            epochNo: epoch.no,
            epochSlot: epoch.epochSlotNo,
            blockNo: epoch.blkCount,
          },
          totalOutput: {
            totalOutput: 0,
            token: "ADA",
          },
          progress: {
            progress,
            status: epoch.status,
          },
        };
    }
  };
  const renderDetail = (data: DataDetail) => {
    const dataDetail = getData(data);
    console.log(dataDetail);
    const { header, blockDetail, confirmation, transactionFees, totalOutput, progress, epochDetail } = dataDetail;
    return (
      <ViewDetailContainer>
        <CloseButton onClick={handleClose}>
          <CgClose />
        </CloseButton>
        <HeaderContainer>
          <ProgressCircle
            size={150}
            pathLineCap="butt"
            pathWidth={4}
            trailWidth={2}
            percent={progress?.progress || 0}
            trailOpacity={1}
          >
            <EpochNumber>{blockDetail.epochNo}</EpochNumber>
            <EpochText>Epoch</EpochText>
          </ProgressCircle>
        </HeaderContainer>
        <ListItem>
          <Item>
            <Icon src={RocketIcon} alt="socket" />
            <ItemName>Block</ItemName>
            <ItemValue>{blockDetail.blockNo}</ItemValue>
          </Item>
          <Item>
            <Icon src={RocketIcon} alt="socket" />
            <ItemName>slot</ItemName>
            <ItemValue>
              {blockDetail.epochSlot}
              <BlockDefault>/{blockDetail.maxEpochSlot || MAX_SLOT_EPOCH}</BlockDefault>
            </ItemValue>
          </Item>
        </ListItem>
        <Group>
          {epochDetail && (
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Start time
              </DetailLabel>
              <DetailValue>{epochDetail.startTime}</DetailValue>
            </DetailsInfoItem>
          )}
          {epochDetail && (
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                End time
              </DetailLabel>
              <DetailValue>{epochDetail.endTime}</DetailValue>
            </DetailsInfoItem>
          )}
          {blockDetail && (
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Blocks
              </DetailLabel>
              <DetailValue>{blockDetail.blockNo}</DetailValue>
            </DetailsInfoItem>
          )}
          {totalOutput && (
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Total Output
              </DetailLabel>
              <DetailValue>
                {`${totalOutput.totalOutput} ${totalOutput.token}`}
                <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
              </DetailValue>
            </DetailsInfoItem>
          )}
        </Group>
        <Group>
          {progress && <ProgressLiner progress={progress.progress} />}
          {progress && (
            <DetailsInfoItem>
              <DetailLabel>
                <ProgressStatusText>{EPOCH_STATUS[progress.status]}</ProgressStatusText>
              </DetailLabel>
              <DetailValue>
                <ProgressPercent>{progress.progress}%</ProgressPercent>
              </DetailValue>
            </DetailsInfoItem>
          )}
        </Group>
        {type === "epoch" && (
          <Group>
            <DetailLink to={"/"}>
              <DetailLabel>
                <DetailLinkIcon>
                  <HiOutlineCube />
                </DetailLinkIcon>
                Block
              </DetailLabel>
              <DetailValue>
              <DetailLinkRight>
                <BiChevronRight size={24} />
              </DetailLinkRight>
              </DetailValue>
            </DetailLink>
          </Group>
        )}
      </ViewDetailContainer>
    );
  };

  return (
    <ViewDetailDrawer anchor="right" open={!!id} hideBackdrop variant="permanent">
      {data ? (
        renderDetail(data)
      ) : (
        <ViewDetailContainer>
          <CloseButton onClick={handleClose}>
            <CgClose />
          </CloseButton>
          <HeaderContainer>
            <HeaderTitle>
              <HeaderTitleSkeleton variant="rectangular" />
            </HeaderTitle>
          </HeaderContainer>
          <SlotLeader>
            <SlotLeaderSkeleton variant="rectangular" />
          </SlotLeader>
          <DetailsInfo container>
            <DetailsInfoItem>
              <ProgressSkeleton variant="circular" />
            </DetailsInfoItem>
            {new Array(4).fill(0).map((_, index) => {
              return (
                <DetailsInfoItem key={index}>
                  <IconSkeleton variant="circular" />
                  <DetailLabel>
                    <DetailValueSkeleton variant="rectangular" />
                  </DetailLabel>
                  <DetailValue>
                    <DetailLabelSkeleton variant="rectangular" />
                  </DetailValue>
                </DetailsInfoItem>
              );
            })}
          </DetailsInfo>
        </ViewDetailContainer>
      )}
    </ViewDetailDrawer>
  );
};

export default DetailView;
