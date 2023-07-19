import React, { useState } from "react";
import { Box, Button } from "@mui/material";

import { Column } from "src/components/commons/Table";
import ParseScriptModal from "src/components/ParseScriptModal";

import { TableProtocol } from "./styles";

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
          <Box
            component={r.protocol === "costModel" ? Button : Box}
            onClick={() => r.protocol === "costModel" && setCostModelScript(r.oldValue?.toString() || "")}
            p={0}
            justifyItems={"flex-start"}
            textTransform={"capitalize"}
          >
            <Box
              maxWidth={300}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              color={({ palette }) => (r.protocol === "costModel" ? palette.blue[100] : "unset")}
            >
              {r?.oldValue}
            </Box>
          </Box>
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
          <Box
            component={r.protocol === "costModel" ? Button : Box}
            onClick={() => r.protocol === "costModel" && setCostModelScript(r.value?.toString() || "")}
            p={0}
            justifyItems={"flex-start"}
            textTransform={"capitalize"}
          >
            <Box
              maxWidth={300}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              color={({ palette }) => (r.protocol === "costModel" ? palette.blue[100] : "unset")}
            >
              {r?.value}
            </Box>
          </Box>
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
