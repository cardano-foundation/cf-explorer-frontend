import { stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

import { StyledLink } from "../styles";

const DelegationHistoryTab = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<DelegationHistory>(`${API.STAKE.DETAIL}/${stakeId}/delegation-history`, pageInfo);

  const columns: Column<DelegationHistory>[] = [
    {
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: isMobile ? "245px" : "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash || ""}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.createdAt"),
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time || "")
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
    },
    {
      title: t("glossary.poolId"),
      key: "poolId",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.poolId || ""}>
          <StyledLink to={details.delegation(r.poolId)}>{getShortHash(r.poolId || "")}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.poolName"),
      key: "poolName",
      minWidth: "120px",
      maxWidth: "200px",
      render: (r) => {
        let poolData: { name: string } = { name: "" };
        try {
          if (r.poolData) poolData = JSON.parse(r.poolData);
        } catch {
          // To Do
        }
        const name = poolData.name?.length > 30 ? getShortHash(poolData.name) : poolData.name;
        return (
          <CustomTooltip title={poolData.name || r.poolId}>
            <StyledLink to={details.delegation(r.poolId)}>{name || getShortHash(r.poolId)}</StyledLink>
          </CustomTooltip>
        );
      }
    }
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) }, history.location.state)
      }}
      onClickRow={(e, r: DelegationHistory) => history.push(details.delegation(r.poolId))}
    />
  );
};

export default DelegationHistoryTab;
