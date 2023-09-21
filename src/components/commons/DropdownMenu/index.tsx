import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useTheme } from "@emotion/react";

import { BrowserIcon } from "src/commons/resources";

const StyledMenuDropdown = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 5,
    marginLeft: 138,
    minWidth: 275,
    color: theme.palette.secondary.light,
    boxShadow: "0px 3px 5px 0px rgba(67, 70, 86, 0.25)",
    "& .MuiMenu-list": {
      padding: "8px 0"
    },
    "& .MuiMenuItem-root": {
      padding: "12px 20px",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
        marginRight: theme.spacing(1.5)
      }
    },
    "& button": {
      width: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      width: "calc(100% - 44px)"
    }
  }
}));

const TextMenu = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: 16px;
  font-weight: 500;
  text-transform: none;
`;

const StyledButtonMenu = styled(Button)`
  height: 51px;
  background-color: ${({ theme }) => theme.palette.primary[100]};
  border: ${({ theme }) => `1px solid ${theme.palette.primary[200]}`};
  border-radius: 8px;
  bordercolor: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  &:hover {
    background-color: inherit;
    opacity: 0.8;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100% !important;
  }
`;

interface IDropdownMenuProps {
  options: { label: string; value: string }[];
  title: string;
  handleSelect: (value: string) => void;
  handleClose?: () => void;
}

export default function DropdownMenu(props: IDropdownMenuProps) {
  const { options, title, handleSelect, handleClose } = props;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
    handleClose?.();
  };

  const onSelect = (value: string) => {
    onClose();
    handleSelect(value);
  };

  return (
    <>
      <StyledButtonMenu
        data-testid="dropdown-menu-button"
        id="dropdown-menu-button"
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={onClick}
        endIcon={
          open ? (
            <PiCaretUpBold color={theme.palette.secondary.light} />
          ) : (
            <PiCaretDownBold color={theme.palette.secondary.light} />
          )
        }
      >
        <Box display={"flex"} gap={1} justifyContent={"center"} alignItems={"center"}>
          <BrowserIcon />
          <TextMenu>{title}</TextMenu>
        </Box>
      </StyledButtonMenu>
      <StyledMenuDropdown
        id="dropdown-menu"
        MenuListProps={{
          "aria-labelledby": "dropdown-menu-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} onClick={() => onSelect(value)} disableRipple>
            {label}
          </MenuItem>
        ))}
      </StyledMenuDropdown>
    </>
  );
}
