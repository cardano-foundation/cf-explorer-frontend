import { useState } from "react";
import { Box } from "@mui/material";

import RecentWithdraws from "./RecentWithdraws";
import { WithdrawnDraw } from "./WithdrawDraw";

const Withdraw = () => {
  const [selected, setSelected] = useState<WithdrawItem | null>(null);
  const handleSelect = (withdraw: WithdrawItem | null) => {
    setSelected(withdraw);
  };
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  return (
    <Box>
      <RecentWithdraws onSelect={handleSelect} setShowBackButton={setShowBackButton} />
      {!!selected && <WithdrawnDraw selected={selected} setSelected={setSelected} showBackButton={showBackButton} />}
    </Box>
  );
};
export default Withdraw;
