import { Box } from "@mui/material";
import TabularOverview from "../../TabularView/TabularOverview";
import StakeTab from "../../TabularView/StakeTab";

const Tablular = () => {
  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab/>
    </Box>
  );
};

export default Tablular;
