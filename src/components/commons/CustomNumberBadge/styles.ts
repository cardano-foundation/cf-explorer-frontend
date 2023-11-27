import { styled } from "@mui/material";

export const CustomBadge = styled("span")<{ bgColor?: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  min-width: 21px;
  min-height: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-left: 6px;
  background-color: ${(props) =>
    props.bgColor
      ? props.bgColor
      : props.theme.isDark
      ? props.theme.palette.secondary[600]
      : props.theme.palette.secondary.light};
  color: ${(props) => (props.color ? props.color : props.theme.palette.common.white)};
`;
