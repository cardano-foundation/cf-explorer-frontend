import React from "react";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { CheckCircleIcon, CubeIcon, ExchangeIcon, OutputIcon, RocketIcon } from "../../../commons/resources";
import ProgressCircle from "../ProgressCircle";
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

interface DetailHeaderProps {
  loading: boolean;
  data?: TransactionHeaderDetail | BlockHeaderDetail | EpochHeaderDetail | null;
}

const DetailHeader: React.FC<DetailHeaderProps> = props => {
  const { data, loading } = props;

  const getRouterList = () => {
    if (data?.type === "transaction") return routers.TRANSACTION_LIST;
    if (data?.type === "block") return routers.BLOCK_LIST;
    if (data?.type === "epoch") return routers.EPOCH_LIST;
    else return "/";
  };

  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton to="/">
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
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
      </HeaderDetailContainer>
    );
  }

  if (!data) return <NotFound />;
  const { header, blockDetail, confirmation, transactionFees, totalOutput, progress } = data;

  return (
    <HeaderDetailContainer>
      <BackButton to={getRouterList()}>
        <HiArrowLongLeft />
        <BackText>Back</BackText>
      </BackButton>
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
        <DetailsInfoItem item xs={12} sm isCenter>
          <ProgressCircle
            size={100}
            pathLineCap="butt"
            pathWidth={8}
            trailWidth={2}
            percent={((blockDetail?.epochSlot || 0) / MAX_SLOT_EPOCH) * 100}
          >
            <EpochNumber>{blockDetail?.epochNo}</EpochNumber>
            <EpochText>Epoch</EpochText>
          </ProgressCircle>
        </DetailsInfoItem>
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
    </HeaderDetailContainer>
  );
};

export default DetailHeader;
