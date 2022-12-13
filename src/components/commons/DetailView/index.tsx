import React from "react";
import { Drawer, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { CONFIRMATION_STATUS, EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { CheckCircleIcon, CubeIcon, ExchangeIcon, OutputIcon, RocketIcon } from "../../../commons/resources";
import ProgressCircle from "../ProgressCircle";
import {
  CloseButton,
  BackText,
  EpochNumber,
  EpochText,
  HeaderContainer,
  HeaderStatus,
  HeaderTitle,
  ViewDetailContainer,
  DetailsInfo,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  Icon,
  BlockDefault,
  ConfirmStatus,
  ConfirmationValue,
  SlotLeader,
  SlotLeaderValue,
  SlotLeaderCopy,
  InfoIcon,
  DetailValueSmall,
  HeaderTitleSkeleton,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ProgressSkeleton,
  SlotLeaderSkeleton,
  ProgressLiner,
  ProgressStatus,
  ProgressStatusText,
  ProgressPercent,
} from "./styles";
import { ADAToken } from "../Token";
import NotFound from "../../../pages/NotFound";
import { routers } from "../../../commons/routers";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import useFetch from "../../../commons/hooks/useFetch";
import { getShortHash } from "../../../commons/utils/helper";
import moment from "moment";

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
    const { header, blockDetail, confirmation, transactionFees, totalOutput, progress } = dataDetail;
    return (
      <ViewDetailContainer>
        <CloseButton onClick={handleClose}>
          <CgClose />
        </CloseButton>
        <HeaderContainer>
          <ProgressCircle size={150} pathLineCap="butt" pathWidth={8} trailWidth={2} percent={progress?.progress || 0}>
            <EpochNumber>{blockDetail.epochNo}</EpochNumber>
            <EpochText>Epoch</EpochText>
          </ProgressCircle>
        </HeaderContainer>
        <HeaderContainer>
          <HeaderTitle>{header.title}</HeaderTitle>
          {header.status && <HeaderStatus status={header.status}>{header.status}</HeaderStatus>}
        </HeaderContainer>
        {header.hash && (
          <SlotLeader>
            <Tooltip title={`${header.hash}`} placement="top">
              <Link to={"/"}>
                {header.slotLeader && <small>Slot leader:</small>} <SlotLeaderValue>{header.hash}</SlotLeaderValue>
              </Link>
            </Tooltip>
            <SlotLeaderCopy text={header.hash} />
          </SlotLeader>
        )}
        <DetailsInfo container>
          <DetailsInfoItem item xs={12} sm>
            <Icon src={CubeIcon} alt="block" />
            <DetailLabel>Block</DetailLabel>
            <DetailValue>{blockDetail.blockNo}</DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem item xs={12} sm>
            <Icon src={RocketIcon} alt="socket" />
            <DetailLabel>Slot</DetailLabel>
            <DetailValue>
              {blockDetail.epochSlot}
              <BlockDefault>/{blockDetail.maxEpochSlot || MAX_SLOT_EPOCH}</BlockDefault>
            </DetailValue>
          </DetailsInfoItem>
          {confirmation && (
            <DetailsInfoItem item xs={12} sm>
              <Icon src={CheckCircleIcon} alt="confirmation" />
              <DetailLabel>
                Confirmation <InfoIcon />
              </DetailLabel>
              <ConfirmationValue>
                {confirmation.confirmation}
                <ConfirmStatus status={confirmation.status}>{confirmation.status}</ConfirmStatus>
              </ConfirmationValue>
            </DetailsInfoItem>
          )}
          {transactionFees && (
            <DetailsInfoItem item xs={12} sm>
              <Icon src={ExchangeIcon} alt="transaction fees" />
              <DetailLabel>
                Transaction Fees <InfoIcon />
              </DetailLabel>
              <DetailValue>
                {`${transactionFees.fee} ${transactionFees.token}`}
                <ADAToken color="white" size={"var(--font-size-text-small)"} />
              </DetailValue>
            </DetailsInfoItem>
          )}
          {totalOutput && (
            <DetailsInfoItem item xs={12} sm>
              <Icon src={OutputIcon} alt="output" />
              <DetailLabel>
                Total Output <InfoIcon />
              </DetailLabel>
              <DetailValueSmall>
                {`${totalOutput.totalOutput} ${totalOutput.token}`}
                <ADAToken color="white" size={"var(--font-size-text-small)"} />
              </DetailValueSmall>
            </DetailsInfoItem>
          )}
          {progress && (
            <DetailsInfoItem item xs={12} sm>
              <ProgressLiner progress={progress.progress} />
              <ProgressStatus>
                <ProgressStatusText>{EPOCH_STATUS[progress.status]}</ProgressStatusText>
                <ProgressPercent>{progress.progress}%</ProgressPercent>
              </ProgressStatus>
            </DetailsInfoItem>
          )}
        </DetailsInfo>
      </ViewDetailContainer>
    );
  };

  return (
    <Drawer anchor="right" open={!!id} hideBackdrop variant="permanent">
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
            <DetailsInfoItem item xs={12} sm isCenter>
              <ProgressSkeleton variant="circular" />
            </DetailsInfoItem>
            {new Array(4).fill(0).map((_, index) => {
              return (
                <DetailsInfoItem key={index} item xs={12} sm>
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
    </Drawer>
  );
};

export default DetailView;
