import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Column } from "src/components/commons/Table";
import ParseScriptModal from "src/components/ParseScriptModal";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { TableProtocol, UpdatedValue, Wrapper } from "./styles";

interface IProps {
  data: TProtocolMerge[];
}

const ProtocolUpdate: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const [costModelScript, setCostModelScript] = useState("");
  const columns: Column<TProtocolMerge>[] = [
    {
      title: t("common.parameterName"),
      isHiddenBorder: true,
      key: "paramName",
      minWidth: "40px",
      render: (r) => {
        return <div>{r.protocol}</div>;
      }
    },
    {
      title: t("common.previousValue"),
      isHiddenBorder: true,
      key: "previousValue",
      minWidth: "40px",
      maxWidth: "40vw",
      render: (r) => {
        return (
          <CustomTooltip title={r.protocol === "costModel" ? "" : r.oldValue}>
            <UpdatedValue
              component={r.protocol === "costModel" ? Button : Box}
              onClick={() => r.protocol === "costModel" && setCostModelScript(r.oldValue?.toString() || "")}
              color={({ palette }) => (r.protocol === "costModel" ? palette.primary.main : "unset")}
            >
              {r.oldValue}
            </UpdatedValue>
          </CustomTooltip>
        );
      }
    },
    {
      title: t("common.updatedValue"),
      key: "updatedValue",
      minWidth: "40px",
      maxWidth: "40vw",
      isHiddenBorder: true,
      render: (r) => {
        return (
          <CustomTooltip title={r.protocol === "costModel" ? "" : r.value}>
            <UpdatedValue
              component={r.protocol === "costModel" ? Button : Box}
              onClick={() => r.protocol === "costModel" && setCostModelScript(r.value?.toString() || "")}
              color={({ palette }) => (r.protocol === "costModel" ? palette.primary.main : "unset")}
            >
              {r.value}
            </UpdatedValue>
          </CustomTooltip>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <TableProtocol columns={columns} showPagination={false} data={data.filter((item) => item.value !== null)} />
      <ParseScriptModal
        open={!!costModelScript}
        onClose={() => setCostModelScript("")}
        script={costModelScript}
        title={t("common.CostModel")}
      />
    </Wrapper>
  );
};

export default ProtocolUpdate;
