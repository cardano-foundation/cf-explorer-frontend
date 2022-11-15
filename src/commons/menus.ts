
export const menus = [
    { title: "DID", href: "https://fb.me" },
    { title: "Supply Chain", href: "https://fb.me" },
    {
        title: "Blockchain",
        mega: true,
        children: [
            {
                title: "Tools",
                children: [
                    { title: "Token Registry", href: "/Token-Registry" },
                    { title: "Daedalous Wallet", href: "/Daedalous-Wallet" },
                    { title: "Cardano RTView", href: "/Cardano-RTView" },
                    { title: "...", href: "/..." },
                    { title: "...", href: "/..." }
                ]
            },
            {
                title: "Documents",
                children: [
                    { title: "Stakepool", href: "/Stakepool" },
                    { title: "About us", href: "/About-us" },
                    { title: "...", href: "/..." },
                    { title: "...", href: "/..." }
                ]
            },
            {
                title: "Developer",
                children: [
                    { title: "Ouroboros Protocol", href: "/Ouroboros-Protocol" },
                    { title: "Cardano Nodes", href: "/Cardano-Nodes" },
                    { title: "Github", href: "https://github.com" },
                    { title: "Developer Tools", href: "/Developer-Tools" }
                ]
            }
        ]
    },
    {
        title: "Resource",
        children: [
            { title: "Charts and Stats", href: "/Charts-and-Stats" },
            { title: "Top Statsitics", href: "/Top-Statsitics" },
            { title: "Developer API", href: "/Developer-API" },
            { title: "Builder Tools", href: "/Builder-Tools" },
            { title: "Project Showcase", href: "/Project-Showcase" }
        ]
    },
    {
        title: "Delegate Pools",
        children: [
            { title: "Delegation Pools", href: "/Delegation-Pools" },
            { title: "Stake key registration", href: "/Stake-key-registration" },
            { title: "Pool Registration", href: "/Pool-Registration" }
        ]
    },
    {
        title: "More",
        children: [
            { title: "Cardano Mainet", href: "/Cardano-Mainet" },
            { title: "Cardano Testnet", href: "/Cardano-Testnet" },
            { title: "Cardano Preview Testnet", href: "/Cardano-Preview-Testnet" }
        ]
    },
];