import { Box } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { details } from "src/commons/routers";
import { delegatedIcon, rewardIcon, rewardWithdrawIcon, totalStakeIcon } from "src/commons/resources";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailHeader from "src/components/commons/DetailHeader";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";

import ModalAllAddress from "../ModalAllAddress";
import { ButtonModal, StyledFlexValue, StyledLinkTo, TitleCard, TitleNoPool, TitleValue } from "./styles";
import ToStakeLifCycleButton from "../../StakingLifeCycle/ToStakeLifeCycleButton";

interface Props {
  data: IStakeKeyDetail | null;
  adaHanldeData?: {
    stakeAddress: string;
    paymentAddress: string;
  } | null;
  loading: boolean;
  lastUpdated?: number;
}

const StakeOverview: React.FC<Props> = ({ data, loading, lastUpdated, adaHanldeData }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();
  const poolName = data?.pool?.poolName || "";
  const tickerName = data?.pool?.tickerName || "";
  const poolId = data?.pool?.poolId || "";
  const hasTicketOrPoolName = tickerName || poolName;

  const delegateTooltip = data?.pool
    ? hasTicketOrPoolName
      ? `${tickerName}${tickerName && poolName ? " - " : ""}${poolName}`
      : poolId
    : t("drawer.notDelegatedToAnyPool");

  const delegateTo = data?.pool
    ? hasTicketOrPoolName
      ? `${tickerName}${tickerName && poolName ? " - " : ""}${poolName}`
      : getShortHash(poolId)
    : t("drawer.notDelegatedToAnyPool");

  const listOverview = [
    {
      icon: delegatedIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="stake-address-overview-delegated">
            {t("glossary.delegatedTo")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <CustomTooltip sx={{ width: "unset" }} title={delegateTooltip}>
          <StyledLinkTo
            isto={!!data?.pool}
            data-testid="stake-link-pool"
            to={data?.pool?.poolId ? details.delegation(data?.pool?.poolId) : "#"}
          >
            {!hasTicketOrPoolName ? <TitleNoPool>{delegateTo}</TitleNoPool> : <TitleValue>{delegateTo}</TitleValue>}
          </StyledLinkTo>
        </CustomTooltip>
      )
    },
    {
      icon: totalStakeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="stake-address-overview-total-stake">
            {t("glossary.totalStake")}
          </TitleCard>
        </Box>
      ),
      value: (
        <Box>
          <StyledFlexValue>
            <Box component={"span"}>{formatADAFull(data?.totalStake)}</Box>
            <ADAicon />
            {NETWORK === NETWORKS.sanchonet && (
              <CustomTooltip title={t("sanchonet.toltipTotalStake")}>
                <Box display={"inline-block"}>
                  <InfoSolidIcon />
                </Box>
              </CustomTooltip>
            )}
          </StyledFlexValue>
          <Box sx={{ color: "blue" }}>
            <ButtonModal onClick={() => setOpen(true)}>{t("drawer.viewAllAddresses")}</ButtonModal>
          </Box>
          <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={data?.stakeAddress || ""} />
        </Box>
      )
    },
    {
      icon: rewardIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="stake-address-overview-reward-available">
            {t("glossary.rewardsAvailable")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <StyledFlexValue>
          {data?.rewardAvailable != null ? (
            <>
              <Box component={"span"}>{formatADAFull(data?.rewardAvailable)}</Box>
              <ADAicon />
            </>
          ) : (
            t("common.notAvailable")
          )}
        </StyledFlexValue>
      )
    },
    {
      icon: rewardWithdrawIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="stake-address-overview-reward-withdrawn">
            {" "}
            {t("glossary.rewardsWithdrawn")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <StyledFlexValue>
          {data?.rewardWithdrawn != null ? (
            <>
              {formatADAFull(data?.rewardWithdrawn)}
              <ADAicon />
            </>
          ) : (
            t("common.notAvailable")
          )}
        </StyledFlexValue>
      )
    }
  ];

  return (
    <DetailHeader
      type="STAKE_KEY"
      bookmarkData={data?.stakeAddress || ""}
      redirectAction={<ToStakeLifCycleButton address={data?.stakeAddress} />}
      title={
        adaHanldeData ? (
          <CustomTooltip title={t("address.title.ADAHanlde")}>
            <Box textTransform={"lowercase"} data-testid="stake-address-detail-title-ada-hanlde">
              {stakeId.startsWith("$") ? stakeId : `$${stakeId}`}
            </Box>
          </CustomTooltip>
        ) : (
          <Box data-testid="stake-address-detail-title">{t("head.page.stakeAddressDetail")}</Box>
        )
      }
      hash={data?.stakeAddress}
      stakeKeyStatus={data?.status}
      listItem={listOverview}
      loading={loading}
      lastUpdated={lastUpdated}
    />
  );
};

export default StakeOverview;
