import { Col, Row, Skeleton, Tooltip } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { BlankBlueIcon, CheckGreenIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatCurrency, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import styles from "./index.module.scss";

const LatestTransactions: React.FC = () => {
  const { data, loading } = useFetchList<Transactions>(`tx/list`, { page: 0, size: 4 });

  return (
    <div className={styles.latestTransaction}>
      <div className={styles.title}>
        <h3>Latest Transactions</h3>
        <NavLink to={routers.TRANSACTION_LIST} className={styles.seemoreDesktop}>
          <small>See All</small>
        </NavLink>
      </div>
      {loading ? (
        <Row gutter={15}>
          {new Array(4).fill(0).map((_, index) => {
            return (
              <Col span={24} sm={12} lg={6} key={index}>
                <div className={styles.item}>
                  <div className={styles.priceValue}>
                    <Skeleton.Avatar className={styles.icon} />
                    <Skeleton.Input />
                  </div>
                  <Skeleton />
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row gutter={15}>
          {data.slice(0, 4).map(item => {
            const { hash, addressesInput, addressesOutput, blockNo, totalOutput } = item;
            return (
              <Col span={24} sm={12} lg={6}>
                <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${hash}`)} className={styles.item}>
                  <div className={styles.priceValue}>
                    <img className={styles.icon} src={CheckGreenIcon} alt="check green" />
                    <span>${formatCurrency(totalOutput)}</span>
                  </div>
                  <p>
                    <small>Transaction hash: </small>
                    <Tooltip placement="top" title={hash}>
                      <small className={styles.txsDetail}>{getShortHash(hash)}</small>
                    </Tooltip>
                  </p>
                  <p>
                    <small>Block: </small>
                    <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${blockNo}`)}>
                      <small className={styles.txsDetail}>{blockNo}</small>
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
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
      <NavLink to={routers.BLOCK_LIST} className={styles.seemoreMobile}>
        <small>See All</small>
      </NavLink>
    </div>
  );
};

export default LatestTransactions;
