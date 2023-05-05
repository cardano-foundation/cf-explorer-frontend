import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FileEditIcon, LightningIcon } from "../../../commons/resources";
import {
  CloseButton,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ViewDetailDrawer,
  Group,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
  DetailLinkName,
  TokenContainer,
  TokenHeaderContainer,
  TokenMetaData,
  TokenInfo,
  MetaData,
  TokenHeaderInfo,
  TokenTotalSupply,
  TokenDecimal,
  ViewDetailScroll,
  StakeKeyHeader,
  StakeKeyStatus,
  DetailLinkImage,
  StakeKeyLink,
  DelegatedDetail,
  ButtonModal,
  ViewDetailHeader,
} from "./styles";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADAFull, getShortWallet } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import { ReactComponent as StakeKeyHistoryIcon } from "../../../commons/resources/icons/stateKeyHistory.svg";
import { ReactComponent as TransactionIcon } from "../../../commons/resources/icons/exchangeArrow.svg";
import CustomTooltip from "../CustomTooltip";
import { TbFileCheck } from "react-icons/tb";
import CopyButton from "../CopyButton";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import ModalAllAddress from "../../StakeDetail/ModalAllAddress";
import { API } from "../../../commons/utils/api";
import ViewAllButton from "../ViewAllButton";
import ADAicon from "../ADAIcon";

type DetailViewStakeKeyProps = {
  stakeId: string;
  handleClose: () => void;
};
const tabs: { key: string; label: string; icon?: React.ReactNode }[] = [
  { key: "delegation", label: "Delegation History", icon: <TbFileCheck /> },
  {
    key: "stake-key",
    label: "Stake Key History",
    icon: (
      <StakeKeyHistoryIcon fill="#438F68" width={"20px"} height={"20px"} style={{ padding: "2px" }} display={"block"} />
    ),
  },
  { key: "withdrawal", label: "Withdrawal History", icon: <DetailLinkImage src={FileEditIcon} alt="withdrawal" /> },
  { key: "instantaneous", label: "Instantaneous Rewards", icon: <DetailLinkImage src={LightningIcon} alt="rewards" /> },
  {
    key: "transactions",
    label: "Transactions",
    icon: <TransactionIcon width={"20px"} height={"20px"} style={{ padding: "2px" }} display={"block"} />,
  },
];

const DetailViewStakeKey: React.FC<DetailViewStakeKeyProps> = props => {
  const { stakeId, handleClose } = props;
  const { data } = useFetch<IStakeKeyDetail>(stakeId ? `${API.STAKE.DETAIL}/${stakeId}` : ``);
  const [open, setOpen] = useState(false);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!stakeId} hideBackdrop variant="permanent">
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle="View Detail" to={details.stake(stakeId)} />
          <CustomTooltip title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
        <ViewDetailContainer>
          <ViewDetailScroll>
            <TokenContainer>
              <TokenHeaderContainer>
                <IconSkeleton variant="circular" />
                <DetailValueSkeleton variant="rectangular" />
              </TokenHeaderContainer>
              <TokenMetaData>
                <TokenInfo>
                  <DetailValueSkeleton variant="rectangular" />
                  <IconSkeleton variant="circular" />
                </TokenInfo>
                <MetaData />
              </TokenMetaData>
              <TokenHeaderInfo>
                <TokenTotalSupply>
                  <DetailValueSkeleton variant="rectangular" />
                  <DetailValueSkeleton variant="rectangular" />
                </TokenTotalSupply>
                <TokenDecimal>
                  <DetailValueSkeleton variant="rectangular" />
                  <DetailValueSkeleton variant="rectangular" />
                </TokenDecimal>
              </TokenHeaderInfo>
            </TokenContainer>
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
        <ViewMoreButton to={details.stake(stakeId)} />
      </ViewDetailDrawer>
    );
  const poolName = data.pool?.poolName
    ? `${data.pool.tickerName || ""} - ${data.pool.poolName}`
    : data.pool?.poolId
    ? `Pool [${getShortWallet(data.pool.poolId)}]`
    : "-";

  return (
    <ViewDetailDrawer anchor="right" open={!!stakeId} hideBackdrop variant="permanent">
      <ViewDetailHeader>
        <ViewAllButton tooltipTitle="View Detail" to={details.stake(stakeId)} />
        <CustomTooltip title="Close">
          <CloseButton onClick={handleClose}>
            <CgClose />
          </CloseButton>
        </CustomTooltip>
      </ViewDetailHeader>
      <ViewDetailContainer>
        <ViewDetailScroll>
          <StakeKeyHeader>
            <StakeKeyLink to={details.stake(stakeId)}>{stakeId}</StakeKeyLink>
            <CopyButton text={stakeId} />
          </StakeKeyHeader>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>Status</DetailLabel>
              <DetailValue>
                <StakeKeyStatus status={data.status}>{data.status}</StakeKeyStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Reward available</DetailLabel>
              <DetailValue>
                {formatADAFull(data.rewardAvailable)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Reward withdrawn</DetailLabel>
              <DetailValue>
                {formatADAFull(data.rewardWithdrawn)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Delegated to</DetailLabel>
              <CustomTooltip title={poolName}>
                <Box component={Link} display="inline-block" to={details.delegation(data.pool?.poolId)}>
                  <DelegatedDetail>{poolName}</DelegatedDetail>
                </Box>
              </CustomTooltip>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Total Stake</DetailLabel>
              <DetailValue>
                {formatADAFull(data.totalStake)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <Box textAlign={"right"}>
              <ButtonModal onClick={() => setOpen(true)}>View all addresses</ButtonModal>
            </Box>
            <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={stakeId} />
          </Group>
          {tabs.map(({ key, label, icon }) => {
            return (
              <Group key={key}>
                <DetailLink to={details.stake(stakeId, key)}>
                  <DetailLabel>
                    <DetailLinkIcon>{icon}</DetailLinkIcon>
                    <DetailLinkName>{label}</DetailLinkName>
                  </DetailLabel>
                  <DetailValue>
                    <DetailLinkRight>
                      <BiChevronRight size={24} />
                    </DetailLinkRight>
                  </DetailValue>
                </DetailLink>
              </Group>
            );
          })}
        </ViewDetailScroll>
      </ViewDetailContainer>
      <ViewMoreButton to={details.stake(stakeId)} />
    </ViewDetailDrawer>
  );
};

export default DetailViewStakeKey;
