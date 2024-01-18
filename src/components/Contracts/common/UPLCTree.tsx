import { Box } from "@mui/material";
import { TreeView } from "@mui/x-tree-view";
import React, { useId, useMemo } from "react";

import { CloseSquareIcon, MinusSquareIcon, PlusSquareIcon } from "src/commons/resources";
import { UPLCData, UPLCProgram } from "src/types/uplc";

import { StyledTreeItem } from "./styles";

export interface UPLCTreeProps {
  uplc: UPLCProgram;
}

const getNameOfUPLCData = (data: UPLCData): string[] => {
  if (!data?.data) return [data.text];
  const names = data.data.reduce((prev, cur) => [...prev, ...getNameOfUPLCData(cur)], [data.text]);
  return names;
};

export const UPLCTree: React.FC<UPLCTreeProps> = ({ uplc }) => {
  const label = useMemo(() => `program ${uplc.version.major}.${uplc.version.minor}.${uplc.version.patch}`, [uplc]);
  const id = useId();
  const nodeIds: string[] = useMemo(
    () =>
      uplc.data.reduce(
        (prev, cur) => {
          if (Array.isArray(cur)) {
            const names = cur.map((item) => getNameOfUPLCData(item)).reduce((acc, value) => [...acc, ...value], []);
            return [...prev, ...names];
          } else {
            return [...prev, ...getNameOfUPLCData(cur)];
          }
        },
        [id]
      ),
    [uplc]
  );

  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<MinusSquareIcon />}
        defaultExpandIcon={<PlusSquareIcon />}
        defaultEndIcon={<CloseSquareIcon />}
        defaultExpanded={[...nodeIds, ""]}
      >
        <StyledTreeItem label={label} nodeId={id}>
          {uplc.data.map((it, idx) =>
            Array.isArray(it) ? (
              <UPLCTreeItem label={""} data={it} key={id + idx} />
            ) : (
              <UPLCTreeItem label={it.text} key={id + idx} data={it.data} />
            )
          )}
        </StyledTreeItem>
      </TreeView>
    </Box>
  );
};

interface UPLCTreeItem {
  label: string;
  data?: UPLCData[];
}

const UPLCTreeItem: React.FC<UPLCTreeItem> = ({ label, data }) => {
  const id = useId();
  return (
    <StyledTreeItem label={label} nodeId={label}>
      {data?.map((it, idx) => (
        <UPLCTreeItem label={it.text} data={it.data} key={id + idx} />
      ))}
    </StyledTreeItem>
  );
};
