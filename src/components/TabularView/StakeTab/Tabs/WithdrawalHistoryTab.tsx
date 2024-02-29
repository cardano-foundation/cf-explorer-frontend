import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { omit } from "lodash";
import { stringify } from "qs";

import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import { GreenWalletIcon } from "src/components/commons/GreenWalletIcon";
import { AdaValue } from "src/components/commons/ADAValue";
import ADAicon from "src/components/commons/ADAIcon";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomFilter from "src/components/commons/CustomFilter";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import usePageInfo from "src/commons/hooks/usePageInfo";

import { StyledLink, TableSubTitle, WrapWalletLabel, WrapperDelegationTab } from "../styles";

const WithdrawalHistoryTab = () => {
  const { t } = useTranslation();
  const detailData = useContext(DelegatorDetailContext);
  const { stakeId } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();
  const fetchData = useFetchList<WithdrawalHistoryItem>(stakeId ? API.STAKE_LIFECYCLE.WITHDRAW(stakeId) : "", {
    ...pageInfo
  });

  const columns: Column<WithdrawItem>[] = [
    {
      title: t("Transaction Hash"),
      key: "hash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: (
        <>
          <Box>{t("common.netAmount")}</Box>
          <TableSubTitle>{t("common.withdrawnOrFees")}</TableSubTitle>
        </>
      ),
      key: "epoch",
      minWidth: "120px",
      render: (r) => (
        <Box>
          <AdaValue value={new BigNumber(r.value).minus(new BigNumber(r.fee)).toString()} />
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              {formatADAFull(r.value)}&nbsp;
              <ADAicon width={9} />/{formatADAFull(r.fee)}&nbsp;
              <ADAicon width={9} />
            </Box>
          </TableSubTitle>
        </Box>
      )
    }
  ];

  const { total } = fetchData;

  return (
    <>
      <WrapperDelegationTab>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <Box mr={1}>Rewards withdrawn:</Box>
          <AdaValue color={({ palette }) => palette.secondary.main} value={detailData?.rewardWithdrawn ?? 0} />
        </WrapWalletLabel>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            {t("common.showing")} {Math.min(total, pageInfo.size)}{" "}
            {Math.min(total, pageInfo.size) <= 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>

          <CustomFilter
            sortKey="id"
            filterValue={omit(pageInfo, ["page", "size"])}
            onSubmit={(params) => {
              const newParams = omit({ ...params, txHash: params?.search }, ["search"]);
              history.replace({ search: stringify({ page: 1, ...newParams }) });
            }}
            searchLabel={t("common.searchTx")}
          />
        </Box>
      </WrapperDelegationTab>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("common.total"), count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          }
        }}
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default WithdrawalHistoryTab;
