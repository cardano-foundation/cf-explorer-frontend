import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import { AdaValue } from "src/components/commons/ADAValue";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import ADAicon from "src/components/commons/ADAIcon";
import usePageInfo from "src/commons/hooks/usePageInfo";

const WithdrawalHistoryTab = () => {
  const { t } = useTranslation();
  const { reportId } = useParams<{ reportId: string }>();
  const history = useHistory();

  const { pageInfo, setSort } = usePageInfo();
  const fetchData = useFetchList<WithdrawalHistoryItem>(
    reportId ? API.REPORT.SREPORT_DETAIL_WITHDRAWALS(reportId) : "",
    {
      ...pageInfo
    }
  );
  const { total } = fetchData;
  const columns: Column<WithdrawItem>[] = [
    {
      title: t("glossary.txHash"),
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
          <AdaValue value={r.value + r.fee} />
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

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
        <Box />
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? "results" : "result"}
          </WrapFilterDescription>
        </Box>
      </Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("common.total"), count: fetchData.total }}
        pagination={{
          ...pageInfo,
          page: pageInfo.page,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ ...pageInfo, page, size }) })
        }}
        onClickRow={(e, r: DeregistrationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default WithdrawalHistoryTab;
