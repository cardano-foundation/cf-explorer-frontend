import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { alpha, styled, TooltipProps } from "@mui/material";

import { SeeMoreIcon } from "src/commons/resources";

import CustomTooltip from "../CustomTooltip";

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: ${(props) => alpha(props.theme.palette.primary.main, 0.15)};
  &:hover {
    background: ${(props) => alpha(props.theme.palette.primary.main, 0.3)};
  }
`;

const ViewAllImage = styled("img")`
  width: auto;
  height: 16px;
  min-width: 16px;
`;

interface ViewAllButtonProps extends LinkProps {
  placement?: TooltipProps["placement"];
  tooltipTitle?: React.ReactNode;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ tooltipTitle = "View All", placement = "top", ...props }) => {
  return (
    <CustomTooltip placement={placement} title={tooltipTitle}>
      <StyledLink {...props}>
        <ViewAllImage src={SeeMoreIcon} alt="view all" />
      </StyledLink>
    </CustomTooltip>
  );
};

export default ViewAllButton;
