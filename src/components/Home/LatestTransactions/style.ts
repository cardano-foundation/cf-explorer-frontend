import { Box, styled } from "@mui/material";

import { BoxRaised } from "src/components/commons/BoxRaised";
import { TRANSACTION_STATUS } from "src/commons/utils/constants";

export const TransactionContainer = styled(Box)`
  margin-bottom: 24px;
  padding: 24px 0px;
  text-align: left;
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 20px;
  gap: 10px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 0 15px;
    margin-bottom: 2.5rem;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-bottom: 0.5rem;
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

export const Actions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 15,
  position: "relative"
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[400],
  display: "block",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const TimeDurationSm = styled("small")(({ theme }) => ({
  color: theme.palette.grey[400],
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    marginBottom: "1.5rem",
    padding: "0 15px"
  }
}));

export const Item = styled(BoxRaised)`
  display: block;
  position: relative;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: var(--font-family-text);
  cursor: pointer;
  height: calc(100% - 56px);
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.card};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 20px 15px;
  }
`;
export const ItemHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    justify-content: flex-start;
  }
`;
export const RowItem = styled(Box)`
  line-height: 1;
  margin-top: ${(props) => props.theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 0;
    margin-right: 10px;
  }
}
`;

export const PriceImage = styled("img")`
  height: 45px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    height: 30px;
  }
`;

export const PriveValue = styled("span")`
  font-size: var(--font-size-text-x-large);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  text-align: end;
`;

export const ItemDetail = styled("div")`
  color: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Hash = styled("small")`
  font-style: normal;
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.main};
  font-family: var(--font-family-text);
`;

export const BlockNo = styled("small")`
  font-style: normal;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
  color: black;
`;

export const WalletAddress = styled("small")`
  color: ${(props) => props.theme.palette.secondary.main};
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
`;

export const BlankImage = styled("img")`
  margin-left: 6px;
  margin-bottom: -1px;
  width: 14px;
  height: 14px;
  vertical-align: baseline;
`;

export const HeaderStatus = styled("small")<{ status?: keyof typeof TransactionStatus | IDataEpoch["status"] }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case TRANSACTION_STATUS.FAIL:
        return theme.palette.error.main;
      case TRANSACTION_STATUS.PENDDING:
        return theme.palette.warning.main;
      case TRANSACTION_STATUS.SUCCESS:
        return theme.palette.green[700];
      case "IN_PROGRESS":
        return theme.palette.warning.main;
      case "FINISHED":
        return theme.palette.info.main;
      default:
        return theme.palette.success.main;
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case TRANSACTION_STATUS.FAIL:
        return theme.palette.error.light;
      case TRANSACTION_STATUS.PENDDING:
        return theme.palette.warning.light;
      case TRANSACTION_STATUS.SUCCESS:
        return theme.palette.green[700_10];
      case "IN_PROGRESS":
        return theme.palette.warning.light;
      case "FINISHED":
        return theme.palette.info.light;
      default:
        return theme.palette.success.light;
    }
  }};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 7px;
  border-radius: 2px;
  font-size: 0.8125rem;
  line-height: 1;
  width: min-content;
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 3px 3px;
    font-size: 0.75rem;
  }
`;

export const LatestTransactionItemHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
