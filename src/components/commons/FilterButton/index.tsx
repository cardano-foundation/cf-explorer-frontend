import { useState } from "react";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import { Box } from "@mui/material";

import { FilterIcon } from "src/commons/resources";

import { OutlineButton, WrapPopoverContent } from "./styles";

interface FilterItem {
  label: string;
  value: string;
  icon: any;
}

interface FilterButtonProps {
  options: FilterItem[];
  defaultOption?: any;
}

export default function FilterButton(props: FilterButtonProps) {
  const { options: initialOptions, defaultOption } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [, setSelected] = useState(defaultOption); // default selected option
  const [options] = useState(initialOptions);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: any) => {
    setSelected(option);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <OutlineButton onClick={handleClick}>
        <Box marginRight={"5px"} display={"flex"} alignItems={"center"}>
          <FilterIcon />
        </Box>
        Filter
      </OutlineButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 260, left: 1510 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "12px"
          }
        }}
      >
        <List>
          {options.map((option: FilterItem, idx) => (
            <WrapPopoverContent onClick={() => handleOptionClick(option.value)} key={idx}>
              <Box marginRight={"5px"} display={"flex"} alignItems={"center"}>
                {option.icon}
              </Box>
              <span>{option.label}</span>
            </WrapPopoverContent>
          ))}
        </List>
      </Popover>
    </>
  );
}
