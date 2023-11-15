import { styled } from "@mui/material";
import { Link } from "react-router-dom";

import { POOL_ACTION_TYPE } from "src/commons/utils/constants";

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-family: var(--font-family-text) !important;
`;

export const PoolActionMark = styled("small")<{ actionType?: PoolActionType }>`
  color: ${({ actionType, theme }) => {
    switch (actionType) {
      case POOL_ACTION_TYPE.POOL_DE_REGISTRATION:
        return theme.palette.error[700];
      case POOL_ACTION_TYPE.POOL_UPDATE:
        return theme.palette.warning[800];
      case POOL_ACTION_TYPE.POOL_REGISTRATION:
        return theme.palette.success[800];
      default:
        return theme.palette.success[800];
    }
  }};
  background-color: ${({ actionType, theme }) => {
    switch (actionType) {
      case POOL_ACTION_TYPE.POOL_DE_REGISTRATION:
        return theme.palette.error[100];
      case POOL_ACTION_TYPE.POOL_UPDATE:
        return theme.palette.warning[100];
      case POOL_ACTION_TYPE.POOL_REGISTRATION:
        return theme.palette.success[100];
      default:
        return theme.palette.success[100];
    }
  }};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 7px;
  border-radius: 2px;
  font-size: 0.8125rem;
  line-height: 1;
  width: max-content;
  white-space: no-wrap;
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 3px 3px;
    font-size: 0.75rem;
  }
`;
