import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortWallet } from "src/commons/utils/helper";
import { ADAValueLabel } from "src/components/StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";

const RewardsDistributionTab = () => {
  const { t } = useTranslation();
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 50
  });

  const [sort, setSort] = useState<string>("");

  const theme = useTheme();

  const columns: Column<SPO_REWARD>[] = [
    {
      key: "epochNo",
      title: t("glossary.epoch"),
      render(data) {
        return <StyledLink to={details.epoch(data.epochNo)}>{data.epochNo}</StyledLink>;
      }
    },
    {
      key: "time",
      title: t("createdAt"),
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return formatDateTimeLocal(data.time);
      }
    },
    {
      key: "amount",
      title: t("common.operatorRewardADA"),
      render(data) {
        const isPositiveNumber = data.amount > 0;
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
              {isPositiveNumber ? "+" : "-"} {formatADAFull(data.amount)} <ADAicon />
            </Box>
          </ADAValueLabel>
        );
      }
    },
    {
      key: "owner",
      title: t("rewardAccount"),
      render(data) {
        return (
          <CustomTooltip title={data.rewardAccount}>
            <StyledLink to={details.stake(data.rewardAccount)}>{getShortWallet(data.rewardAccount)}</StyledLink>
          </CustomTooltip>
        );
      }
    }
  ];

  const fetchData = useFetchList<SPO_REWARD>(reportId ? API.REPORT.PREPORT_REWARD_DISTRIBUTIONS(reportId) : "", {
    ...params,
    sort
  });

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: t("common.poolRegistration"),
          count: fetchData.total
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default RewardsDistributionTab;
