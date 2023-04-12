import { Box } from "@mui/material";

const ADAicon = ({ ...props }) => {
  return (
    <Box component={"span"} {...props} fontSize={"1rem"} lineHeight={1} fontWeight={"regular"}>
      ₳
    </Box>
  );
};

export default ADAicon;
