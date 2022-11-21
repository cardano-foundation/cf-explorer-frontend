interface Menu {
  title: string;
  href?: string;
  mega?: boolean;
  children?: Menu[];
}
export const menus: Menu[] = [
  { title: "DID", href: "/did" },
  { title: "Supply Chain", href: "/chains" },
  {
    title: "Blockchain",
    children: [
      { title: "Epoch", href: "/epochs" },
      { title: "Blocks", href: "/blocks" },
      { title: "Transactions API", href: "/transactions" },
      { title: "Tokens", href: "/tokens" },
      { title: "Top Delegators", href: "/delegators" },
      { title: "Top Addresses", href: "/sddresses" },
    ],
  },
  {
    title: "Delegate Pools",
    children: [
      { title: "Delegation Pools", href: "/delegation-pools" },
      { title: "Stake key registration", href: "/Stake-key-registration" },
      { title: "Pool Registration", href: "/Pool-Registration" },
    ],
  },
  {
    title: "Tool",
    href: "/tools",
  },
];
