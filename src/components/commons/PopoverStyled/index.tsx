import Popover from '@mui/material/Popover';


interface PopoverStyledProps {
  children: any;
  anchorEl: any;
  handleClose: any;
}

export default function PopoverStyled(props: PopoverStyledProps) {
  const { children, anchorEl, handleClose } = props;

  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 260, left: 1510 }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: '12px',
          padding: '10px',
        }
      }}
    >
      {children}
    </Popover>
  );
}
