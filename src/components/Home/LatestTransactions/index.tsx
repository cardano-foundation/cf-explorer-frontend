import { Box, Grid, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BlankBlueIcon, ADAIcon } from "../../../commons/resources";
import { details, routers } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { REFRESH_TIMES } from "../../../commons/utils/constants";
import { formatADAFull, getShortHash, getShortWallet, handleClicktWithoutAnchor } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import ViewAllButton from "../../commons/ViewAllButton";
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
} from "./style";
import useFetch from "../../../commons/hooks/useFetch";
import { TRANSACTION_STATUS } from "../../../commons/utils/constants";

const LatestTransactions: React.FC = () => {
  const { data, initialized } = useFetch<CurrentTransactions[]>(
    API.TRANSACTION.CURRENT,
    undefined,
    false,
    REFRESH_TIMES.LATEST_TRANSACTION
  );
  const history = useHistory();

  return (
    <TransactionContainer>
      <Header>
        <Title>Latest Transactions</Title>
        <ViewAllButton to={routers.TRANSACTION_LIST} />
      </Header>
      {
        <Grid container spacing={2}>
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
            : data?.map(item => {
                const { hash, fromAddress, toAddress, blockNo, amount, status, time, epochNo, epochSlotNo } = item;
                return (
                  <Grid item xl lg={3} xs={6} key={hash}>
                    <Item onClick={e => handleClicktWithoutAnchor(e, () => history.push(details.transaction(hash)))}>
                      <ItemHeader>
                        <PriceImage src={ADAIcon} alt="check green" />
                        <Box display={"flex"} flexDirection={"column"} rowGap={"4px"} alignItems={"end"}>
                          <HeaderStatus status={status as TRANSACTION_STATUS}>{status}</HeaderStatus>
                          <PriveValue>{formatADAFull(amount)}</PriveValue>
                        </Box>
                      </ItemHeader>
                      <ItemDetail>
                        <RowItem>
                          <small>Transaction hash: </small>
                          <CustomTooltip title={hash}>
                            <Link to={details.transaction(hash)}>
                              <Hash>{getShortHash(hash)}</Hash>
                            </Link>
                          </CustomTooltip>
                        </RowItem>
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
                        {fromAddress?.slice(0, 1).map(add => {
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
                        {toAddress?.slice(0, 1).map(add => {
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
                          <small>Timestamp: </small>
                          <small>{time}</small>
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
