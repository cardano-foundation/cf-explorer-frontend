import { Box, styled } from "@mui/material";

import Card from "src/components/commons/Card";
import breakpoints from "src/themes/breakpoints";

export const StyledCard = {
  Container: styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.palette.secondary[0]};
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.shadow.card};
    padding: 24px;
    box-sizing: border-box;
  `,
  Title: styled(Box)`
    font-size: 14px;
    line-height: 16.41px;
    color: ${(props) => props.theme.palette.secondary.light};
  `,
  Value: styled(Box)`
    font-size: 18px;
    font-weight: 700;
    line-height: 21.09px;
    color: ${(props) => props.theme.palette.secondary.main};
  `
};

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 26px;
  @media screen and (max-width: ${breakpoints.values.md}px) {
    position: relative;
    top: 5px;
  }
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const TitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${(props) => props.theme.breakpoints.down("sm")} {
    justify-content: flex-start;
  }
`;

export const HeaderDetailContainer = styled(Box)`
  text-align: left;
`;

export const SlotLeaderValue = styled("span")<{ sidebar?: boolean }>`
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.primary.main};
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  font-weight: bold;
`;

export const HeaderTitle = styled(Box)`
  overflow-wrap: anywhere;
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 2.25rem;
  margin: 0.5rem 0;
  text-transform: capitalize;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.5rem;
  }
`;

export const SlotLeader = styled("p")`
  display: flex;
  gap: 8px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

export const SlotLeaderTitle = styled("small")`
  font-family: var(--font-family-text);
  color: ${({ theme }) => theme.palette.secondary.light};
  align-self: center;
  margin-right: 8px;
  padding-top: 7px;
  white-space: nowrap;
`;
