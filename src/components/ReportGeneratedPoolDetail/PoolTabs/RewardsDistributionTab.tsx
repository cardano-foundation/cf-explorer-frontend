import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "../../share/styled";
import { details } from "../../../commons/routers";
import { formatADAFull, formatDateTimeLocal, formatHash } from "../../../commons/utils/helper";
import { ADAValueLabel } from "../../StakingLifeCycle/SPOLifecycle/Tablular/Tabs/styles";
import CustomIcon from "../../commons/CustomIcon";
import { ADAsigntIC } from "../../../commons/resources";
import CustomTooltip from "../../commons/CustomTooltip";
import useFetchList from "../../../commons/hooks/useFetchList";
import { API } from "../../../commons/utils/api";

const RewardsDistributionTab = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 50
  });

  const [sort, setSort] = useState<string>("");

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
      title: "Timestamp",
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
        return (
          <ADAValueLabel>
            {formatADAFull(data.amount)} <CustomIcon icon={ADAsigntIC} width={12} />
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
            <StyledLink to={details.stake(data.rewardAccount)}>{formatHash(data.rewardAccount)}</StyledLink>
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
