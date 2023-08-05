import React, { FunctionComponent, SVGAttributes, useMemo } from "react";
import { Box, BoxProps, styled } from "@mui/material";

import CustomIcon, { Props as IconProps } from "../CustomIcon";

export interface CustomTabTitleProps extends BoxProps {
  active?: boolean;
  disabled?: boolean;
  icon?: FunctionComponent<SVGAttributes<SVGElement>>;
  label?: string;
  children?: React.ReactNode;
  iconProps?: Partial<IconProps>;
  labelProps?: BoxProps;
}

const CustomTabTitle: React.FC<CustomTabTitleProps> = React.forwardRef(
  ({ active = false, disabled = false, icon, label, children, iconProps, labelProps, ...props }, ref) => {
    const renderLabel = useMemo(() => {
      if (children) return children;
      return label;
    }, [children, label]);

    return (
      <Box ref={ref} display="flex" alignItems="center" justifyContent={"center"} {...props}>
        {icon && (
          <CustomIcon
            icon={icon}
            color={({ palette }) =>
              disabled ? palette.secondary[600] : active ? palette.primary.main : palette.secondary.light
            }
            width={23}
            stroke="currentColor"
            {...iconProps}
          />
        )}
        <CustomTabLabel style={{ marginLeft: icon ? 5 : 0 }} active={+active} disabled={+disabled} {...labelProps}>
          {renderLabel}
        </CustomTabLabel>
      </Box>
    );
  }
);

CustomTabTitle.displayName = "CustomTabTitle";

export default CustomTabTitle;

export const CustomTabLabel = styled(Box)<{ active?: number; disabled?: number }>`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-transform: none;
  margin-left: 5px;
  color: ${({ theme: { palette }, active, disabled }) =>
    disabled ? palette.secondary[600] : active ? palette.primary.main : palette.secondary.light};
`;
