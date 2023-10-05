import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { styled, TooltipProps, useTheme } from "@mui/material";

import { SeeMoreIconHome } from "src/commons/resources";

import CustomTooltip from "../CustomTooltip";

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: ${(props) =>
    props.theme.mode === "light" ? props.theme.palette.primary[100] : props.theme.palette.secondary[100]};
  &:hover {
    background: ${(props) =>
      props.theme.mode === "light" ? props.theme.palette.primary[100] : props.theme.palette.secondary[100]};
  }
`;

interface ViewAllButtonProps extends LinkProps {
  placement?: TooltipProps["placement"];
  tooltipTitle?: React.ReactNode;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ tooltipTitle = "View All", placement = "top", ...props }) => {
  const theme = useTheme();

  return (
    <CustomTooltip placement={placement} title={tooltipTitle}>
      <StyledLink {...props}>
        <SeeMoreIconHome fill={theme.palette.primary.main} data-testid="view-all-button" />
      </StyledLink>
    </CustomTooltip>
  );
};

export default ViewAllButton;
