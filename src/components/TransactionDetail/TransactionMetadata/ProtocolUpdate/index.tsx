import React, { useState } from "react";
import { Box, Button } from "@mui/material";

import { Column } from "src/components/commons/Table";
import ParseScriptModal from "src/components/ParseScriptModal";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { TableProtocol, UpdatedValue } from "./styles";

interface IProps {
  data: TProtocolMerge[];
}

const ProtocolUpdate: React.FC<IProps> = ({ data }) => {
  const [costModelScript, setCostModelScript] = useState("");
  const columns: Column<TProtocolMerge>[] = [
    {
      title: "Parameter Name",
      isHiddenBorder: true,
      key: "paramName",
      minWidth: "40px",
      render: (r) => {
        return <div>{r.protocol}</div>;
      }
    },
    {
      title: "Previous Value",
      isHiddenBorder: true,
      key: "previousValue",
      minWidth: "40px",
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
      title: "Updated Value",
      key: "updatedValue",
      minWidth: "40px",
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
    <>
      <TableProtocol columns={columns} data={data.filter((item) => item.value !== null)} />
      <ParseScriptModal
        open={!!costModelScript}
        onClose={() => setCostModelScript("")}
        script={costModelScript}
        title="CostModel"
      />
    </>
  );
};

export default ProtocolUpdate;
