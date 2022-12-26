import { FaLinkedinIn, FaTelegramPlane, FaTwitter, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import {
  BlockChainMenuIcon,
  BrowseIcon,
  DelegatePoolMenuIcon,
  DIDMenuIcon,
  MediumIcon,
  ResourcesIcon,
  SupplyChainMenuIcon,
  ToolMenuIcon,
} from "./resources";
import { routers } from "./routers";

interface Menu {
  title: string;
  href?: string;
  mega?: boolean;
  children?: Menu[];
  icon?: string;
  tooltip?: string;
}
interface Social {
  title: string;
  href: string;
  icon: IconType | string;
}
export const menus: Menu[] = [
  { title: "DID", icon: DIDMenuIcon, tooltip: "Coming soon" },
  { title: "Supply Chain", icon: SupplyChainMenuIcon, tooltip: "Coming soon" },
  {
    title: "Blockchain",
    icon: BlockChainMenuIcon,
    children: [
      { title: "Epoch", href: routers.EPOCH_LIST },
      { title: "Blocks", href: routers.BLOCK_LIST },
      { title: "Transactions", href: routers.TRANSACTION_LIST },
      { title: "Tokens", href: "/tokens" },
      { title: "Top Delegators", href: routers.DELEGATION_POOLS },
      { title: "Top Addresses", href: "/addresses" },
      { title: "Contracts", href: routers.CONTRACT_LIST },
    ],
  },
  {
    title: "Delegate Pools",
    icon: DelegatePoolMenuIcon,
    children: [
      { title: "Delegation Pools", href: routers.DELEGATION_POOLS },
      { title: "Stake key registration", href: routers.STAKE_LIST },
      { title: "Pool Registration", href: "/registration-pools" },
    ],
  },
  {
    title: "Tool",
    href: "https://cardano-tools.io/latest",
    icon: ToolMenuIcon,
  },
];

export const socials: Social[] = [
  { href: "https://www.linkedin.com/company/cardano-foundation/", title: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://medium.com/@cardano.foundation", title: "Medium", icon: MediumIcon },
  { href: "https://t.me/CardanoAnnouncements", title: "Telegram", icon: FaTelegramPlane },
  { href: "https://twitter.com/Cardano_CF", title: "Twitter", icon: FaTwitter },
  { href: "https://www.youtube.com/c/cardanofoundation", title: "Youtube", icon: FaYoutube },
];

export const footerMenus: Menu[] = [
  {
    title: "Browse",
    icon: BrowseIcon,
    children: [
      { href: "https://cardanofoundation.org/en/about-us/", title: "About Us" },
      { href: "https://cardanofoundation.org/en/contact-us/", title: "Contact Us" },
      { href: "https://github.com/cardano-foundation", title: "Github" },
      { href: "https://docs.cardano.org/en/latest/", title: "Documentation" },
      { href: "https://cardanofoundation.org/en/news", title: "News and Blog" },
    ],
  },
  {
    title: "Resources",
    icon: ResourcesIcon,
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
