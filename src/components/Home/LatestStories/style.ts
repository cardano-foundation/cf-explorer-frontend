import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
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
  margin-bottom: 0px;

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

export const SeemoreButton = styled(Link)<{ mobile?: boolean }>`
  display: ${props => (props.mobile ? "none" : "block")};
  text-align: center;
  height: auto;
  @media screen and (max-width: 539px) {
    display: ${props => (props.mobile ? "block" : "none")};
    margin-top: ${props => (props.mobile ? 20 : 0)}px;
  }
`;

export const SeemoreText = styled("small")`
  display: block;
  width: max-content;
  margin: auto;
  padding: 6.5px 20px;
  border: 2px solid ${props => props.theme.colorGreenLight};
  border-radius: 5px;
  color: ${props => props.theme.colorGreenLight};
  font-weight: var(--font-weight-bold);
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
  display: block;
  margin-bottom: 15px;
  text-align: left;
`;

export const Image = styled("img")`
  aspect-ratio: 280/155;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: ${props => props.theme.bodyBackground};
`;
export const Author = styled("h6")`
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorGreenLight};
  background-color: ${props => props.theme.colorGreenPale};
  padding: 3px 4.5px;
  letter-spacing: 0.12em;
  width: max-content;
  text-transform: uppercase;
`;
export const ItemTitle = styled("h4")`
  display: -webkit-box;
  width: 100%;
  height: 4.5rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const Time = styled("small")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family-text);
  color: ${props => props.theme.textColorPale};
`;
export const TimeIcon = styled("img")`
  width: 16px;
  height: 16px;
`;
