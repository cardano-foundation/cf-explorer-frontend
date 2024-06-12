import { Box, useTheme } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";

import Table from "src/components/commons/Table";
import { Column } from "src/types/table";

interface MembersIF {
  publicKey: string;
  status: string;
  term: string;
}

const mockData = [
  { publicKey: "addr1vxs5sejcrqzt3elnkedv452hr7e5v8sqydmurj3cnrre27cg00ahv", status: "Active", term: "483-824" },
  { publicKey: "addr1vxs5sejcrqzt3elnkedv452hr7e5v8sqydmurj3cnrre27cg00ahv", status: "Active", term: "483-824" },
  { publicKey: "addr1vxs5sejcrqzt3elnkedv452hr7e5v8sqydmurj3cnrre27cg00ahv", status: "Active", term: "483-824" },
  { publicKey: "addr1vxs5sejcrqzt3elnkedv452hr7e5v8sqydmurj3cnrre27cg00ahv", status: "Active", term: "483-824" },
  { publicKey: "addr1vxs5sejcrqzt3elnkedv452hr7e5v8sqydmurj3cnrre27cg00ahv", status: "Active", term: "483-824" },
  { publicKey: "addr1vxs5sejcrqzt3elnkedv452hr7e5v8sqydmurj3cnrre27cg00ahv", status: "Active", term: "483-824" }
];

const Members = () => {
  const theme = useTheme();
  const columns: Column<MembersIF>[] = [
    {
      title: <Box data-testid="cc.member.publicKey.title">{t("cc.member.publicKey")}</Box>,
      key: "no",
      render: (r, idx) => (
        <Box
          data-testid={`cc.member.publicKey.value#${idx}`}
          component={Link}
          to={"#"}
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
          {data.term}
        </Box>
      )
    }
  ];

  return (
    <Table
      data-testid="stakingDelegators.table"
      columns={columns}
      data={mockData}
      // error={error}
      // statusError={statusError}
      total={{ count: mockData.length, title: t("glossary.totalTokenList") }}
      // loading={loading}
      // initialized={initialized}
      pagination={{
        // onChange: (page, size) => {
        //   setQuery({ tab: query.tab, page, size });
        // },
        page: 1,
        total: mockData.length,
        size: 10
      }}
      // onClickRow={(e, r) => {
      //   history.push(details.stake(r.view || r.stakeAddress));
      // }}
    />
  );
};

export default Members;
