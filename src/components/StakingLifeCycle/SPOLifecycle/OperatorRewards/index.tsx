import { useContext, useMemo, useRef, useState } from "react";
import { Box, styled, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import CustomModal from "src/components/commons/CustomModal";
import Table, { Column } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import ADAicon from "src/components/commons/ADAIcon";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import SPOHolderBox from "src/components/commons/SPOHolderBox";
import { RewardBalance, RewardBalanceTitle } from "src/components/ReceivedRewardsModal/styles";
import { WalletIconRewardGreen, WalletIconRewardGreenDark } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  StyledLink,
  DrawContainer,
  ADAAmount,
  StyledEpoch,
  HoldContainer,
  HoldBoxTitle,
  ModalContainer
} from "./styles";
import PoolDetailContext from "../PoolDetailContext";

const OperatorReward = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { poolId = "" } = useParams<{ poolId: string }>();
  const { data } = useFetch<PoolInfo>(API.SPO_LIFECYCLE.SPO_POOL_INFO(poolId));
  const SPOHolderRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        end: SPOHolderRef,
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        startOffset: { 0: [0] },
        endOffset: { 0: [0] },
        arrow: { 0: "top", sm: "left" }
      }
    ];
  }, []);

  return (
    <Box>
      <DrawContainer>
        <CardanoBlockchain ref={cardanoBlockchainRef} />
        <HoldContainer onClick={() => setOpenModal(true)} ref={SPOHolderRef}>
          <HoldBoxTitle>{t("common.rewardAccount")}</HoldBoxTitle>
          <SPOHolderBox
            data={{ poolName: data?.poolName, poolView: data?.poolView, stakeKeys: data?.rewardAccounts }}
          />
        </HoldContainer>
        <DrawPath paths={paths} />
      </DrawContainer>
      <OperatorRewardModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};
export default OperatorReward;

const OperatorRewardModal = ({ ...props }: { open: boolean; onClose: () => void }) => {
  const data = useContext(PoolDetailContext);
  const { isGalaxyFoldSmall, isMobile } = useScreen();
  const { t } = useTranslation();
  const { poolId = "" } = useParams<{ poolId: string }>();
  const theme = useTheme();
  const [sort, setSort] = useState<string>("time,DESC");
  const [{ page, size }, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 50 });
  const fetchData = useFetchList<SPO_REWARD>(API.SPO_LIFECYCLE.REWARD(poolId), { page, size, sort });

  const columns: Column<SPO_REWARD>[] = [
    {
      title: t("common.Epoch"),
      key: "Epoch",
      minWidth: "50px",
      render: (r) => <StyledEpoch to={details.epoch(r.epochNo)}>{r.epochNo}</StyledEpoch>
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "50px",
      render: (r) => <Box>{moment(r?.time).format("MM/DD/yyyy HH:mm:ss")}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("common.amouintADA"),
      key: "AmountADA",
      minWidth: "50px",
      render: (r) => (
        <ADAAmount>
          +{formatADAFull(r.amount)} <ADAicon />
        </ADAAmount>
      )
    },
    {
      title: t("rewardAccount"),
      key: "RewardAccount",
      minWidth: "50px",
      render: (r) => (
        <CustomTooltip title={r.rewardAccount}>
          <StyledLink to={details.stake(r.rewardAccount)}>{getShortHash(r.rewardAccount || "")}</StyledLink>
        </CustomTooltip>
      )
    }
  ];
  return (
    <CustomModal {...props} title={t("common.TotalOperatorRewardsReceived")} width={600}>
      <ModalContainer>
        <RewardBalance>
          {theme.isDark ? <WalletIconRewardGreenDark /> : <WalletIconRewardGreen />}
          <RewardBalanceTitle>
            <Box display={"inline-block"}>
              {t("slc.amountReceived")}:{" "}
              <Box display={"inline-block"} mr={1}>
                {formatADAFull(data?.rewardAvailable || 0)}
              </Box>
              <ADAicon />
            </Box>
          </RewardBalanceTitle>
        </RewardBalance>
        <StyledTable
          {...fetchData}
          columns={columns}
          defaultSort="time,DESC"
          total={{ title: t("common.totalEpoch"), count: fetchData.total }}
          maxHeight={`calc(70vh - ${isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"})`}
          pagination={{
            page,
            size,
            total: fetchData.total,
            onChange: (page, size) => setPagination({ page: page - 1, size })
          }}
          isModal
        />
      </ModalContainer>
    </CustomModal>
  );
};

const StyledTable = styled(Table)(() => ({
  "> :nth-of-type(2)": {
    boxShadow: "none !important"
  },
  "& nav li > div": {
    width: "100% !important"
  }
}));
