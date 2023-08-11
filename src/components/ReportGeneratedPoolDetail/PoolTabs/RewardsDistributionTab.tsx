import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortWallet } from "src/commons/utils/helper";
import { ADAValueLabel } from "src/components/StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import { ADAsymbol } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";

const RewardsDistributionTab = () => {
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
      title: "Epoch",
      render(data) {
        return <StyledLink to={details.epoch(data.epochNo)}>{data.epochNo}</StyledLink>;
      }
    },
    {
      key: "time",
      title: "Created At",
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return formatDateTimeLocal(data.time);
      }
    },
    {
      key: "amount",
      title: "Operator Reward ADA",
      render(data) {
        const isPositiveNumber = data.amount > 0;
        return (
          <ADAValueLabel>
            <Box component={"span"} color={isPositiveNumber ? theme.palette.success[800] : theme.palette.error[700]}>
              {isPositiveNumber ? "+" : "-"} {formatADAFull(data.amount)}
            </Box>
            <CustomIcon icon={ADAsymbol} width={12} />
          </ADAValueLabel>
        );
      }
    },
    {
      key: "owner",
      title: "Reward Account",
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
          title: "Pool Registration",
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
