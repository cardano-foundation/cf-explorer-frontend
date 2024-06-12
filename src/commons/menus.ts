import { FaLinkedinIn, FaTelegramPlane, FaYoutube, FaGithub } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import {
  BlockChainMenuIcon,
  BrowseIcon,
  DashboardIcon,
  GovernanceHome,
  OperationalIcon,
  ProtocolIcon,
  StakingLifecycleIcon,
  TwitterX
} from "./resources";
import { details, lists, routers } from "./routers";

interface Menu {
  title: string;
  key?: string;
  href?: string;
  children?: Menu[];
  icon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
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
    key: "page.dashboard",
    icon: DashboardIcon,
    href: routers.HOME
  },
  {
    title: "Blockchain",
    key: "glossary.blockchain",
    icon: BlockChainMenuIcon,
    children: [
      { title: "Epochs", key: "glossary.epochs", href: routers.EPOCH_LIST },
      { title: "Blocks", key: "glossary.blocks", href: routers.BLOCK_LIST },
      { title: "Transactions", key: "glossary.transactions", href: routers.TRANSACTION_LIST },
      { title: "Native Tokens", key: "glossary.nativeTokens", href: routers.TOKEN_LIST },
      {
        title: "Native Scripts & Smart Contracts",
        key: "glossary.nativeScriptAndSC",
        href: details.nativeScriptsAndSC()
      },
      { title: "Pools", key: "head.page.pool", href: routers.DELEGATION_POOLS, isSpecialPath: true },
      { title: "Delegated Representatives", key: "head.page.drep", href: routers.DREPS, isSpecialPath: true },
      { title: "Top ADA Holders", key: "glossary.topAdaHolder", href: routers.ADDRESS_LIST }
    ]
  },
  {
    title: "Operational Certificates",
    key: "glossary.operationalCertificates",
    icon: OperationalIcon,
    children: [
      {
        title: "Stake Address Registration",
        key: "glossary.takeAddressRegistrations",
        href: routers.STAKE_ADDRESS_REGISTRATION,
        isSpecialPath: true
      },
      {
        title: "Stake Address Deregistration",
        key: "glossary.stakeAddressDeregistration",
        href: routers.STAKE_ADDRESS_DEREGISTRATION,
        isSpecialPath: true
      },
      {
        title: "Stake Delegation(s)",
        key: "glossary.stakeDelegations",
        href: routers.STAKE_ADDRESS_DELEGATIONS,
        isSpecialPath: true
      },
      {
        title: "Pool Certificate",
        key: "glossary.poolCertificate",
        href: routers.POOL_CERTIFICATE,
        isSpecialPath: true
      },
      {
        title: "Pool Deregistration",
        key: "glossary.poolDeregistration",
        href: routers.POOL_DEREGISTRATION,
        isSpecialPath: true
      },
      {
        title: "Instantaneous Rewards",
        key: "glossary.instantaneousRewards",
        href: routers.INSTANTANEOUS_REWARDS,
        isSpecialPath: true
      }
    ]
  },
  {
    title: "Staking Lifecycle",
    key: "glossary.stakingLifecycle",
    icon: StakingLifecycleIcon,
    href: lists.dashboard()
  },
  {
    title: "Protocol Parameters",
    key: "glossary.protocolParameters",
    icon: ProtocolIcon,
    href: lists.protocolParameters(),
    children: []
  },
  {
    title: "Governance",
    key: "glossary.governance",
    icon: GovernanceHome,
    children: [
      {
        title: "Constitutional Committee",
        key: "glossary.constitutionalCommittee",
        href: details.CONSTITUIONAL_COMMITTEES("listMembers")
      }
    ]
  }
];

export const socials: Social[] = [
  { href: "https://www.linkedin.com/company/cardano-foundation/", title: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://t.me/CardanoAnnouncements", title: "Telegram", icon: FaTelegramPlane },
  { href: "https://twitter.com/Cardano_CF", title: "Twitter", icon: TwitterX as IconType },
  { href: "https://www.youtube.com/c/cardanofoundation", title: "Youtube", icon: FaYoutube },
  { href: "https://github.com/cardano-foundation/cf-explorer", title: "GitHub", icon: FaGithub }
];

export const footerMenus: Menu[] = [
  {
    title: "Discover Cardano",
    key: "glossary.discoverCardano",
    icon: BrowseIcon,
    children: [
      { href: "https://cardanofoundation.org/en/about-us/", title: "Cardano Foundation", key: "site.CF" },
      { href: "https://docs.cardano.org/", title: "Cardano Docs", key: "site.cardanoDocs" },
      { href: "https://education.cardanofoundation.org/", title: "Cardano Academy", key: "site.cardanoAcademy" },
      { href: "https://developers.cardano.org/", title: "Developer Portal", key: "site.developerPortal" },
      { href: "https://cardanofoundation.org/en/news", title: "News and Blog", key: "site.newsAndBlog" }
    ]
  }
];
