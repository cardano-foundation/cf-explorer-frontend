import { Box } from "@mui/material";
import { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import ADAicon from "src/components/commons/ADAIcon";

import { StyledLink } from "./styles";

const DelegationEpochList = ({
  data,
  loading,
  total,
  initialized
}: {
  data: DelegationEpoch[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  scrollEffect: () => void;
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };
  const columns: Column<DelegationEpoch>[] = [
    {
      title: t("common.Epoch"),
      key: "epoch",
      minWidth: "120px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    },
    {
      title: t("blocks"),
      key: "block",
      minWidth: "120px",
      render: (data) => numberWithCommas(data.block)
    },
    {
      title: (
        <Box component={"span"}>
          {t("stakeAmount")} (<ADAicon />)
        </Box>
      ),
      key: "stakeAmount",
      minWidth: "120px",

      render: (data) => <Box component={"span"}>{formatADAFull(data.stakeAmount)}</Box>
    },
    {
      title: (
        <Box component={"span"}>
          {t("delegatorRewards")} (<ADAicon />)
        </Box>
      ),
      key: "delegatorReward",
      minWidth: "120px",
      render: (data) => (
        <Box component={"span"}>{data.delegators ? formatADAFull(data.delegators) : t("common.notAvailable")}</Box>
      )
    },
    {
      title: (
        <Box component={"span"}>
          {t("fees")} (<ADAicon />)
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{data.fee ? formatADAFull(data.fee) : t("common.notAvailable")}</Box>
    }
  ];

  return (
    <Table
      columns={columns}
      data={data || []}
      total={{ count: total, title: t("glossary.totalTokenList") }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ tab: query.tab, page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total
      }}
    />
  );
};

const DelegationStakingDelegatorsList = ({
  data,
  initialized,
  loading,
  total
}: {
  data: StakingDelegators[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  scrollEffect: () => void;
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };
  const columns: Column<StakingDelegators>[] = [
    {
      title: t("no"),
      key: "no",
      render: (r, idx) => idx + 1
    },
    {
      title: t("delegator"),
      key: "delegator",
      minWidth: "50px",
      render: (data) =>
        data.view && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomTooltip title={data.view || ""}>
              <StyledLink to={details.stake(data.view)}>{getShortWallet(data.view || "")}</StyledLink>
            </CustomTooltip>
            <CopyButton text={data.view || ""} />
          </div>
        )
    },
    {
      title: (
        <Box component="span">
          {t("totalValue")} (<ADAicon />)
        </Box>
      ),
      key: "value",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{formatADAFull(data.totalStake)}</Box>
    },
    {
      title: t("stakedTime"),
      key: "stakedTime",
      minWidth: "120px",
      render: (data) => formatDateTimeLocal(data.time || "")
    },
    {
      title: (
        <Box component="span">
          {t("fees")} (<ADAicon />)
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{formatADAFull(data.fee)}</Box>
    }
  ];

  return (
    <Table
      columns={columns}
      data={data ? data : []}
      total={{ count: total, title: t("glossary.totalTokenList") }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ tab: query.tab, page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total
      }}
      onClickRow={(e, r) => {
        history.push(details.stake(r.view));
      }}
    />
  );
};

export { DelegationEpochList, DelegationStakingDelegatorsList };
