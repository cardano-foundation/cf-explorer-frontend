import { FaLinkedinIn, FaTelegramPlane, FaTwitter, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import {
  BlockChainMenuIcon,
  BrowseIcon,
  DelegatePoolMenuIcon,
  ProtocolParameterIcon,
  ResourcesIcon,
  StakingLifecycleIcon
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
  {
    title: "Blockchain",
    icon: BlockChainMenuIcon,
    children: [
      { title: "Epochs", href: routers.EPOCH_LIST },
      { title: "Blocks", href: routers.BLOCK_LIST },
      { title: "Transactions", href: routers.TRANSACTION_LIST },
      { title: "Native Tokens", href: routers.TOKEN_LIST },
      { title: "Smart Contracts", href: routers.CONTRACT_LIST },
      { title: "Pools", href: routers.DELEGATION_POOLS },
      { title: "Top ADA Holders", href: routers.ADDRESS_LIST }
    ]
  },
  {
    title: "Operational Certificates",
    icon: DelegatePoolMenuIcon,
    children: [
      { title: "Stake Address Registration", href: routers.STAKE_LIST.replace(":poolType?", "registration") },
      { title: "Stake Address Deregistration", href: routers.STAKE_LIST.replace(":poolType?", "de-registration") },
      { title: "Stake Delegation(s)", href: routers.STAKE_DELEGATIONS },
      { title: "Pool Certificate", href: routers.REGISTRATION_POOLS.replace(":poolType?", "registration") },
      { title: "Pool Deregistration", href: routers.REGISTRATION_POOLS.replace(":poolType?", "de-registration") },
      { title: "Instantaneous Rewards ", href: routers.INSTANTANEOUS_REWARDS }
    ]
  },
  {
    title: "Staking Lifecycle",
    icon: StakingLifecycleIcon,
    href: routers.STAKING_LIFECYCLE.replace(":tab", "stake-key")
  },
  {
    title: "Protocol Parameters",
    icon: ProtocolParameterIcon,
    href: "/protocol-parameters",
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
      { href: "https://cardanofoundation.org/en/about-us/", title: "About Us" },
      { href: "https://cardanofoundation.org/en/contact-us/", title: "Contact Us" },
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
      { href: "https://github.com/cardano-foundation", title: "Github" }
    ]
  }
];
