import { createContext } from "react";

const DelegatorDetailContext = createContext<IStakeKeyDetail | null>(null);

export default DelegatorDetailContext;