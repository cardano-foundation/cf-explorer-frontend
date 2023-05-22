import { Box } from "@mui/material";
import { useState } from "react";

import RecentWithdraws from "./RecentWithdraws";
import { WithdrawnDraw } from "./WithdrawDraw";

const Withdraw = () => {
  const [selected, setSelected] = useState<WithdrawItem | null>(null);

  const handleSelect = (withdraw: WithdrawItem | null) => {
    setSelected(withdraw);
  };
  return (
    <Box>
      <Box>
        <RecentWithdraws onSelect={handleSelect} />
      </Box>
      <Box>{!!selected && <WithdrawnDraw selected={selected} setSelected={setSelected} />}</Box>
    </Box>
  );
};
export default Withdraw;
