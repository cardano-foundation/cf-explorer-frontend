import React from "react";
import { alpha, Box, styled, TooltipProps, useTheme } from "@mui/material";

import { SeeMoreIconHome } from "src/commons/resources";

import CustomTooltip from "../CustomTooltip";

const StyledLink = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  &:hover {
    background: ${(props) => alpha(props.theme.palette.primary.main, 0.3)};
  }
`;

interface ViewAllButtonExternalProps {
  placement?: TooltipProps["placement"];
  tooltipTitle?: React.ReactNode;
  to: string;
}

const ViewAllButtonExternal: React.FC<ViewAllButtonExternalProps> = ({
  tooltipTitle = "View All",
  placement = "top",
  to = ""
}) => {
  const theme = useTheme();

  return (
    <CustomTooltip placement={placement} title={tooltipTitle}>
      <a href={to as string} target="_blank" rel="noreferrer" data-testid="view-all-button">
        <StyledLink>
          <SeeMoreIconHome fill={theme.palette.primary.main} />
        </StyledLink>
      </a>
    </CustomTooltip>
  );
};

export default ViewAllButtonExternal;
