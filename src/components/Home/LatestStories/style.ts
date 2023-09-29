import { Box, styled } from "@mui/material";
import Slider from "react-slick";

import { BoxRaised } from "../../commons/BoxRaised";

export const LatestStoriesContainer = styled(Box)`
  text-align: center;
  padding: 1rem 0px;
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 20px;
  gap: 10px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 15px;
  }
`;

export const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin: 0px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: ${({ theme }) => (theme.mode === "light" ? theme.palette.primary[200] : theme.palette.primary.main)};
  }
`;

export const StyledSlider = styled(Slider)`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-bottom: 40px;
  }
  div[class*="slick-list"] {
    margin: -15px -8px 0px;

    div[class*="slick-slide"] > div {
      padding: 15px 8px;
    }
  }
`;

export const Item = styled(BoxRaised)`
  position: relative;
  height: 377px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  padding: 20px 15px;
  box-sizing: border-box;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.cardHover};
  }
`;

export const WrapHeader = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`;

export const Image = styled("img")`
  aspect-ratio: 80/80;
  width: 100%;
  height: 132px;
  min-width: 80px;
  border-radius: 5px;
  object-fit: cover;
  background-color: ${(props) => props.theme.palette.background.default};
`;

export const Detail = styled(Box)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Author = styled("span")`
  width: max-content;
  white-space: nowrap;
  max-height: 1em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.success[800]};
  background-color: ${(props) => props.theme.palette.success[100]};
  padding: 2px 6px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  margin: 11px 5px 0 0;
`;

export const ItemTitle = styled("h5")`
  display: -webkit-box;
  width: 100%;
  max-height: 3.6em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: ${(props) => props.theme.palette.secondary.main};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--font-size-text-x-small);
  line-height: 1.15;
  margin-top: 0;
  margin-bottom: 5px;
`;

export const Time = styled("h5")`
  font-size: var(--font-size-text-x-small);
  display: flex;
  line-height: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-normal);
  color: ${(props) => props.theme.palette.secondary.light};
  margin: 0;
`;
export const TimeIcon = styled("img")`
  width: 12px;
  height: 12px;
`;

export const ResourceHref = styled("span")`
  margin: 5px 0px;
  width: max-content;
  background-color: ${(props) => props.theme.palette.primary[100]};
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 700;
  font-size: 10px;
  cursor: pointer;
  padding: 2px 6px;
`;

export const Description = styled(Box)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.palette.secondary.light};

  ${({ theme }) => theme.breakpoints.down("lg")} {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

export const FooterCard = styled(Box)`
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
`;

export const NextSwiper = styled(Box)`
  background: ${(props) => props.theme.palette.purple["100"]} !important;
  width: 50px;
  height: 50px;
  padding: 19px 21px;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateX(-25%) translateY(-50%);
  animation: all 1s;
  z-index: 1;
  &:hover {
    transform: translateX(-25%) translateY(-50%) scale(1.1);
  }
  &::before {
    display: none;
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none !important;
  }
`;

export const PrevSwiper = styled(NextSwiper)`
  transform: translateX(25%) translateY(-50%) rotate(180deg);
  &:hover {
    transform: translateX(25%) translateY(-50%) rotate(180deg) scale(1.1) !important;
  }
`;
