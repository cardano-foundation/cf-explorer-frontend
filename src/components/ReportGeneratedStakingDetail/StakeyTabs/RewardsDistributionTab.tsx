import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "src/commons/utils/helper";
import { FilterParams } from "src/components/commons/CustomFilter";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import ADAicon from "src/components/commons/ADAIcon";

import { ADAValueLabel } from "../styles";

const RewardsDistributionTab = () => {
  const { t } = useTranslation();
  const { reportId } = useParams<{ reportId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [sort, setSort] = useState<string>("");
  const [params] = useState<FilterParams>({});
  const fetchData = useFetchList<RewardDistributionItem>(reportId ? API.REPORT.SREPORT_DETAIL_REWARDS(reportId) : "", {
    ...pageInfo,
    ...params,
    txHash: params.search,
    sort: sort || params.sort
  });
  const theme = useTheme();
  const { total } = fetchData;
  const columns: Column<RewardDistributionItem>[] = [
    {
      title: t("common.rewardsPaid"),
      key: "paid",
      minWidth: "120px",
      render: (r) => {
        const isPositiveNumber = r.amount > 0;
        return (
          <ADAValueLabel>
            <Box
              component={"span"}
              color={
                isPositiveNumber
                  ? theme.isDark
                    ? theme.palette.success[100]
                    : theme.palette.success[800]
                  : theme.palette.error[700]
              }
            >
              {isPositiveNumber ? "+" : "-"} {formatADAFull(r.amount)}&nbsp;
              <ADAicon />
            </Box>
          </ADAValueLabel>
        );
      }
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time),
      sort: ({ sortValue }) => {
        sortValue ? setSort(`id,${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.epoch"),
      key: "epoch",
      minWidth: "120px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    }
  ];
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
        <Box />
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            {t("common.showing")} {Math.min(total, pageInfo.size)}{" "}
            {Math.min(total, pageInfo.size) > 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>
        </Box>
      </Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
        }}
        onClickRow={(e, r: RewardDistributionItem) => history.push(details.epoch(r.epoch))}
      />
    </>
  );
};

export default RewardsDistributionTab;
