import { Box } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { BoxDetails, NormalDescription, NumberParagraph, Watermark, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function RewardDistributionProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title="The reward distribution process" handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <NormalDescription>
          When a delegator receives their rewards from the Cardano protocol, the following steps occur:
        </NormalDescription>
        <BoxDetails>
          <Watermark sx={{
            top: "240px"
          }}>
            foR illustration only
          </Watermark>
          <NormalDescription>
            <NumberParagraph>
              1.
            </NumberParagraph>
            The Cardano protocol determines the amount of rewards earned by each delegator based on their stake in the staking pool and the pool's performance over a given epoch (a period of time on the Cardano network).
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              2.
            </NumberParagraph>
            The rewards are then calculated and distributed to the delegator's address in the form of additional ADA tokens. This is done automatically by the Cardano protocol and the delegator does not need to take any action to receive their rewards.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              3.
            </NumberParagraph>
            The delegator can see the rewards in their wallet or through a staking service. They can choose to keep the rewards in their wallet or withdraw them to another address.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              4.
            </NumberParagraph>
            The rewards can be withdrawn at any time, but there may be transaction fees associated with the withdrawal. The fees are paid in ADA and are used to incentivize network security and performance.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              5.
            </NumberParagraph>
            The delegator can then choose to re-delegate their rewards to the same staking pool or to a different one. They can also choose to withdraw their entire stake from the staking pool if they wish.
          </NormalDescription>
        </BoxDetails>
        <NormalDescription>
        In summary, when a delegator receives their rewards from the Cardano protocol, the rewards are automatically calculated and distributed to their address. The delegator can then choose to keep the rewards or withdraw them, and can also choose to re-delegate or withdraw their entire stake.
        </NormalDescription>
      </WrapContent>
    </StyledModal >
  )
}
