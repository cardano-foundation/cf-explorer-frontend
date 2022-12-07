import { styled } from "@mui/material";

const TokenWrapper = styled("div")`
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

const PolicyHeader = styled("div")`
  display: inline-flex;
  align-items: center;

  & > h3 {
    margin: 0;
    margin-left: 10px;
  }
`;

const PolicyBody = styled("div")`
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

const PolicyBodyTitle = styled("span")`
  font-weight: var(--font-weight-bold);
  font-size: 18px;
`;

const PolicyBodyDetail = styled("span")`
  color: #667085;
  font-size: 12px;
  margin-top: 5px;
`;

const TokenDetail = styled("div")`
  margin-top: 20px;
  display: flex;
`;

const TokenDetailSupply = styled("div")`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
`;

const TokenDetailDecimal = styled(TokenDetailSupply)`
  padding: 0;
  padding-left: 15px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

const TokenDetailTitle = styled("span")`
  color: #667085;
  font-size: 14px;
`;

const TokenDetailDetail = styled("span")`
  font-weight: var(--font-weight-bold);
  margin-top: 8px;
  font-size: 18px;
`;

export const Token = {
  TokenWrapper,
  PolicyHeader,
  PolicyBody,
  TokenDetail,
  PolicyBodyTitle,
  PolicyBodyDetail,
  TokenDetailSupply,
  TokenDetailDecimal,
  TokenDetailTitle,
  TokenDetailDetail,
};
