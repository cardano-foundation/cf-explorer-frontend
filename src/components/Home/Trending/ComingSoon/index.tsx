import { styled } from "@mui/material";
import React from "react";
import { ComingSoonIcon } from "../../../../commons/resources";
import { BoxRaised } from "../../../commons/BoxRaised";

interface Props {}

const ComingSoonContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 72px;
  @media screen and (max-width: 1023px) {
    padding: 48px;
  }
`;
const Image = styled("img")`
  width: auto;
  height: 166px;
  margin-bottom: 1rem;
`;

const Title = styled("h3")`
  margin-bottom: 0;
`;
const ComingSoon: React.FC<Props> = () => {
  return (
    <ComingSoonContainer>
      <Image src={ComingSoonIcon} alt="Coming soon" />
      <Title>Coming Soon</Title>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
