import { Box, Grid, styled } from "@mui/material";
import Card from "../Card";

export const TokenWrapper = styled("div")`
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const PolicyHeader = styled("div")`
  display: inline-flex;
  align-items: center;

  & > h3 {
    margin: 0;
    margin-left: 10px;
  }
`;

export const PolicyBody = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(24, 76, 120, 0.1);
  border-radius: 5px;
  margin-top: 15px;
  padding: 13px 15px;

  & > div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;

export const PolicyBodyTitle = styled("span")`
  font-weight: var(--font-weight-bold);
  font-size: 18px;
`;

export const PolicyBodyDetail = styled("span")`
  color: #667085;
  font-size: 12px;
  margin-top: 5px;
`;

export const TokenDetail = styled("div")`
  margin-top: 20px;
  display: flex;
`;

export const TokenDetailSupply = styled("div")`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
`;

export const TokenDetailDecimal = styled(TokenDetailSupply)`
  padding: 0;
  padding-left: 15px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

export const TokenDetailTitle = styled("span")`
  color: #667085;
  font-size: 14px;
`;

export const TokenDetailDetail = styled("span")`
  font-weight: var(--font-weight-bold);
  margin-top: 8px;
  font-size: 18px;
`;

export const Wrapper = styled(Grid)`
  margin-top: 24px;
  min-height: 250px;
  height: 100%;
`;

export const CardInfo = styled(Card)`
  padding-left: 40px;
  padding-right: 40px;
  text-align: left;
  background-color: #fff;
  box-shadow: ${props => props.theme.shadowRaised};

  @media screen and (max-width: 1023px) {
    height: auto;
    margin-bottom: 30px;
  }
`;

export const CardInfoItem = styled(Box)`
  font-size: var(--font-size-text);
  display: flex;
  align-items: center;
  line-height: 30px;
  margin-bottom: 1rem;
`;

export const InfoIcon = styled("img")`
  margin-right: 8px;
  display: block;
  width: 24px;
  height: 24px;
`;

export const InfoTitle = styled(Box)`
  min-width: 150px;
`;

export const InfoValue = styled(Box)`
  margin-left: 0.5rem;
  font-weight: var(--font-weight-bold);
`;

export const CardProgress = styled(Card)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: ${props => props.theme.shadowRaised};
  background-color: #fff;
  height: 100%;
  overflow-x: auto;
  padding: 25px 30px;
  gap: 10px;

  @media screen and (max-width: 767px) {
    justify-content: center;
    height: auto;
    padding: 25px 20px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
`;

export const EpochNumber = styled("h1")`
  font-size: 56px;
  color: #29744d;
  margin: 0;
`;

export const EpochText = styled("span")`
  color: ${props => props.theme.textColorPale};
`;

export const ProgressData = styled(Box)`
  display: flex;
  align-items: flex-end;
  height: 100%;
  margin-top: 14px;
  text-align: left;
`;
