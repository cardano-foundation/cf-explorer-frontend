import { styled } from "@mui/material";

export const CustomBadge = styled("span")<{ bgColor?: string; color?: string; ml?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  min-width: 21px;
  line-height: 1;
  min-height: 21px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-left: ${(props) => (props.ml ? props.ml : "6px")};
  background-color: ${(props) =>
    props.bgColor
      ? props.bgColor
      : props.theme.isDark
      ? props.theme.palette.secondary[600]
      : props.theme.palette.secondary.light};
  color: ${(props) => (props.color ? props.color : props.theme.palette.common.white)};
`;
