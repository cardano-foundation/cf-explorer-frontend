import React from "react";
import { Grid, Skeleton, Tooltip } from "@mui/material";
import { Link, NavLink, useHistory } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { BlankBlueIcon, AIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatADA, getShortHash, getShortWallet, handleClicktWithoutAnchor } from "../../../commons/utils/helper";
import styles from "./index.module.scss";

const LatestTransactions: React.FC = () => {
  const { data, loading } = useFetchList<Transactions>(`tx/list`, { page: 0, size: 4 });
  const history = useHistory();
  return (
    <div className={styles.latestTransaction}>
      <div className={styles.title}>
        <h3>Latest Transactions</h3>
        <NavLink to={routers.TRANSACTION_LIST} className={styles.seemoreDesktop}>
          <small>See All</small>
        </NavLink>
      </div>
      {loading && (
        <Grid container columns={24} spacing={2}>
          {new Array(4).fill(0).map((_, index) => {
            return (
              <Grid item xs={24} sm={12} lg={6} key={index}>
                <div className={styles.item}>
                  <div className={styles.priceValue}>
                    <Skeleton variant="circular" width={50} height={40} />
                    <Skeleton variant="text" width={"100%"} />
                  </div>
                  <Skeleton variant="text" height={30} width={"100%"} />
                  <Skeleton variant="text" height={30} width={"100%"} />
                  <Skeleton variant="text" height={30} width={"100%"} />
                  <Skeleton variant="text" height={30} width={"100%"} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
      {!loading && (
        <Grid container columns={24} spacing={2}>
          {data.slice(0, 4).map(item => {
            const { hash, addressesInput, addressesOutput, blockNo, totalOutput } = item;
            return (
              <Grid item xs={24} sm={12} lg={6} key={hash}>
                <div
                  onClick={e =>
                    handleClicktWithoutAnchor(e, () =>
                      history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`))
                    )
                  }
                  className={styles.item}
                >
                  <div className={styles.priceValue}>
                    <img className={styles.icon} src={AIcon} alt="check green" />
                    <span>{formatADA(totalOutput)}</span>
                  </div>
                  <p>
                    <small>Transaction hash: </small>
                    <Tooltip placement="top" title={hash}>
                      <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`)}>
                        <small className={styles.hash}>{getShortHash(hash)}</small>
                      </Link>
                    </Tooltip>
                  </p>
                  <p>
                    <small>Block: </small>
                    <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${blockNo}`)}>
                      <small className={styles.blockNo}>{blockNo}</small>
                    </Link>
                  </p>
                  {addressesOutput?.slice(0, 1).map(add => {
                    return (
                      <p key={add}>
                        <small>From: </small>
                        <Tooltip placement="top" title={add}>
                          <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`)}>
                            <small>{getShortWallet(add)}</small>
                            <img src={BlankBlueIcon} alt="blank blue" />
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
                            <small>{getShortWallet(add)}</small>
                            <img src={BlankBlueIcon} alt="blank blue" />
                          </Link>
                        </Tooltip>
                      </p>
                    );
                  })}
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
      <NavLink to={routers.BLOCK_LIST} className={styles.seemoreMobile}>
        <small>See All</small>
      </NavLink>
    </div>
  );
};

export default LatestTransactions;
