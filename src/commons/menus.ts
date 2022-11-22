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
      { title: "Transactions", href: routers.TRANSACTION_LIST },
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
export const footerMenus: Menu[] = [
  {
    title: "Browser",
    children: [
      { href: "/", title: "About Us" },
      { href: "/", title: "Contact Us" },
      { href: "https://github.com", title: "Github" },
      { href: "/", title: "Documentation" },
      { href: "/", title: "News and Blog" },
    ],
  },
  {
    title: "Community",
    children: [
      { href: "https://line.me/en/", title: "Line" },
      { href: "https://www.linkedin.com/", title: "LinkedIn" },
      { href: "https://meet.google.com/", title: "Meet up" },
      { href: "https://medium.com/", title: "Medium" },
      { href: "https://www.reddit.com/", title: "Reddit" },
      { href: "https://telegram.org/", title: "Telegram" },
      { href: "https://weibo.com/overseas", title: "Weibo" },
      { href: "https://www.youtube.com/", title: "Youtube" },
    ],
  },
  {
    title: "Resources",
    children: [
      { href: "/", title: "Academy" },
      { href: "/", title: "Dapps" },
      { href: "/", title: "ICO" },
      { href: "/", title: "Development" },
      { href: "/", title: "Project" },
    ],
  },
];
