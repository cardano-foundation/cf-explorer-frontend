import { Box } from "@mui/material";
import { useEffect } from "react";

const Micar = () => {
  useEffect(() => {
    document.title = `Micar | Cardano Blockchain Explorer`;
  }, []);

  return (
    <Box>
      <>Micar indicator component here</>
    </Box>
  );
};

export default Micar;
