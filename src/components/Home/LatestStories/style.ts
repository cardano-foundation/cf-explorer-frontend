import { Box, Grid, styled } from "@mui/material";

import { BoxRaised } from "src/components/commons/BoxRaised";

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

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const Item = styled(BoxRaised)`
  position: relative;
  height: 337px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.card};
  }
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    min-width: 258px;
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
  color: ${(props) => props.theme.palette.green[700]};
  background-color: ${(props) => props.theme.palette.green[700_10]};
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
  overflow: hidden;
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
  color: ${(props) => props.theme.palette.grey[400]};
  margin: 0;
`;
export const TimeIcon = styled("img")`
  width: 12px;
  height: 12px;
`;

export const ResourceHref = styled("span")`
  margin: 5px 0px;
  width: max-content;
  background-color: ${(props) => props.theme.palette.blue[100_15]};
  color: ${(props) => props.theme.palette.blue[100]};
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
  color: ${(props) => props.theme.palette.grey[300]};
`;

export const FooterCard = styled(Box)`
  position: absolute;
  bottom: 20px;
`;

export const NextSwiper = styled(Box)`
  background: ${(props) => props.theme.palette.purple[600]};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.palette.blue[200]};
  }
  position: absolute;
  right: -10px;
  bottom: 46%;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;

export const PrevSwiper = styled(NextSwiper)`
  left: -10px;
  transform: rotate(180deg);
`;

export const CustomGrid = styled(Grid)`
  width: 100%;
`;
