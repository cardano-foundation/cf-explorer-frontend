import { FaLinkedinIn, FaTelegramPlane, FaTwitter, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import {
  BlockChainMenuIcon,
  BrowseIcon,
  DashboardIcon,
  OperationalIcon,
  ProtocolIcon,
  ResourcesIcon,
  StakingLifecycleIcon
} from "./resources";
import { lists, routers } from "./routers";

interface Menu {
  title: string;
  href?: string;
  children?: Menu[];
  icon?: string;
  tooltip?: string;
  isSpecialPath?: boolean;
}

interface Social {
  title: string;
  href: string;
  icon: IconType | string;
}
export const menus: Menu[] = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: routers.HOME
  },
  {
    title: "Blockchain",
    icon: BlockChainMenuIcon,
    children: [
      { title: "Epochs", href: routers.EPOCH_LIST },
      { title: "Blocks", href: routers.BLOCK_LIST },
      { title: "Transactions", href: routers.TRANSACTION_LIST },
      { title: "Native Tokens", href: routers.TOKEN_LIST },
      { title: "Smart Contracts", href: routers.CONTRACT_LIST },
      { title: "Pools", href: routers.DELEGATION_POOLS, isSpecialPath: true },
      { title: "Top ADA Holders", href: routers.ADDRESS_LIST }
    ]
  },
  {
    title: "Operational Certificates",
    icon: OperationalIcon,
    children: [
      { title: "Stake Address Registration", href: routers.STAKE_ADDRESS_REGISTRATION, isSpecialPath: true },
      { title: "Stake Address Deregistration", href: routers.STAKE_ADDRESS_DEREGISTRATION, isSpecialPath: true },
      { title: "Stake Delegation(s)", href: routers.STAKE_ADDRESS_DELEGATIONS, isSpecialPath: true },
      { title: "Pool Certificate", href: routers.POOL_CERTIFICATE, isSpecialPath: true },
      { title: "Pool Deregistration", href: routers.POOL_DEREGISTRATION, isSpecialPath: true },
      { title: "Instantaneous Rewards ", href: routers.INSTANTANEOUS_REWARDS, isSpecialPath: true }
    ]
  },
  {
    title: "Staking Lifecycle",
    icon: StakingLifecycleIcon,
    href: lists.dashboard()
  },
  {
    title: "Protocol Parameters",
    icon: ProtocolIcon,
    href: lists.protocolParameters(),
    children: []
  }
];

export const socials: Social[] = [
  { href: "https://www.linkedin.com/company/cardano-foundation/", title: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://t.me/CardanoAnnouncements", title: "Telegram", icon: FaTelegramPlane },
  { href: "https://twitter.com/Cardano_CF", title: "Twitter", icon: FaTwitter },
  { href: "https://www.youtube.com/c/cardanofoundation", title: "Youtube", icon: FaYoutube }
];

export const footerMenus: Menu[] = [
  {
    title: "Browse",
    icon: BrowseIcon,
    children: [
      { href: "https://cardanofoundation.org/en/about-us/", title: "About CF" },
      { href: "https://docs.cardano.org/en/latest/", title: "Cardano Docs" },
      { href: "https://cardanofoundation.org/en/news", title: "News and Blog" }
    ]
  },
  {
    title: "Resources",
    icon: ResourcesIcon,
    children: [
      { href: "https://education.cardanofoundation.org/", title: "Blockchain Course" },
      { href: "https://developers.cardano.org/tools/", title: "Builder Tools" },
      { href: "https://github.com/cardano-foundation/cf-explorer", title: "Github" }
    ]
  }
];
