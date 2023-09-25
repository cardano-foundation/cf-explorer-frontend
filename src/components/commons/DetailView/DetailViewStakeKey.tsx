import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { DelegationHistoryMainIcon, FileEditIcon, LightningIconComponent } from "src/commons/resources";
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
import CustomIcon from "../CustomIcon";

type DetailViewStakeKeyProps = {
  stakeId: string;
  handleClose: () => void;
};
const DetailViewStakeKey: React.FC<DetailViewStakeKeyProps> = (props) => {
  const { t } = useTranslation();
  const { stakeId, handleClose } = props;
  const { data } = useFetch<IStakeKeyDetail>(stakeId ? `${API.STAKE.DETAIL}/${stakeId}` : ``);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;

  const tabs: { key: string; label: string; icon?: React.ReactNode }[] = [
    {
      key: "delegation",
      label: t("drawer.delegationHIstory"),
      icon: <DelegationHistoryMainIcon style={{ padding: "2px 4px 2px 2px" }} />
    },
    {
      key: "stake-address",
      label: t("drawer.stakeAddressHistory"),
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
    {
      key: "withdrawal",
      label: t("drawer.withDrawalHistory"),
      icon: <FileEditIcon />
    },
    {
      key: "instantaneous",
      label: t("drawer.InstaneousRewards"),
      icon: <CustomIcon icon={LightningIconComponent} height={26} />
    },
    {
      key: "transactions",
      label: t("drawer.transactions"),
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
          <ViewAllButton tooltipTitle={t("drawer.viewDetails")} to={details.stake(stakeId)} />
          <CustomTooltip title={t("common.close")}>
            <CloseButton onClick={handleClose}>
              <CgClose color={theme.palette.secondary.light} />
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
        <ViewAllButton tooltipTitle={t("drawer.viewDetails")} to={details.stake(stakeId)} />
        <CustomTooltip title={t("common.close")}>
          <CloseButton onClick={handleClose}>
            <CgClose color={theme.palette.secondary.light} />
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
                <DetailLabel>{t("drawer.status")}</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                <StakeKeyStatus status={data.status}>
                  {data.status === "ACTIVE" ? t("status.active") : t("status.deactivated")}
                </StakeKeyStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>{t("drawer.rewardAvailable")}</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                {formatADAFull(data.rewardAvailable)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>{t("drawer.withDrawn")}</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                {formatADAFull(data.rewardWithdrawn)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>{t("drawer.delegatedTo")}</DetailLabel>
              </WrapDetailInfo>
              {data.pool?.poolName || data.pool?.poolId ? (
                <CustomTooltip title={poolNameToolTip}>
                  <Box component={Link} display="inline-block" to={details.delegation(data.pool?.poolId)}>
                    <DelegatedDetail>{poolName}</DelegatedDetail>
                  </Box>
                </CustomTooltip>
              ) : (
                <DelegatedEmptyPool>{t("drawer.notDelegatedToAnyPool")}</DelegatedEmptyPool>
              )}
            </DetailsInfoItem>
            <DetailsInfoItem>
              <WrapDetailInfo>
                <DetailLabel>{t("drawer.totalStake")}</DetailLabel>
              </WrapDetailInfo>
              <DetailValue>
                {formatADAFull(data.totalStake)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <Box textAlign={"right"}>
              <ButtonModal sx={{ color: theme.palette.primary.main }} onClick={() => setOpen(true)}>
                {t("drawer.viewAllAddresses")}
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
