import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { BlankBlueIcon } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { TRANSACTION_STATUS } from "src/commons/utils/constants";
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
import ADAicon from "src/components/commons/ADAIcon";

import {
  Hash,
  Header,
  Item,
  ItemDetail,
  ItemHeader,
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
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { data, initialized, lastUpdated } = useFetch<CurrentTransactions[]>(
    API.TRANSACTION.CURRENT,
    undefined,
    false,
    blockKey
  );

  const history = useHistory();
  return (
    <TransactionContainer data-testid="home-latest-transactions">
      <Header>
        <Title>{t("common.latestTxs")}</Title>
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
                          <HeaderStatus status={status as TRANSACTION_STATUS}>
                            {t(`status.${String(status).toLowerCase()}`)}
                          </HeaderStatus>
                          <Box display={"flex"} alignItems={"flex-start"}>
                            <PriveValue>{formatADAFull(amount)}</PriveValue>
                            <Box component={"span"} sx={{ width: 14 }}>
                              <ADAicon width={14} />
                            </Box>
                          </Box>
                        </LatestTransactionItemHeader>
                      </ItemHeader>
                      <ItemDetail>
                        <Box display="flex" alignItems="center">
                          <RowItem>
                            <small>{t("common.txhash")}: </small>
                            <CustomTooltip title={hash}>
                              <Link to={details.transaction(hash)}>
                                <Hash>{getShortHash(hash)}</Hash>
                              </Link>
                            </CustomTooltip>
                          </RowItem>
                        </Box>
                        <RowItem>
                          <small>{t("glossary.block")}: </small>
                          <Link to={details.block(blockNo)}>
                            <BlockNo>{blockNo}</BlockNo>
                          </Link>
                        </RowItem>
                        <RowItem>
                          <small>{t("glossary.epoch")}: </small>
                          <Link to={details.epoch(epochNo)}>
                            <BlockNo>{epochNo}</BlockNo>
                          </Link>
                        </RowItem>
                        <RowItem>
                          <small>{t("glossary.slot")}: </small>
                          <small>{epochSlotNo}</small>
                        </RowItem>
                        {fromAddress?.slice(0, 1).map((add) => {
                          return (
                            <RowItem key={add}>
                              <small>{t("common.from")}: </small>
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
                                <small>{t("common.to")}: </small>
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
                          <small>{t("common.createdAt")}: </small>
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
