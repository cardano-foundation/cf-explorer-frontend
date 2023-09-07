import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { ADAactive, ADAinactive } from "src/commons/resources";

export const StyledADAactive = styled(ADAactive)`
  width: 70px;
  height: auto;
`;

export const StyledADAinactive = styled(ADAinactive)`
  width: 70px;
  height: auto;
`;

const ImageContainer = styled(Box)`
  perspective: 1000px;
  width: 70px;
  height: 70px;
  cursor: pointer;
  &:hover {
    .image-flip {
      transform: rotateY(180deg);
    }
  }
`;
const ImageFlip = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s;
`;

const ImageOposite = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const ImageFront = styled(ImageOposite)`
  transform: rotateY(0deg);
`;
const ImageBack = styled(ImageOposite)`
  transform: rotateY(180deg);
`;

export const ADAactiveFlip = () => {
  return (
    <ImageContainer>
      <ImageFlip className="image-flip">
        <ImageFront>
          <StyledADAactive />
        </ImageFront>
        <ImageBack>
          <StyledADAactive />
        </ImageBack>
      </ImageFlip>
    </ImageContainer>
  );
};
