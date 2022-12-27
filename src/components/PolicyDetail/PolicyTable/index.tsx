import { Box } from "@mui/material";
import moment from "moment";
import { parse, stringify } from "qs";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { formatADA, getShortHash } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";
import { LinkComponent } from "./styles";

const PolicyTable = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const { data, initialized, loading, total, currentPage } = useFetchList<TokenPolicys>(`/policy/${policyId}/tokens`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const columns: Column<TokenPolicys>[] = [
    {
      title: "Token name",
      key: "tokenname",
      minWidth: "50px",
      render: r => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || r.name}</LinkComponent>,
    },
    {
      title: "Token id",
      key: "id",
      minWidth: "100px",
      render: r => <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint)}</LinkComponent>,
    },
    {
      title: "Create Date",
      key: "date",
      minWidth: "150px",
      render: r => moment(r.createdOn).format("MM/DD/YYYY hh:mm:ss"),
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => <>{formatADA(r?.supply ?? "")}</>,
    },
    {
      title: "Total Transactions",
      key: "trxtotal",
      minWidth: "150px",
      render: r => <>{r?.txCount ?? ""}</>,
    },
  ];

  return (
    <Card title="Tokens">
      <Table
        columns={columns}
        data={data || []}
        loading={loading}
        initialized={initialized}
        total={{ count: total, title: "Total" }}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: total,
        }}
      />
    </Card>
  );
};

export default PolicyTable;
