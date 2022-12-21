import { Link, useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";

import Table, { Column } from "../../commons/Table";

import styles from "./index.module.scss";
import { formatADA, formatPercent } from "../../../commons/utils/helper";

import { routers } from "../../../commons/routers";
import { LinearProgress, styled } from "@mui/material";

interface DelegationListProps {
  data: Delegators[];
  total: number;
  loading: boolean;
  initialized: boolean;
}

const DelegationLists: React.FC<DelegationListProps> = ({ data, total, loading, initialized }) => {
  const { search } = useLocation();
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const query = parse(search.split("?")[1]);

  const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "40px",
      maxWidth: "350px",
      render: r => {
        return (
          <PoolName to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolView}`)}>
            {r.poolName || r.poolView}
          </PoolName>
        );
      },
    },
    {
      title: "Pool size (A)",
      key: "PoolsizeA",
      minWidth: "120px",
      render: r => <div>{formatADA(r.poolSize)}</div>,
    },
    {
      title: "Reward",
      key: "Reward",
      minWidth: "120px",
      render: r => <div>{r.reward}</div>,
    },
    {
      title: "Fee (A) ",
      key: "fee",
      minWidth: "120px",
      render: r => (
        <div>
          {formatPercent(r.feePercent)} {`(${formatADA(r.feeAmount)} A)`}
        </div>
      ),
    },
    {
      title: "Declared Pledge (A)",
      key: "Declared",
      minWidth: "120px",
      render: r => <div>{formatADA(r.pledge)} </div>,
    },
    {
      title: "Saturation",
      minWidth: "200px",
      key: "Saturation",
      render: r => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{formatPercent(r.saturation) || `0%`}</span>
          <StyledLinearProgress variant="determinate" value={r.saturation * 100 > 100 ? 100 : r.saturation * 100} />
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={data.map(item => {
        return {
          ...item,
          adaFake: Math.round(Math.random() * 10000) / 100,
          feeFake: Math.round((Math.random() + 2) * 100) / 100,
        };
      })}
      total={{ count: total, title: "Total" }}
      loading={loading}
      initialized={initialized}
      onClickRow={(_, r) => history.push(routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolView}`))}
      pagination={{
        onChange: (page, size) => {
          setQuery({ page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total,
      }}
    />
  );
};

export default DelegationLists;

const StyledLinearProgress = styled(LinearProgress)`
  display: inline-block;
  width: 100%;
  height: 8px;
  border-radius: 34px;
  background: rgba(0, 0, 0, 0.1);
  margin-left: 8px;
  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${props => props.theme.linearGradientGreen};
  }
`;

const PoolName = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: var(--color-blue) !important;;
`;
