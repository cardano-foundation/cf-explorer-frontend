import { Box, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import { WalletIconRewardGreen, WalletIconRewardGreenDark } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { RECEIVED_REWARDS, REWARD_TYPES, REWARD_TYPES_LABEL } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";

import ADAicon from "../commons/ADAIcon";
import StyledModal from "../commons/StyledModal";
import Table, { Column } from "../commons/Table";
import {
  AmountADARow,
  EpochRow,
  ModalContainer,
  ModalContent,
  ModalTitle,
  RewardBalance,
  RewardBalanceHeader,
  RewardBalanceTitle,
  TableContainer
} from "./styles";
import DelegatorDetailContext from "../StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import CustomTooltip from "../commons/CustomTooltip";

interface ReceivedReward {
  amount: string;
  epoch: number;
  time: string;
  type: string;
  poolView: string;
  poolHash: string;
}

export interface ReceivedRewardsModalProps {
  open?: boolean;
  onClose?: () => void;
  reward: number;
  type?: RECEIVED_REWARDS;
}

const ReceivedRewardsModal: React.FC<ReceivedRewardsModalProps> = ({ open = false, onClose, reward = 0, type }) => {
  const { t } = useTranslation();
  const contextData = useContext(DelegatorDetailContext);
  const [params, setParams] = useState({ page: 0, size: 50 });
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [sort, setSort] = useState<string>("");
  const { isMobile, isGalaxyFoldSmall } = useScreen();
  const theme = useTheme();
  const fetchData = useFetchList<RewardDistributionItem>(
    stakeId && open ? API.STAKE_LIFECYCLE.RECEIVED_REWARD(stakeId) + (type ? `?type=${type}` : "") : "",
    { ...params, sort }
  );

  const mappingRewardType = (type: string): string => {
    return type
      ?.split(",")
      .map((item) => REWARD_TYPES_LABEL[item as REWARD_TYPES])
      .join(", ");
  };

  const columns: Column<ReceivedReward>[] = [
    {
      key: "amount",
      title: t("common.amountADA"),
      render(data) {
        return (
          <AmountADARow amount={data.amount}>
            +{formatADAFull(data.amount)} <ADAicon />
          </AmountADARow>
        );
      }
    },
    {
      key: "poolId",
      title: t("common.poolId"),
      render(data) {
        return (
          <CustomTooltip title={data.poolView}>
            <EpochRow to={details.epoch(data.poolView)}>{getShortHash(data.poolView)}</EpochRow>
          </CustomTooltip>
        );
      }
    },
    {
      key: "poolView",
      title: t("common.Epoch"),
      render(data) {
        return <EpochRow to={details.epoch(data.epoch)}>{data.epoch}</EpochRow>;
      }
    },
    {
      key: "time",
      title: t("common.Date"),
      sort: ({ sortValue }) => {
        sortValue ? setSort(`id,${sortValue}`) : setSort("");
      },
      render(data) {
        return <Box>{formatDateTimeLocal(data.time)}</Box>;
      }
    },
    {
      key: "type",
      title: t("glossary.rewardType"),
      render(data) {
        return <Box>{mappingRewardType(data.type)}</Box>;
      }
    }
  ];
  const getTotal = () => {
    if (type === RECEIVED_REWARDS.LEADER) {
      return contextData?.totalOperatorRewards || 0;
    } else if (type === RECEIVED_REWARDS.MEMBER) {
      return contextData?.totalDelegatorRewards || 0;
    }
    return reward;
  };
  return (
    <StyledModal
      open={open}
      handleCloseModal={() => {
        onClose?.();
        setParams({ page: 0, size: 50 });
      }}
      width={600}
    >
      <ModalContainer>
        <ModalTitle>
          {type === RECEIVED_REWARDS.LEADER
            ? t("common.TotalOperatorRewardsReceived")
            : type === RECEIVED_REWARDS.MEMBER
            ? t("common.TotalDelegatorRewardsReceived")
            : t("glossary.receivedRewared")}
        </ModalTitle>
        <ModalContent>
          <RewardBalanceHeader>
            <RewardBalance>
              {theme.isDark ? <WalletIconRewardGreenDark /> : <WalletIconRewardGreen />}
              <RewardBalanceTitle>
                <Box display={"inline-block"}>
                  {type === RECEIVED_REWARDS.ALL ? t("slc.totalRewardsReceived") : t("slc.amountReceived")}:{" "}
                  <Box display={"inline-block"} mr={1}>
                    {formatADAFull(getTotal())}
                  </Box>
                  <ADAicon />
                </Box>
              </RewardBalanceTitle>
            </RewardBalance>
          </RewardBalanceHeader>
          <TableContainer>
            <Table
              {...fetchData}
              columns={columns}
              isModal={true}
              maxHeight={`calc(70vh - ${isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"})`}
              total={{ count: fetchData.total, title: "Total Transactions" }}
              pagination={{
                ...params,
                total: fetchData.total,
                onChange(page, size) {
                  setParams({ page: page - 1, size });
                }
              }}
            />
          </TableContainer>
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
};

export default ReceivedRewardsModal;
