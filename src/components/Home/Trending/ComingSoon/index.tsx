import { styled } from "@mui/material";
import React from "react";
import { ComingSoonIcon } from "../../../../commons/resources";
import { BoxRaised } from "../../../commons/BoxRaised";
import CustomTooltip from "../../../commons/CustomTooltip";

const ComingSoonContainer = styled(BoxRaised)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  height: calc(100% - 56px);
`;
const Image = styled("img")`
  width: auto;
  height: 166px;
  margin-bottom: 1rem;
`;

const Title = styled("h3")`
  margin-bottom: 0;
  color: ${(props) => props.theme.palette.text.hint};
  font-size: var(--font-size-text-x-large);
`;

const ComingSoon: React.FC = () => {
  return (
    <CustomTooltip title='Exciting things incoming'>
      <ComingSoonContainer>
        <Image src={ComingSoonIcon} alt='News' />
        <Title>News</Title>
      </ComingSoonContainer>
    </CustomTooltip>
  );
};

export default ComingSoon;
