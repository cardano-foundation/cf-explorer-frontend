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
      { title: "Top Delegators", href: routers.DELEGATION_POOLS },
      { title: "Top Addresses", href: "/addresses" },
    ],
  },
  {
    title: "Delegate Pools",
    children: [
      { title: "Delegation Pools", href: routers.DELEGATION_POOLS },
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
      { href: "https://cardanofoundation.org/en/about-us/", title: "About Us" },
      { href: "https://cardanofoundation.org/en/contact-us/", title: "Contact Us" },
      { href: "https://github.com/cardano-foundation", title: "Github" },
      { href: "https://docs.cardano.org/en/latest/", title: "Documentation" },
      { href: "https://cardanofoundation.org/en/news", title: "News and Blog" },
    ],
  },
  {
    title: "Community",
    children: [
      { href: "https://lin.ee/fN1r7Lf", title: "Line" },
      { href: "https://www.linkedin.com/company/cardano-foundation/", title: "LinkedIn" },
      { href: "https://www.meetup.com/pro/cardano/", title: "Meet up" },
      { href: "https://medium.com/@cardano.foundation", title: "Medium" },
      { href: "https://www.reddit.com/r/cardano/", title: "Reddit" },
      { href: "https://t.me/CardanoAnnouncements", title: "Telegram" },
      { href: "http://weibo.com/cardanofoundation", title: "Weibo" },
      { href: "https://www.youtube.com/c/cardanofoundation", title: "Youtube" },
    ],
  },
  {
    title: "Resources",
    children: [
      { href: "https://tutorials.cardanoacademy.io/", title: "Academy" },
      { href: "https://developers.cardano.org/tools/", title: "Builder tools" },
      { href: "https://cardanocrowd.com/dapps", title: "Dapps" },
      { href: "https://cardanocrowd.com/ico", title: "ICO" },
      { href: "https://cardanocrowd.com/development", title: "Development" },
      { href: "https://cardano.org/enterprise/", title: "Project" },
    ],
  },
];
