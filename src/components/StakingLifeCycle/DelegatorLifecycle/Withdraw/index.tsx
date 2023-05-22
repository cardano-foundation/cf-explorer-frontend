import { Box } from "@mui/material";
import { useState } from "react";

import RecentWithdraws from "./RecentWithdraws";
import { WithdrawnDraw } from "./WithdrawDraw";
import { FilterParams } from "~/components/StackingFilter";

const Withdraw = () => {
  const [selected, setSelected] = useState<WithdrawItem | null>(null);
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const handleSelect = (withdraw: WithdrawItem | null) => {
    setSelected(withdraw);
  };
  return (
    <Box>
      <Box>
        <RecentWithdraws onSelect={handleSelect} params={params} setParams={setParams} />
      </Box>
      <Box>{!!selected && <WithdrawnDraw selected={selected} setSelected={setSelected} />}</Box>
    </Box>
  );
};
export default Withdraw;
