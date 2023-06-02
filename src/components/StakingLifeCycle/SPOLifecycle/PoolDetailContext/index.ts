import { createContext } from "react";

const PoolDetailContext = createContext<PoolInfo | null>(null);

export default PoolDetailContext;
