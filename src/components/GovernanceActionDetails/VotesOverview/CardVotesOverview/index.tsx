import { VoteStatus } from "src/components/commons/CardGovernanceVotes";

import { CardContainer, ContainerField, TitleField, ValueField } from "./styles";

export default function CardVotesOverview() {
  return (
    <CardContainer>
      <ContainerField>
        <TitleField>ID:</TitleField>
        <ValueField>d32493bf99...00e03989bd</ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Body</TitleField>
        <ValueField>DRep</ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Timestamp:</TitleField>
        <ValueField>02/26/2024 15:59:13</ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Vote:</TitleField>
        <VoteStatus status="YES" />
      </ContainerField>

      <ContainerField>
        <TitleField>Voting Stake:</TitleField>
        <ValueField>1,000,200.001 ADA</ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Voting Power:</TitleField>
        <ValueField>50%</ValueField>
      </ContainerField>
    </CardContainer>
  );
}
