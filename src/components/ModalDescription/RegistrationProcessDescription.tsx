import { Box } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { BoxDetails, NormalDescription, NumberParagraph, Watermark } from "./styles";

export function RegistrationProcessDescription() {
  return (
    <StyledModal title="The registration process" handleCloseModal={() => { }} open>
      <Box>
        <NormalDescription>
          When a delegator wants to obtain a staking certificate from the Cardano protocol, the following steps occur:
        </NormalDescription>
        <BoxDetails>
          <Watermark>
            foR illustration only
          </Watermark>
          <NormalDescription>
            <NumberParagraph>
              1.
            </NumberParagraph>
            The delegator selects a staking pool to delegate their funds to. This is done through a wallet or a staking service. Cardano protocol, the following steps occur:
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              2.
            </NumberParagraph>
            The delegator then sends their ADA tokens to the selected staking pool's address.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              3.
            </NumberParagraph>
            The staking pool then generates a staking certificate for the delegator, which is essentially a proof of the delegation of funds. This certificate is stored on the Cardano blockchain and serves as a record of the delegation.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>
              4.
            </NumberParagraph>
            The delegator can then use the staking certificate to verify their delegation and claim rewards. The certificate can also be used to prove ownership of the staked ADA, which is useful in case of a dispute.
          </NormalDescription>
        </BoxDetails>
        <NormalDescription>
          In summary, a staking certificate serves as proof of delegation and can be used to verify and claim rewards. Obtaining a staking certificate is an important part of the Cardano staking process.
        </NormalDescription>
      </Box>
    </StyledModal >
  )
}
