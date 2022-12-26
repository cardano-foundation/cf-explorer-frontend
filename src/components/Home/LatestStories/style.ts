import { Box, styled } from "@mui/material";
import Slider from "react-slick";
import { BoxRaised } from "../../commons/BoxRaised";

export const LatestStoriesContainer = styled(Box)`
  text-align: center;
  padding: 1rem 0px;
  margin-bottom: 30px;
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 10px;
`;

export const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin: 0px;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: var(--color-green-light);
  }
`;

export const StyledSlider = styled(Slider)`
  @media screen and (max-width: 539px) {
    margin-bottom: 40px;
  }
  div[class*="slick-list"] {
    margin: 0 -10px;

    div[class*="slick-slide"] > div {
      padding: 0 10px;
    }
  }
  ul[class*="slick-dots"] {
    li {
      margin: 0;
      width: 16px;
      height: 16px;
      button {
        position: relative;
        text-align: center;
        width: 16px;
        height: 16px;
        padding: 5px;

        &::before {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #98a2b3;
          opacity: 0.3;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
        }
      }
      &[class*="slick-active"] {
        button::before {
          width: 8px;
          height: 8px;
          background: #438f68;
          opacity: 1;
        }
      }
    }
  }
`;

export const Item = styled(BoxRaised)`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  text-align: left;
  overflow: hidden;
  &:hover {
    box-shadow: ${props => props.theme.shadowRaisedHover};
  }
`;

export const Image = styled("img")`
  aspect-ratio: 80/80;
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: ${props => props.theme.bodyBackground};
`;
export const Detail = styled(Box)`
  overflow: hidden;
`;

export const Author = styled("h6")`
  display: -webkit-box;
  width: max-content;
  max-width: 100%;
  line-height: 1.15;
  max-height: 1em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorGreenLight};
  background-color: ${props => props.theme.colorGreenPale};
  padding: 3px 4.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 5px;
`;
export const ItemTitle = styled("h5")`
  display: -webkit-box;
  width: 100%;
  max-height: 3.6em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: var(--font-size-text-small);
  line-height: 1.15;
  margin-top: 0;
  margin-bottom: 5px;
`;

export const Time = styled("h5")`
  font-size: var(--font-size-text-x-small);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-normal);
  color: ${props => props.theme.textColorPale};
  line-height: 1.15;
  margin: 0;
`;
export const TimeIcon = styled("img")`
  width: 12px;
  height: 12px;
`;
