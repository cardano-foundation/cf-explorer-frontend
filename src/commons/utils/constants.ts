import { Wallet } from "../../types/user";
import { EternlIcon, FlintIcon, NamiIcon, YoroiIcon } from "../resources";


export const SUPPORTED_WALLETS: Wallet[] = [
    { name: "Flint", icon: FlintIcon },
    { name: "Nami", icon: NamiIcon },
    { name: "Eternl", icon: EternlIcon },
    { name: "Yoroi", icon: YoroiIcon }
];