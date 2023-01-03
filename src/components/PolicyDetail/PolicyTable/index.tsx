import moment from "moment";
import { stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { formatADA, getPageInfo, getShortHash } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";
import { LinkComponent } from "./styles";

const PolicyTable = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<TokenPolicys>(`/policy/${policyId}/tokens`, pageInfo);

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
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
        onClickRow={(_, r: TokenPolicys) => history.push(details.token(r.fingerprint))}
      />
    </Card>
  );
};

export default PolicyTable;
