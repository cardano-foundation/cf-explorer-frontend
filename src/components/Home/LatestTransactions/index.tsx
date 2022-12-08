import { Grid, Skeleton } from "@mui/material";
import { Tooltip } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { BlankBlueIcon, AIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatADA, getShortHash, getShortWallet, handleClicktWithoutAnchor } from "../../../commons/utils/helper";
import {
  Hash,
  Header,
  Item,
  ItemDetail,
  ItemHeader,
  PriceImage,
  PriveValue,
  SeemoreButton,
  SeemoreText,
  Title,
  TransactionContainer,
  BlockNo,
  WalletAddress,
  BlankImage,
} from "./style";

const LatestTransactions: React.FC = () => {
  const { data, loading } = useFetchList<Transactions>(`tx/list`, { page: 0, size: 4 });
  const history = useHistory();
  return (
    <TransactionContainer>
      <Header>
        <Title>Latest Transactions</Title>
        <SeemoreButton to={routers.TRANSACTION_LIST}>
          <SeemoreText>See All</SeemoreText>
        </SeemoreButton>
      </Header>
      {
        <Grid container spacing={2}>
          {loading
            ? new Array(4).fill(0).map((_, index) => {
                return (
                  <Grid item xl lg={3} xs={6} key={index}>
                    <Item>
                      <ItemHeader>
                        <Skeleton />
                        <Skeleton />
                      </ItemHeader>
                      <Skeleton />
                    </Item>
                  </Grid>
                );
              })
            : data.slice(0, 4).map(item => {
                const { hash, addressesInput, addressesOutput, blockNo, totalOutput } = item;
                return (
                  <Grid item xl lg={3} xs={6} key={hash}>
                    <Item
                      onClick={e =>
                        handleClicktWithoutAnchor(e, () =>
                          history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`))
                        )
                      }
                    >
                      <ItemHeader>
                        <PriceImage src={AIcon} alt="check green" />
                        <PriveValue>{formatADA(totalOutput)}</PriveValue>
                      </ItemHeader>
                      <ItemDetail>
                        <p>
                          <small>Transaction hash: </small>
                          <Tooltip placement="top" title={hash}>
                            <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`)}>
                              <Hash>{getShortHash(hash)}</Hash>
                            </Link>
                          </Tooltip>
                        </p>
                        <p>
                          <small>Block: </small>
                          <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${blockNo}`)}>
                            <BlockNo>{blockNo}</BlockNo>
                          </Link>
                        </p>
                        {addressesOutput?.slice(0, 1).map(add => {
                          return (
                            <p key={add}>
                              <small>From: </small>
                              <Tooltip placement="top" title={add}>
                                <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`)}>
                                  <WalletAddress>{getShortWallet(add)}</WalletAddress>
                                  <BlankImage src={BlankBlueIcon} alt="blank blue" />
                                </Link>
                              </Tooltip>
                            </p>
                          );
                        })}
                        {addressesInput?.slice(0, 1).map(add => {
                          return (
                            <p key={add}>
                              <small>To: </small>
                              <Tooltip placement="top" title={add}>
                                <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`)}>
                                  <WalletAddress>{getShortWallet(add)}</WalletAddress>
                                  <BlankImage src={BlankBlueIcon} alt="blank blue" />
                                </Link>
                              </Tooltip>
                            </p>
                          );
                        })}
                      </ItemDetail>
                    </Item>
                  </Grid>
                );
              })}
        </Grid>
      }
      <SeemoreButton to={routers.BLOCK_LIST} mobile>
        <SeemoreText>See All</SeemoreText>
      </SeemoreButton>
    </TransactionContainer>
  );
};

export default LatestTransactions;
