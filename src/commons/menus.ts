import { FaDiscord, FaLinkedinIn, FaTelegramPlane, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import {
  BlockChainMenuIcon,
  BrowseIcon,
  DelegatePoolMenuIcon,
  MediumIcon,
  ResourcesIcon,
  StakingLifecycleIcon,
  ProtocolParameterIcon,
} from "./resources";
import { routers } from "./routers";
import { defaultReportTab } from "../pages/ReportGenerated";

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
    title: 'Blockchain',
    icon: BlockChainMenuIcon,
    children: [
      { title: 'Epochs', href: routers.EPOCH_LIST },
      { title: 'Blocks', href: routers.BLOCK_LIST },
      { title: 'Transactions', href: routers.TRANSACTION_LIST },
      { title: 'Native Tokens', href: '/tokens' },
      { title: 'Top Addresses', href: '/addresses' },
      { title: 'Smart Contracts', href: routers.CONTRACT_LIST }
    ]
  },
  {
    title: 'Staking',
    icon: DelegatePoolMenuIcon,
    children: [
      { title: 'Pools', href: routers.DELEGATION_POOLS },
      { title: 'Stake key registration', href: routers.STAKE_LIST.replace(':poolType?', 'registration') },
      { title: 'Pool Registration', href: '/registration-pools' },
      { title: 'Top Delegators', href: routers.TOP_DELEGATOR }
    ]
  },
  {
    title: 'Protocol Parameters',
    icon: ProtocolParameterIcon,
    href: '/protocol-parameters',
    children: []
  },
  {
    title: 'Staking Lifecycle',
    icon: StakingLifecycleIcon,
    children: [
      { title: "Dashboard", href: routers.STAKING_LIFECYCLE },
      { title: "Timeline Delegator", href: routers.DELEGATOR_SEARCH },
      { title: "Timeline SPO", href: routers.SPO_SEARCH },
      { title: "Report", href: `${routers.REPORT_GENERATED}?tab=${defaultReportTab}` },
    ],
  },
];

export const socials: Social[] = [
  { href: 'https://www.linkedin.com/company/cardano-foundation/', title: 'LinkedIn', icon: FaLinkedinIn },
  { href: '#', title: 'Discord', icon: FaDiscord },
  { href: 'https://t.me/CardanoAnnouncements', title: 'Telegram', icon: FaTelegramPlane },
  { href: 'https://twitter.com/Cardano_CF', title: 'Twitter', icon: FaTwitter },
  { href: 'https://www.youtube.com/c/cardanofoundation', title: 'Youtube', icon: FaYoutube }
];

export const footerMenus: Menu[] = [
  {
    title: 'Browse',
    icon: BrowseIcon,
    children: [
      { href: 'https://cardanofoundation.org/en/about-us/', title: 'About Us' },
      { href: 'https://cardanofoundation.org/en/contact-us/', title: 'Contact Us' },
      { href: 'https://docs.cardano.org/en/latest/', title: 'Documentation' },
      { href: 'https://cardanofoundation.org/en/news', title: 'News and Blog' }
    ]
  },
  {
    title: 'Resources',
    icon: ResourcesIcon,
    children: [
      { href: 'https://education.cardanofoundation.org/', title: 'Blockchain Course' },
      { href: 'https://developers.cardano.org/tools/', title: 'Builder Tools' },
      { href: 'https://dappsoncardano.com/', title: 'Dapps' },
      { href: 'https://github.com/cardano-foundation', title: 'Github' }
    ]
  }
];
