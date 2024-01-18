import React, { memo, useMemo } from "react";

import { CloseSquareIcon, MinusSquareIcon, PlusSquareIcon } from "src/commons/resources";
import { UPLCData, UPLCProgram } from "src/types/uplc";

import { StyledTreeItem, TreeContainer } from "./styles";

export interface UPLCTreeProps {
  uplc: UPLCProgram;
}

export const UPLCTree: React.FC<UPLCTreeProps> = ({ uplc }) => {
  const label = useMemo(() => `program ${uplc.version.major}.${uplc.version.minor}.${uplc.version.patch}`, [uplc]);

  const getNodeIds = () => {
    if (!uplc) return [];
    const nodeIds = ["root", ""];
    let currentLevel = 1;
    const queue: UPLCData[] = [];
    uplc.data.forEach((it) => {
      if (Array.isArray(it)) queue.push(...it);
      else queue.push(it);
    });
    while (queue.length > 0) {
      currentLevel++;
      if (currentLevel >= 3) break;
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const tmp = queue.shift();
        if (tmp) {
          nodeIds.push(tmp.text);
          if (tmp.data) queue.push(...tmp.data);
        }
      }
    }
    return nodeIds;
  };

  return (
    <TreeContainer
      defaultCollapseIcon={<MinusSquareIcon />}
      defaultExpandIcon={<PlusSquareIcon />}
      defaultEndIcon={<CloseSquareIcon />}
      defaultExpanded={getNodeIds()}
    >
      <StyledTreeItem label={label} nodeId={"root"}>
        {uplc.data.map((it, idx) =>
          Array.isArray(it) ? (
            <UPLCTreeItem label={""} data={it} key={"tree-item-" + idx} />
          ) : (
            <UPLCTreeItem label={it.text} data={it.data} key={"tree-item-" + label + idx} />
          )
        )}
      </StyledTreeItem>
    </TreeContainer>
  );
};

interface UPLCTreeItemProps {
  label: string;
  data?: UPLCData[];
}

const UPLCTreeItem: React.FC<UPLCTreeItemProps> = ({ label, data }) => {
  return (
    <StyledTreeItem label={label} nodeId={label}>
      {data?.map((it, idx) => (
        <UPLCTreeItem label={it.text} data={it.data} key={"tree-item-" + label + idx} />
      ))}
    </StyledTreeItem>
  );
};

export default memo(UPLCTree);
