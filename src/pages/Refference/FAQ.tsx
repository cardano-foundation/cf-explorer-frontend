import { Link, styled } from "@mui/material";

import { ContainerReffer, TextReffer, Content, TextHeader, TitleSection, TextSubHeader, TextItalic } from "./styles";

const LinkTo = styled(Link)`
  color: ${(props) => `${props.theme.palette.primary.main} !important`};
`;

const FAQ = () => {
  return (
    <ContainerReffer>
      <Content>
        <TextHeader>Frequently Asked Questions</TextHeader>
        <br />
        <TextReffer>
          <TextSubHeader>Getting Started</TextSubHeader>
          <TitleSection>Do I need to sign up to access Explorer?</TitleSection>
          Explorer is publicly accessible, signing up is optional
        </TextReffer>

        <TextReffer>
          <TitleSection>How do I sign up?</TitleSection>
          To get started, follow these simple steps:
          <br />
          &ensp;1. Go to the landing page.
          <br />
          &ensp;2. Look for the &quot;Sign In&quot; tab in the top right corner.
          <br />
          &ensp;3. Choose one of the following options to sign up:
          <br />
          &emsp;a. Email and Password: Enter your email address and create a secure password.
          <br />
          &emsp;b. Connect Wallet: If you prefer, sign up using any Cardano-supported wallet by selecting the
          &quot;Connect Wallet&quot; option. This option requires the Google Chrome plugin to be installed for the
          respective wallet
        </TextReffer>

        <TextReffer>
          <TitleSection>Switching between Networks</TitleSection> <br />
          You'll notice a network drop-down menu in the top right corner of the landing page. Simply click on it to see
          a list of available options.
        </TextReffer>

        <TextReffer>
          You can choose between the following networks:
          <br />
          <TextItalic>Mainnet</TextItalic>
          <br />
          <TextItalic>Preprod</TextItalic>
          <br />
          <TextItalic> Preview</TextItalic>
        </TextReffer>

        <TextReffer>
          <TitleSection> Navigating back to the landing page?</TitleSection>
          If you ever want to return to the home page, it's as easy as a single click. Look for the Explorer icon at the
          webpage's top left corner. You will be instantly taken back to the familiar home page by clicking on the
          Cardano icon.
        </TextReffer>

        <TextReffer>
          <TitleSection>Clickable Links</TitleSection>
          To enhance your browsing experience, we have incorporated clickable links to associated data whenever
          possible.
          <br />
          When you hover your mouse cursor over the data, you'll notice that the pointer changes to a pointing hand.
          These links will lead you to the associated data.
        </TextReffer>

        <TextReffer>
          <TitleSection>Copy to Clipboard</TitleSection>
          Easily copy data to your clipboard by clicking on the vertical rectangle next to the data field.
        </TextReffer>

        <TextReffer>
          <TextSubHeader> Blockchain</TextSubHeader>
          This section provides a categorised view of on-chain events. Here's a breakdown of the main subsections you
          will find:
        </TextReffer>

        <TextReffer>
          <TextItalic>Epochs</TextItalic> : This tab provides the epoch list to date, each being clickable to display
          information on a specific epoch in the history of the blockchain.
        </TextReffer>

        <TextReffer>
          <TextItalic>Blocks</TextItalic>: List of blocks to date, starting with the most recent. Each block is
          clickable to view the details.
        </TextReffer>

        <TextReffer>
          <TextItalic>Transactions</TextItalic>: Lists the transactions and provides access to the individual
          transaction details clustering the available information.
        </TextReffer>

        <TextReffer>
          <TextItalic>Native Tokens</TextItalic>: Lists native tokens in existence and provides details about each.
        </TextReffer>

        <TextReffer>
          <TextItalic>Smart Contracts</TextItalic>: Displays deployed contracts' details, addresses, and other relevant
          information.
        </TextReffer>

        <TextReffer>
          <TextItalic>Pools</TextItalic>: Lists stake pools on the Cardano blockchain. It includes data on their
          activities, statistics and key parameters.
        </TextReffer>

        <TextReffer>
          <TextItalic>Top ADA Holders</TextItalic>: This tab displays the top holders of ADA, by individual address
          balance or staked ADA amount.
        </TextReffer>

        <TextReffer>
          <TextSubHeader>Operational Certificates</TextSubHeader>
          Clustered view to facilitate browsing of operational certificates posted on the Cardano blockchain. While each
          certificate event will be displayed under the respective transaction details view, this section provides the
          certificate events by type.
        </TextReffer>

        <TextReffer>
          <TextItalic>Stake Key Registration</TextItalic>: In this tab, you can explore details about stake key
          registration certificates. These certificates are used to register a stake key, which allows stakeholders to
          participate in the consensus and governance of the Cardano Protocol.
        </TextReffer>

        <TextReffer>
          <TextItalic>Stake Key Deregistration</TextItalic>: Here, you will find information related to stake key
          deregistration certificates. These certificates are used when stakeholders want to deregister their stake
          keys.
        </TextReffer>

        <TextReffer>
          <TextItalic>Stake Delegation</TextItalic>: This tab provides insights into stake delegation certificates.
          Stake holders can delegate to a stake pool, which will generate the certificate, allowing them to contribute
          to the consensus and earn rewards.
        </TextReffer>

        <TextReffer>
          <TextItalic>Pool Certificate</TextItalic>: In this tab, you can explore pool certificates. Pool operators use
          these certificates to register and manage their stake pools. You'll find details such as the pool's ID, owner,
          metadata, and other relevant information.
        </TextReffer>

        <TextReffer>
          <TextItalic>Pool Deregistration</TextItalic>: Here, you will find information about pool deregistration
          certificates. Pool operators use these certificates to deregister their stake pools from the network. This
          might occur when a pool is no longer operational, or the operator decides to retire the pool.
        </TextReffer>

        <TextReffer>
          Instantaneous Rewards: This tab provides details about instantaneous rewards certificates. These certificates
          indicate the rewards earned by stakeholders for their participation in the network. You can explore the
          rewards allocated to specific stakeholders or pools.
        </TextReffer>

        <TextReffer>
          <TextSubHeader>Staking Lifecycle</TextSubHeader>
          Staking lifecycle feature provides a comprehensive view of the events relating to staking alongside the
          existence of any given stake address (delegator) or a pool ID (staking pool)
        </TextReffer>

        <TextReffer>
          To get started, use the search bar to type the stake address or pool ID you would like to query, and it will
          bring you to the respective lifecycle view:
        </TextReffer>

        <TextReffer>
          <TextItalic>ADA Holder View (Input: Stake address)</TextItalic>
          <br />
          <TextItalic>Pool Subview (Input: Pool ID)</TextItalic>
        </TextReffer>

        <TextReffer>Here's a breakdown of the three layers of information you'll find in this view:</TextReffer>

        <TextReffer>
          <TextItalic>Visual Lifecycle View</TextItalic>: This is the default view accessible to all users. It visually
          represents the staking lifecycle, one step and event at a time. You can easily navigate the different stages
          and gain insights into the process.
        </TextReffer>

        <TextReffer>
          <TextItalic>Tabular Lifecycle View</TextItalic>: By selecting the tabular icon under the main heading
          &quot;Staking Lifecycle For,&quot; you can switch to the tabular view. This alternative view offers a more
          structured presentation of the lifecycle steps, allowing you to explore the information in a tabular format.
          It provides a concise overview of each stage in a table.
        </TextReffer>

        <TextReffer>
          <TextItalic>Reporting</TextItalic>: The reporting feature is exclusively available to a configured set of
          logged-in users. With reporting enabled, you can extract a spreadsheet report containing all records displayed
          under the lifecycle. <br />
          <TextSubHeader>Protocol Parameters</TextSubHeader>
          This tab offers a clear view of the parameters running the Cardano blockchain, known as protocol parameters.
          This functionality displays both global constants and variable parameters alongside their definitions, as well
          as provides insights into past changes of the variable parameters.
        </TextReffer>

        <TextReffer>
          <TextSubHeader>Sanchonet</TextSubHeader>
        </TextReffer>

        <TextReffer>
          <TitleSection> What is Sanchonet?</TitleSection>
          Sanchonet is the testnet for rolling out governance features for the Cardano blockchain, as specified in{" "}
          <LinkTo target="_blank" rel="noopener noreferrer" href="https://cips.cardano.org/cip/CIP-1694">
            CIP-1694
          </LinkTo>
          . Sanchonet is all about developing and testing the technical components and processes required to action
          governance for Cardano within{" "}
          <LinkTo target="_blank" rel="noopener noreferrer" href="https://cips.cardano.org/cip/CIP-1694">
            CIP-1694
          </LinkTo>
          .
        </TextReffer>

        <TextReffer>
          <TitleSection> Why the name Sanchonet?</TitleSection>
          The name &ldquo;Sanchonet&rdquo; draws inspiration from the character Sancho Panza, Don Quixote&quot;s
          companion in Miguel de Cervantes literary classic.
        </TextReffer>

        <TextReffer>
          <TitleSection> Why are governance features implemented on Sanchonet currently not supported?</TitleSection>
          The first release will support the Explorer features as in other existing networks (Mainnet, PreProd, Preview)
          while new features introduced with{" "}
          <LinkTo target="_blank" rel="noopener noreferrer" href="https://cips.cardano.org/cip/CIP-1694">
            CIP-1694
          </LinkTo>{" "}
          will be gradually developed and added.
        </TextReffer>

        <TextReffer>
          <TitleSection> Where can I learn more about Sanchonet?</TitleSection>
          You can find out more about Sanchonet and learn how to participate{" "}
          <LinkTo target="_blank" rel="noopener noreferrer" href="https://sancho.network/">
            here
          </LinkTo>
        </TextReffer>

        <TextReffer>
          <TitleSection> Who is participating in Sanchonet?</TitleSection>
          Sanchonet is open to everyone. It also introduces two new roles: the Delegated Representatives (DReps) and the
          Constitutional Committee (CC).
        </TextReffer>

        <TextReffer>
          <TitleSection> Why is the Live Stake feature showing &ldquo;Not Available&rdquo;?</TitleSection>
          Live stake and rewards data is provided through a third party provider, which at present does not support
          Sanchonet.
        </TextReffer>

        <TextReffer>
          <TextSubHeader>Troubleshooting</TextSubHeader>
        </TextReffer>

        <TextReffer>
          <TitleSection> I forgot my password. How can I reset it?</TitleSection>
          Navigate to the Sign In tab. You will see the &ldquo;Forgot your password&rdquo; link here. Select it and
          insert the email address associated to your account. The steps to reset your password will be shared with you
          via email.
        </TextReffer>

        <TextReffer>
          <TitleSection> I'm experiencing technical issues. What should I do?</TitleSection>
          If you are facing an issue in Explorer, please let us know by capturing the details in the support widget at
          the bottom right side of the page as a &ldquo;?&rdquo; icon.
        </TextReffer>

        <TextReffer>
          <TitleSection> Do we handle all support issues? </TitleSection>
          We are happy to help with Explorer-related troubleshooting matters. Please note that we are not able to
          respond to individual cases that are not directly related to Explorer (e.g. &ldquo;I forgot my wallet seed
          phrase&rdquo;, &ldquo;I transferred my ada to the wrong address&rdquo;, &ldquo;can you help me understand what
          this data means?&rdquo;) at present.
        </TextReffer>

        <TextReffer>
          <TitleSection>Can I suggest a feature or provide feedback?</TitleSection>
          Yes! We would love to hear from you. You can create a feature request in the support widget at the bottom
          right-hand side of Explorer. Please select the option &ldquo;Feature Request&rdquo; when submitting your idea.{" "}
          <br />
        </TextReffer>

        <TextReffer>
          <TitleSection>Known Bugs and Issues</TitleSection>
          Please see a list of our known bugs{" "}
          <LinkTo href="https://github.com/cardano-foundation/cf-explorer" target="_blank" rel="noopener noreferrer">
            here
          </LinkTo>
        </TextReffer>
      </Content>
    </ContainerReffer>
  );
};

export default FAQ;
