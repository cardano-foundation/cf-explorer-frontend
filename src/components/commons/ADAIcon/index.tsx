import { Box } from "@mui/material";

const ADAicon = ({ ...props }) => {
  return (
    <Box component={"span"} {...props} fontSize={"14px"} lineHeight={1} fontWeight={"regular"}>
      ₳
    </Box>
  );
};

export default ADAicon;
