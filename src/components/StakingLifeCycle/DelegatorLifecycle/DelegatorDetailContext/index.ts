import { createContext } from "react";

type TContextDelegator = { totalDelegatorRewards: number; totalOperatorRewards: number } & IStakeKeyDetail;

const DelegatorDetailContext = createContext<TContextDelegator | null>(null);

export default DelegatorDetailContext;
