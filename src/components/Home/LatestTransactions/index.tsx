import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import { BlankBlueIcon, ADAIcon } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES, TRANSACTION_STATUS } from "src/commons/utils/constants";
import {
  formatADAFull,
  formatDateTimeLocal,
  getShortHash,
  getShortWallet,
  handleClicktWithoutAnchor
} from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ViewAllButton from "src/components/commons/ViewAllButton";
import useFetch from "src/commons/hooks/useFetch";
import FormNowMessage from "src/components/commons/FormNowMessage";

import {
  Hash,
  Header,
  Item,
  ItemDetail,
  ItemHeader,
  PriceImage,
  PriveValue,
  Title,
  TransactionContainer,
  BlockNo,
  WalletAddress,
  BlankImage,
  RowItem,
  HeaderStatus,
  Actions,
  TimeDuration,
  TimeDurationSm,
  LatestTransactionItemHeader
} from "./style";

const LatestTransactions: React.FC = () => {
  const { data, initialized, lastUpdated } = useFetch<CurrentTransactions[]>(
    API.TRANSACTION.CURRENT,
    undefined,
    false,
    REFRESH_TIMES.LATEST_TRANSACTION
  );

  const history = useHistory();
  return (
    <TransactionContainer data-testid="home-latest-transactions">
      <Header>
        <Title>Latest Transactions</Title>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <ViewAllButton data-testid="view-all" to={routers.TRANSACTION_LIST} />
        </Actions>
      </Header>
      <TimeDurationSm>
        <FormNowMessage time={lastUpdated} />
      </TimeDurationSm>
      {
        <Grid container spacing={{ sm: 2 }}>
          {!initialized
            ? new Array(4).fill(0).map((_, index) => {
                return (
                  <Grid item xl lg={3} xs={6} key={index}>
                    <Item>
                      <ItemHeader>
                        <Skeleton variant="circular" width={50} height={40} />
                        <Skeleton variant="text" width={"100%"} />
                      </ItemHeader>
                      <Skeleton />
                      <Skeleton variant="text" height={30} width={"100%"} />
                      <Skeleton variant="text" height={30} width={"100%"} />
                      <Skeleton variant="text" height={30} width={"100%"} />
                      <Skeleton variant="text" height={30} width={"100%"} />
                    </Item>
                  </Grid>
                );
              })
            : data?.map((item) => {
                const { hash, fromAddress, toAddress, blockNo, amount, status, time, epochNo, epochSlotNo } = item;

                return (
                  // isTable show 2 item per row else show 1 item per row grid
                  <Grid item xl lg={3} xs={12} sm={6} key={hash}>
                    <Item onClick={(e) => handleClicktWithoutAnchor(e, () => history.push(details.transaction(hash)))}>
                      <ItemHeader>
                        <LatestTransactionItemHeader>
                          <HeaderStatus status={status as TRANSACTION_STATUS}>{status}</HeaderStatus>
                          <PriceImage src={ADAIcon} alt="check green" />
                        </LatestTransactionItemHeader>
                        <PriveValue>{formatADAFull(amount)}</PriveValue>
                      </ItemHeader>
                      <ItemDetail>
                        <Box display="flex" alignItems="center">
                          <RowItem>
                            <small>Transaction hash: </small>
                            <CustomTooltip title={hash}>
                              <Link to={details.transaction(hash)}>
                                <Hash>{getShortHash(hash)}</Hash>
                              </Link>
                            </CustomTooltip>
                          </RowItem>
                        </Box>
                        <RowItem>
                          <small>Block: </small>
                          <Link to={details.block(blockNo)}>
                            <BlockNo>{blockNo}</BlockNo>
                          </Link>
                        </RowItem>
                        <RowItem>
                          <small>Epoch: </small>
                          <Link to={details.epoch(epochNo)}>
                            <BlockNo>{epochNo}</BlockNo>
                          </Link>
                        </RowItem>
                        <RowItem>
                          <small>Slot: </small>
                          <small>{epochSlotNo}</small>
                        </RowItem>
                        {fromAddress?.slice(0, 1).map((add) => {
                          return (
                            <RowItem key={add}>
                              <small>From: </small>
                              <CustomTooltip title={add}>
                                <Link to={details.address(add)}>
                                  <WalletAddress>{getShortWallet(add)}</WalletAddress>
                                  <BlankImage src={BlankBlueIcon} alt="blank blue" />
                                </Link>
                              </CustomTooltip>
                            </RowItem>
                          );
                        })}
                        {toAddress?.slice(0, 1).map((add) => {
                          return (
                            <RowItem key={add} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                              <Box>
                                <small>To: </small>
                                <CustomTooltip title={add}>
                                  <Link to={details.address(add)}>
                                    <WalletAddress>{getShortWallet(add)}</WalletAddress>
                                    <BlankImage src={BlankBlueIcon} alt="blank blue" />
                                  </Link>
                                </CustomTooltip>
                              </Box>
                            </RowItem>
                          );
                        })}
                        <RowItem>
                          <small>Created At: </small>
                          <small>{formatDateTimeLocal(time)}</small>
                        </RowItem>
                      </ItemDetail>
                    </Item>
                  </Grid>
                );
              })}
        </Grid>
      }
    </TransactionContainer>
  );
};

export default LatestTransactions;
