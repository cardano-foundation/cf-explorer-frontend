import { Box, Grid, styled } from "@mui/material";

export const StyledContainer = styled(Box)`
  text-align: left;
`;

export const GridWrapper = styled(Grid)`
  min-height: 400px;
  padding: 0 0 0 0;
  text-align: left;
`;

export const Tab = styled("div")`
  display: inline-block;
`;

export const Button = styled("button")<{ active: number }>`
  width: 115px;
  border: none;
  border-radius: 5px;
  padding: 6px 0;
  font-weight: var(--font-weight-bold);
  color: ${({ theme, active }) => (active ? theme.textColorReverse : theme.textColorLight)};
  background-color: ${({ theme, active }) => (active ? theme.green_2 : theme.gray_11)};
  cursor: pointer;
  font-family: var(--font-family-title);
  font-size: 16px;
  line-height: 24px;
`;

export const ChartContainer = styled("div")`
  padding-top: 20px;
`;

export const GridRight = styled(Grid)`
  flex: 1;
  max-height: calc(100% - 50px);
  background: ${props => props.theme.gray_3};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadow_0};
  padding: 0px 20px;
  @media screen and (min-width: 540px) and (max-width: 1370px) {
    padding: 25px 0px;
  }
  @media screen and (max-width: 1370px) {
    max-height: unset;
  }
`;

export const Item = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 25px 0px;

  &:first-of-type {
    border-bottom: 1px solid ${props => props.theme.white_6};
  }
  @media screen and (min-width: 540px) and (max-width: 1370px) {
    padding: 0px 20px;
    &:first-of-type {
      border-bottom: none;
      border-right: 1px solid ${props => props.theme.white_6};
    }
  }
`;
export const AnalyticsTitle = styled("h2")`
  margin: 50px 0 15px;
`;
export const Title = styled("div")`
  color: var(--text-color-pale);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: ${props => props.theme.textColorReverse};
`;

export const Value = styled("div")`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  font-size: 32px;
  line-height: 47px;
  color: ${props => props.theme.textColorReverse};
`;

export const Horizon = styled("div")`
  width: 100%;
  opacity: 0.07;
  border: 1px solid ${props => props.theme.white};
`;
