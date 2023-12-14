import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { Box } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { getPageInfo } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import { Column } from "src/types/table";
import Table from "src/components/commons/Table";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { StyledLink } from "./styles";

const TabNativeScripts = () => {
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const { t } = useTranslation();
  const history = useHistory();

  const fetchData = useFetchList<NativeScripts>(API.SCRIPTS.NATIVE_SCRIPTS, pageInfo);

  const columns: Column<NativeScripts>[] = [
    {
      title: t("ScriptHash"),
      key: "scriptHash",
      minWidth: "170px",
      maxWidth: "30vw",
      render: (r) => (
        <StyledLink to={details.nativeScriptDetail(r.scriptHash)}>
          <DynamicEllipsisText value={r.scriptHash} isTooltip />
        </StyledLink>
      )
    },
    {
      title: t("NumberOfTokens"),
      key: "numberOfTokens"
    },
    {
      title: t("NumberOfAssetHolders"),
      key: "numberOfAssetHolders"
    }
  ];

  return (
    <Box data-testid="TabNativeScripts">
      <Table
        {...fetchData}
        columns={columns}
        screen="smartContracts"
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        rowKey="scriptHash"
        height="unset"
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
        style={{ transform: "translateY(-20px)" }}
        maxHeight={380}
        isCenterLoading={true}
      />
    </Box>
  );
};

export default TabNativeScripts;
