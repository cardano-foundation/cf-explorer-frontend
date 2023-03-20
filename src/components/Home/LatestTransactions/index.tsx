import { Grid, Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { BlankBlueIcon, ADAIcon } from "../../../commons/resources";
import { details, routers } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import {
  exchangeADAToUSD,
  getShortHash,
  getShortWallet,
  handleClicktWithoutAnchor,
} from "../../../commons/utils/helper";
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
} from "./style";

const LatestTransactions: React.FC = () => {
  const { data, loading } = useFetchList<Transactions>(API.TRANSACTION.LIST, { page: 0, size: 4 });
  const { adaRate } = useSelector(({ system }: RootState) => system);

  const history = useHistory();
  return (
    <TransactionContainer>
      <Header>
        <Title>Latest Transactions</Title>
        <ViewAllButton to={routers.TRANSACTION_LIST} />
      </Header>
      <Grid container spacing={2}>
        {loading
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
          : data.slice(0, 4).map(transaction => {
              const { hash, addressesInput, addressesOutput, blockNo, totalOutput } = transaction;
              const addressFrom = addressesInput?.[0];
              const addressTo = addressesOutput?.[0];
              return (
                <Grid item xl lg={3} xs={6} key={hash}>
                  <Item onClick={e => handleClicktWithoutAnchor(e, () => history.push(details.transaction(hash)))}>
                    <ItemHeader>
                      <PriceImage src={ADAIcon} alt="check green" />
                      <PriveValue>{exchangeADAToUSD(totalOutput, adaRate, true)}</PriveValue>
                    </ItemHeader>
                    <ItemDetail>
                      <p>
                        <small>Transaction hash: </small>
                        <CustomTooltip title={hash}>
                          <Link to={details.transaction(hash)}>
                            <Hash>{getShortHash(hash)}</Hash>
                          </Link>
                        </CustomTooltip>
                      </p>
                      <p>
                        <small>Block: </small>
                        <Link to={details.block(blockNo)}>
                          <BlockNo>{blockNo}</BlockNo>
                        </Link>
                      </p>
                      {addressFrom ? (
                        <p key={addressFrom}>
                          <small>From: </small>
                          <CustomTooltip title={addressFrom}>
                            <Link to={details.address(addressFrom)}>
                              <WalletAddress>{getShortWallet(addressFrom)}</WalletAddress>
                              <BlankImage src={BlankBlueIcon} alt="blank blue" />
                            </Link>
                          </CustomTooltip>
                        </p>
                      ) : (
                        ""
                      )}
                      {addressTo ? (
                        <p key={addressTo}>
                          <small>To: </small>
                          <CustomTooltip title={addressTo}>
                            <Link to={details.address(addressTo)}>
                              <WalletAddress>{getShortWallet(addressTo)}</WalletAddress>
                              <BlankImage src={BlankBlueIcon} alt="blank blue" />
                            </Link>
                          </CustomTooltip>
                        </p>
                      ) : (
                        ""
                      )}
                    </ItemDetail>
                  </Item>
                </Grid>
              );
            })}
      </Grid>
    </TransactionContainer>
  );
};

export default LatestTransactions;
