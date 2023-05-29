import { Typography } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function OperatorRewards({ open, handleCloseModal }: Props) {
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title='Operator rewards'
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              At the end of each epoch, the Cardano blockchain calculates rewards for stake pool operators and
              delegators. The rewards for each registered stake address are added to the associated reward account.
              Since all the information relevant to calculating rewards is publicly available on the blockchain, it's
              unnecessary to explicitly write the balance of each reward account to the chain. Instead, nodes can store
              reward accounts and their current balance locally.
            </Typography>
            <Typography mt={1}>
              During reward distribution, no rewards are paid to the reward accounts of owner stake addresses. Instead,
              the stake delegated by all owner stake addresses is counted as the stake contributed by the pool owner(s),
              and their reward is paid to the reward account of the stake pool.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
