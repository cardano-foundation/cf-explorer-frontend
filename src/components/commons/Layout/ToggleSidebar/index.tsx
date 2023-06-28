import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

import { RootState } from "src/stores/types";

import CustomTooltip from "../../CustomTooltip";
import { ToggleMenu, ArrowCollapse } from "./styles";

interface Props {
  handleToggle: () => void;
}

const ToggleSidebar: React.FC<Props> = ({ handleToggle }) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    handleToggle();
    setShow(false);
  };

  return (
    <CustomTooltip
      open={show}
      disableHoverListener
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      placement="right"
      title={sidebar ? "Collapse" : "Expand"}
    >
      <ToggleMenu onClick={handleClick} type="button" data-testid="toggle-sidebar-toggle-menu">
        <ArrowCollapse>
          {sidebar ? (
            <FaArrowLeft data-testid="toggle-sidebar-arrow-left" />
          ) : (
            <FaArrowRight data-testid="toggle-sidebar-arrow-right" />
          )}
        </ArrowCollapse>
      </ToggleMenu>
    </CustomTooltip>
  );
};

export default ToggleSidebar;
