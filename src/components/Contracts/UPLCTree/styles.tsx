import { alpha, styled } from "@mui/material";
import { TreeView } from "@mui/x-tree-view";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

export const TreeContainer = styled(TreeView)`
  overflow: auto;
  max-height: 50vh;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;

export const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: "2px 8px"
  },
  [`& .${treeItemClasses.label}`]: {
    color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
    whiteSpace: "nowrap"
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${theme.isDark ? alpha(theme.palette.grey[200], 0.8) : alpha(theme.palette.grey[400], 0.5)}`
  }
}));
