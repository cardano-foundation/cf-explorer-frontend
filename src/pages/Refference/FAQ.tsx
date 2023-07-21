import { IRisLogo } from "src/commons/resources";

import { ContainerReffer, TextReffer, Content } from "./styles";

const FAQ = () => {
  return (
    <ContainerReffer>
      <IRisLogo />
      <Content>
        <TextReffer>General</TextReffer>

        <TextReffer>
          Is iris open source? <br />
          Absolutely. Transparency is a key principle of iris. You will find a link to our GitHub repositories on our
          landing page. Look for the GitHub icon!
        </TextReffer>

        <TextReffer>
          Getting Started
          <br />
          Do I need to sign up to access iris?
          <br />
          Iris is publicly accessible, signing up is optional
        </TextReffer>

        <TextReffer>
          How do I sign up?
          <br />
          To get started, follow these simple steps:
          <br />
          Go to the landing page.
          <br />
          Look for the &quot;Sign In&quot; tab in the top right corner.
          <br />
          Choose one of the following options to sign up:
          <br />
          Email and Password: Enter your email address and create a secure password.
          <br />
          Connect Wallet: If you prefer, sign up using any Cardano-supported wallet by selecting the &quot;Connect
          Wallet&quot; option. This option requires the Google Chrome plugin to be installed for the respective wallet
        </TextReffer>

        <TextReffer>
          Switching between Networks <br />
          You'll notice a network drop-down menu in the top right corner of the landing page. Simply click on it to see
          a list of available options.
        </TextReffer>

        <TextReffer>
          You can choose between the following networks:
          <br />
          Mainnet
          <br />
          Preprod
          <br />
          Preview
        </TextReffer>

        <TextReffer>
          Navigating back to the landing page?
          <br />
          If you ever want to return to the home page, it's as easy as a single click. Look for the Cardano icon at the
          webpage's top left corner. You will be instantly taken back to the familiar home page by clicking on the
          Cardano icon.
        </TextReffer>

        <TextReffer>
          Clickable Links
          <br />
          To enhance your browsing experience, we have incorporated clickable links to associated data whenever
          possible.
          <br />
          When you hover your mouse cursor over the data, you'll notice that the pointer changes to a pointing hand.
          These links will lead you to the associated data.
        </TextReffer>

        <TextReffer>
          Copy to Clipboard <br />
          Easily copy data to your clipboard by clicking on the vertical rectangle next to the data field.
        </TextReffer>

        <TextReffer>
          Blockchain
          <br />
          This section provides a categorised view of on-chain events. Here's a breakdown of the main subsections you
          will find:
        </TextReffer>

        <TextReffer>
          Epochs: This tab provides the epoch list to date, each being clickable to display information on a specific
          epoch in the history of the blockchain.
        </TextReffer>

        <TextReffer>
          Blocks: List of blocks to date, starting with the most recent. Each block is clickable to view the details.
        </TextReffer>

        <TextReffer>
          Transactions: Lists the latest transactions and provides access to the individual transaction details
          clustering the available information.
        </TextReffer>

        <TextReffer>Native Tokens: Lists native tokens in existence and provides details about each.</TextReffer>

        <TextReffer>
          Smart Contracts: Displays deployed contracts' details, addresses, and other relevant information.
        </TextReffer>

        <TextReffer>
          Pools: Lists stake pools on the Cardano blockchain. It includes data on their activities, statistics and key
          parameters.
        </TextReffer>

        <TextReffer>
          Top ADA Holders: This tab displays the top holders of ADA, by individual address balance or staked ADA amount.
        </TextReffer>

        <TextReffer>
          Operational Certificates
          <br />
          Clustered view to facilitate browsing of operational certificates posted on the Cardano blockchain. While each
          certificate event will be displayed under the respective transaction details view, this section provides the
          certificate events by type in reverse chronological order.
        </TextReffer>

        <TextReffer>
          Stake Key Registration: In this tab, you can explore details about stake key registration certificates. These
          certificates are used to register a stake key, which allows stakeholders to participate in the consensus and
          governance of the Cardano network.
        </TextReffer>

        <TextReffer>
          Stake Key Deregistration: Here, you will find information related to stake key deregistration certificates.
          These certificates are used when stakeholders want to deregister their stake keys.
        </TextReffer>

        <TextReffer>
          Stake Delegation: This tab provides insights into stake delegation certificates. Stakeholders can use these
          certificates to delegate their stake to a specific pool, allowing them to contribute to the consensus and earn
          rewards.
        </TextReffer>

        <TextReffer>
          Pool Certificate: In this tab, you can explore pool certificates. Pool operators use these certificates to
          register and manage their stake pools. You'll find details such as the pool's ID, owner, metadata, and other
          relevant information.
        </TextReffer>

        <TextReffer>
          Pool Deregistration: Here, you will find information about pool deregistration certificates. Pool operators
          use these certificates to deregister their stake pools from the network. This might occur when a pool is no
          longer operational, or the operator decides to retire the pool.
        </TextReffer>

        <TextReffer>
          Instantaneous Rewards: This tab provides details about instantaneous rewards certificates. These certificates
          indicate the rewards earned by stakeholders for their participation in the network. You can explore the
          rewards allocated to specific stakeholders or pools.
        </TextReffer>

        <TextReffer>
          Staking Lifecycle <br />
          Staking lifecycle feature provides a comprehensive view of the events relating to staking alongside the
          existence of any given stake address (delegator) or a pool ID (staking pool)
        </TextReffer>

        <TextReffer>
          To get started, use the search bar to type the stake address or pool ID you would like to query, and it will
          bring you to the respective lifecycle view:
        </TextReffer>

        <TextReffer>
          -ADA Holder View (Input: Stake address)
          <br />
          -Pool Subview (Input: Pool ID)
        </TextReffer>

        <TextReffer>Here's a breakdown of the three layers of information you'll find in this view:</TextReffer>

        <TextReffer>
          Visual Lifecycle View: This is the default view accessible to all users. It visually represents the staking
          lifecycle, one step and event at a time. You can easily navigate the different stages and gain insights into
          the process.
        </TextReffer>

        <TextReffer>
          Tabular Lifecycle View: By selecting the tabular icon under the main heading &quot;Staking Lifecycle
          For,&quot; you can switch to the tabular view. This alternative view offers a more structured presentation of
          the lifecycle steps, allowing you to explore the information in a tabular format. It provides a concise
          overview of each stage in a table.
        </TextReffer>

        <TextReffer>
          Reporting: The reporting feature is exclusively available to a configured set of logged-in users. With
          reporting enabled, you can extract a spreadsheet report containing all records displayed under the lifecycle.{" "}
          <br />
          Protocol Parameters <br />
          This tab offers a clear view of the parameters running the Cardano blockchain, known as protocol parameters.
          This functionality displays both global constants and variable parameters alongside their definitions, as well
          as provides insights into past changes of the variable parameters.
        </TextReffer>

        <TextReffer></TextReffer>

        <TextReffer>Troubleshooting</TextReffer>

        <TextReffer>
          I forgot my password. How can I reset it?
          <br />
          Navigate to the Sign In tab. You will see the &ldquo;Forgot your password&rdquo; link here. Select it and
          insert the email address associated to your account. The steps to reset your password will be shared with you
          via email.
        </TextReffer>

        <TextReffer>
          I'm experiencing technical issues. What should I do?
          <br />
          If you are facing an issue in Iris, please let us know by capturing the details in the support widget at the
          bottom right side of the page as a &ldquo;?&rdquo; icon.
        </TextReffer>

        <TextReffer>
          Do we handle all support issues? <br />
          We are happy to help with Iris-related troubleshooting matters. Please note that we are not able to respond to
          individual cases that are not directly related to Iris (e.g. &ldquo;I forgot my wallet seed phrase&rdquo;,
          &ldquo;I transferred my ada to the wrong address&rdquo;, &ldquo;can you help me understand what this data
          means?&rdquo;) at present.
        </TextReffer>

        <TextReffer>
          Can I suggest a feature or provide feedback?
          <br />
          Yes! We would love to hear from you. You can create a feature request in the support widget at the bottom
          right-hand side of Iris. Please select the option &ldquo;Feature Request&rdquo; when submitting your idea.{" "}
          <br />
        </TextReffer>
      </Content>
    </ContainerReffer>
  );
};

export default FAQ;
