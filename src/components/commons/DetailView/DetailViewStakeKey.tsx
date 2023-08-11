import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Link, useHistory } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { DelegationHistoryMainIcon, FileEditIcon, LightningIcon } from "src/commons/resources";
import { ReactComponent as TransactionIcon } from "src/commons/resources/icons/exchangeArrow.svg";
import { ReactComponent as StakeKeyHistoryIcon } from "src/commons/resources/icons/stateKeyHistory.svg";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import ModalAllAddress from "src/components/StakeDetail/ModalAllAddress";

import ADAicon from "../ADAIcon";
import CopyButton from "../CopyButton";
import CustomTooltip from "../CustomTooltip";
import ViewAllButton from "../ViewAllButton";
import ViewMoreButton from "../ViewMoreButton";
import {
  ButtonModal,
  CloseButton,
  DelegatedDetail,
  DelegatedEmptyPool,
  DetailLabel,
  DetailLabelSkeleton,
  DetailLink,
  DetailLinkIcon,
  DetailLinkImage,
  DetailLinkName,
  DetailLinkRight,
  DetailValue,
  DetailValueSkeleton,
  DetailsInfoItem,
  Group,
  StakeKeyHeader,
  StakeKeyLink,
  StakeKeyStatus,
  ViewDetailContainer,
  ViewDetailDrawer,
  ViewDetailHeader,
  ViewDetailScroll,
  WrapDetailInfo
} from "./styles";

type DetailViewStakeKeyProps = {
  stakeId: string;
  handleClose: () => void;
};
const DetailViewStakeKey: React.FC<DetailViewStakeKeyProps> = (props) => {
  const { stakeId, handleClose } = props;
  const { data } = useFetch<IStakeKeyDetail>(stakeId ? `${API.STAKE.DETAIL}/${stakeId}` : ``);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;

  const tabs: { key: string; label: string; icon?: React.ReactNode }[] = [
    {
      key: "delegation",
      label: "Delegation History",
      icon: <DelegationHistoryMainIcon style={{ padding: "2px 4px 2px 2px" }} />
    },
    {
      key: "stake-address",
      label: "Stake Address History",
      icon: (
        <StakeKeyHistoryIcon
          fill={theme.palette.border.block}
          width={"20px"}
          height={"20px"}
          style={{ padding: "2px" }}
          display={"block"}
        />
      )
    },
    { key: "withdrawal", label: "Withdrawal History", icon: <DetailLinkImage src={FileEditIcon} alt="withdrawal" /> },
    {
      key: "instantaneous",
      label: "Instantaneous Rewards",
      icon: <DetailLinkImage src={LightningIcon} alt="rewards" />
    },
    {
      key: "transactions",
      label: "Transactions",
      icon: <TransactionIcon width={"20px"} height={"20px"} style={{ padding: "2px" }} display={"block"} />
    }
  ];

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

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
    ? getShortWallet(data.pool.poolId)
    : "-";

  const poolNameToolTip = data.pool?.poolName
    ? `${data.pool.tickerName || ""} - ${data.pool.poolName}`
    : data.pool?.poolId || "-";

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
              <WrapDetailInfo>
                <DetailLabel>Status</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                <StakeKeyStatus status={data.status}>{data.status}</StakeKeyStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>Reward available</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                {formatADAFull(data.rewardAvailable)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>Reward withdrawn</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                {formatADAFull(data.rewardWithdrawn)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>Delegated to</DetailLabel>
              </WrapDetailInfo>
              {data.pool?.poolName || data.pool?.poolId ? (
                <CustomTooltip title={poolNameToolTip}>
                  <Box component={Link} display="inline-block" to={details.delegation(data.pool?.poolId)}>
                    <DelegatedDetail>{poolName}</DelegatedDetail>
                  </Box>
                </CustomTooltip>
              ) : (
                <DelegatedEmptyPool>Not delegated to any pool</DelegatedEmptyPool>
              )}
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>Total Stake</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                {formatADAFull(data.totalStake)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <Box textAlign={"right"}>
              <ButtonModal sx={{ color: theme.palette.primary.main }} onClick={() => setOpen(true)}>
                View all addresses
              </ButtonModal>
            </Box>
            <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={stakeId} />
          </Group>
          {tabs.map(({ key, label, icon }) => {
            return (
              <Group key={key}>
                <DetailLink to={{ pathname: details.stake(stakeId, key), state: { fromPath } }}>
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
      <ViewMoreButton to={{ pathname: details.stake(stakeId), state: { fromPath } }} />
    </ViewDetailDrawer>
  );
};

export default DetailViewStakeKey;
