import { Box, useTheme } from "@mui/material";
import { t } from "i18next";
import { stringify } from "qs";
import { Link, useHistory, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";

const Members = () => {
  const { pageInfo } = usePageInfo();
  const { tabActive } = useParams<{ tabActive?: string }>();
  const history = useHistory();

  const { data, loading, error, total, initialized, statusError } = useFetchList<CCMember>(
    tabActive === "listMembers" ? API.COMMITTEE.MEMBERS : "",
    {
      ...pageInfo
    }
  );
  const theme = useTheme();
  const columns: Column<CCMember>[] = [
    {
      title: <Box data-testid="cc.member.publicKey.title">{t("cc.member.publicKey")}</Box>,
      key: "no",
      render: (r, idx) => (
        <Box
          data-testid={`cc.member.publicKey.value#${idx}`}
          component={Link}
          to={details.constitutionalCommitteeDetail(r.publicKey, "governanceVotes")}
          color={`${theme.palette.primary.main} !important`}
        >
          {r.publicKey}
        </Box>
      )
    },

    {
      title: (
        <Box data-testid="cc.member.status.title" component="span">
          {t("cc.member.status")}
        </Box>
      ),
      key: "value",
      minWidth: "120px",
      render: (data, idx) => (
        <Box data-testid={`cc.member.status.value#${idx}`} component={"span"}>
          {data.status}
        </Box>
      )
    },
    {
      title: (
        <Box data-testid="cc.member.term.title" component="span">
          {t("cc.member.term")}
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data, idx) => (
        <Box data-testid={`cc.member.term.title#${idx}`} component={"span"}>
          {data.activeEpoch || 0}
          {data.expiredEpoch && "-"} {data.expiredEpoch ? data.expiredEpoch : ""}
        </Box>
      )
    }
  ];

  return (
    <Table
      data-testid="stakingDelegators.table"
      columns={columns}
      data={data}
      error={error}
      statusError={statusError}
      total={{ count: total, title: t("glossary.totalTokenList") }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          history.replace({ search: stringify({ ...pageInfo, page, size }) });
        },
        page: 1,
        total: total,
        size: 10
      }}
    />
  );
};

export default Members;
