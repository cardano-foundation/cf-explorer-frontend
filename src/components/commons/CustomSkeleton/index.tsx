import { SkeletonTypeMap } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";

import { StyledSkeleton } from "./styles";

export const CommonSkeleton = (props: SkeletonTypeMap["props"] & CommonProps) => {
  return <StyledSkeleton {...props} />;
};
