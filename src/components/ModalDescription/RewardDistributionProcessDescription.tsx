import { Typography } from "@mui/material";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function RewardDistributionProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title="Rewards distribution"
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              Reward accounts are used to distribute rewards for participating in the Proof of Stake consensus
              mechanism. For each stake address, there is an associated reward account. The lifecycle of the reward
              account follows that of the associated stake address. They
              <span> cannot receive funds via transactions.</span> Instead, their balance is only increased when rewards
              are distributed and decreased only when rewards are withdrawn. Thereby, the rewards from multiple epochs
              can be accumulated, and ADA holders can withdraw them manually. The balance of the reward account is
              included in the stake associated with the stake address, thus there is no incentive to frequently withdraw
              rewards.
            </Typography>
            <Typography mt={1}>
              Technically, the reward account maps a stake address to its reward balance. Since all the information
              relevant to calculating rewards is publicly available on the blockchain, it's unnecessary to explicitly
              write the balance of each reward account to the chain. Instead, nodes can store reward accounts and their
              current balance locally. The reward accounts are updated in bulk by the Cardano blockchain following the
              end of an epoch. They are also consulted and updated when validating and applying transactions that
              withdraw from reward accounts. The rewards for epoch “e” depend on the contents of that epoch, so it is
              not feasible to start calculating them during that epoch. Rewards for epoch e are therefore distributed by
              the Cardano blockchain at the beginning of e+2, which allows for reward calculation during epoch e+1.
              Reward accounts use account-type architecture instead of the Unspent-Transaction-Output (UTXO)
              architecture.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
