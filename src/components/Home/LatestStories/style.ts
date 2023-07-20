import { Box, styled } from "@mui/material";

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
  color: ${({ theme }) => theme.palette.secondary.main};
  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: ${({ theme }) => theme.palette.primary[200]};
  }
`;

export const Item = styled(BoxRaised)`
  display: flex;
  gap: 15px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.card};
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 15px;
  }
`;

export const Image = styled("img")`
  aspect-ratio: 80/80;
  width: 80px;
  height: 80px;
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

export const Author = styled(Box)`
  width: max-content;
  white-space: nowrap;
  width: 100%;
  line-height: 1.15;
  max-height: 1em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.success[800]};
  background-color: ${(props) => props.theme.palette.success[100]};
  padding: 3px 4.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0;
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 5px;
`;
export const ItemTitle = styled("h5")`
  display: -webkit-box;
  width: 100%;
  max-height: 3.6em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: ${(props) => props.theme.palette.secondary.main};
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
  color: ${(props) => props.theme.palette.secondary.light};
  margin: 0;
`;
export const TimeIcon = styled("img")`
  width: 12px;
  height: 12px;
`;
