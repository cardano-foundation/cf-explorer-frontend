import React, { memo, useMemo } from "react";
import { useTheme } from "@emotion/react";

import { CloseSquareIcon, MinusSquareIcon, PlusSquareIcon } from "src/commons/resources";
import { UPLCData, UPLCProgram } from "src/types/uplc";

import { StyledTreeItem, TreeContainer } from "./styles";

export interface UPLCTreeProps {
  uplc: UPLCProgram;
}

export const UPLCTree: React.FC<UPLCTreeProps> = ({ uplc }) => {
  const label = useMemo(() => `program ${uplc.version.major}.${uplc.version.minor}.${uplc.version.patch}`, [uplc]);
  const theme = useTheme();
  const getExpandedNodeIds = () => {
    if (!uplc) return [];
    const nodeIds = ["root"];
    let currentLevel = 1;
    const maxLevel = 2;

    // Get nodeIds with bread first search
    const queue: UPLCData[] = [];
    uplc.program.data.forEach((it) => {
      queue.push(it);
    });
    while (queue.length > 0) {
      currentLevel++;
      if (currentLevel >= maxLevel) break;
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const tmp = queue.shift();
        if (tmp && tmp.data) {
          nodeIds.push(String(tmp.id));
          queue.push(...tmp.data);
        }
      }
    }
    return nodeIds;
  };

  return (
    <TreeContainer
      defaultCollapseIcon={<MinusSquareIcon fill={theme.isDark ? theme.palette.secondary.light : "none"} />}
      defaultExpandIcon={<PlusSquareIcon fill={theme.isDark ? theme.palette.secondary.light : "none"} />}
      defaultEndIcon={<CloseSquareIcon fill={theme.isDark ? theme.palette.secondary.light : "none"} />}
      defaultExpanded={getExpandedNodeIds()}
    >
      <StyledTreeItem label={label} nodeId={"root"}>
        {uplc.program?.data?.map((it, idx) => (
          <UPLCTreeItem label={it.text} data={it.data} key={"tree-item-" + label + idx} id={String(it.id)} />
        ))}
      </StyledTreeItem>
    </TreeContainer>
  );
};

interface UPLCTreeItemProps {
  label?: string;
  data?: UPLCData[];
  id: string;
}

const UPLCTreeItem: React.FC<UPLCTreeItemProps> = ({ label, data, id }) => {
  return (
    <StyledTreeItem label={label} nodeId={id}>
      {data?.map((it, idx) => (
        <UPLCTreeItem label={it?.text} data={it.data} key={"tree-item-" + label + idx} id={String(it.id)} />
      ))}
    </StyledTreeItem>
  );
};

export default memo(UPLCTree);
