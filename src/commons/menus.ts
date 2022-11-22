import { routers } from "./routers";

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
      { title: "Epoch", href: routers.EPOCH_LIST },
      { title: "Blocks", href: routers.BLOCK_LIST },
      { title: "Transactions API", href: routers.TRANSACTION_LIST },
      { title: "Tokens", href: "/tokens" },
      { title: "Top Delegators", href: routers.POOL_LIST },
      { title: "Top Addresses", href: "/addresses" },
    ],
  },
  {
    title: "Delegate Pools",
    children: [
      { title: "Delegation Pools", href: routers.POOL_LIST },
      { title: "Stake key registration", href: "/Stake-key-registration" },
      { title: "Pool Registration", href: "/Pool-Registration" },
    ],
  },
  {
    title: "Tool",
    href: "/tools",
  },
];

export const browse = [
  {
    href: "#",
    title: "About us",
  },
  {
    href: "#",
    title: "Contact Us",
  },
  {
    href: "#",
    title: "Github",
  },
  {
    href: "#",
    title: "Documentation",
  },
  {
    href: "#",
    title: "News and Blog",
  },
];

export const community = [
  {
    href: "#",
    title: "Line",
  },
  {
    href: "#",
    title: "LinkedIn",
  },
  {
    href: "#",
    title: "Meet up",
  },
  {
    href: "#",
    title: "Medium",
  },
  {
    href: "#",
    title: "Reddit",
  },
  {
    href: "#",
    title: "Reddit",
  },
  {
    href: "#",
    title: "Telegram",
  },
  {
    href: "#",
    title: "Weibo",
  },
  {
    href: "#",
    title: "Youtube",
  },
];

export const resource = [
  {
    href: "#",
    title: "Academy",
  },
  {
    href: "#",
    title: "Dapps",
  },
  {
    href: "#",
    title: "ICO",
  },
  {
    href: "#",
    title: "Development",
  },
  {
    href: "#",
    title: "Project",
  },
];
