import { Col, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { BlankBlueIcon, CheckGreenIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatCurrency, getShortWallet } from "../../../commons/utils/helper";
import styles from "./index.module.scss";

interface Props {}

const LatestTransactions: React.FC<Props> = () => {
  return (
    <div className={styles.latestTransaction}>
      <div className={styles.title}>
        <h3>Latest Transactions</h3>
        <NavLink to={routers.BLOCK_LIST} className={styles.seemoreDesktop}>
          <small>See All</small>
        </NavLink>
      </div>
      <Row gutter={15}>
        <Col span={24} sm={12} lg={6}>
          <div className={styles.item}>
            <div className={styles.priceValue}>
              <img className={styles.icon} src={CheckGreenIcon} alt="check green" />
              <span>${formatCurrency(1000000)}</span>
            </div>
            <p>
              <small>Transaction hash: </small>
              <small className={styles.txsDetail}>{getShortWallet("fca3...4aw8")}</small>
            </p>
            <p>
              <small>Block: </small>
              <small className={styles.txsDetail}>{123456789}</small>
            </p>
            <p>
              <small>From: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
            <p>
              <small>To: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
          </div>
        </Col>
        <Col span={24} sm={12} lg={6}>
          <div className={styles.item}>
            <div className={styles.priceValue}>
              <img className={styles.icon} src={CheckGreenIcon} alt="check green" />
              <span>${formatCurrency(1000000)}</span>
            </div>
            <p>
              <small>Transaction hash: </small>
              <small className={styles.txsDetail}>{getShortWallet("fca3...4aw8")}</small>
            </p>
            <p>
              <small>Block: </small>
              <small className={styles.txsDetail}>{123456789}</small>
            </p>
            <p>
              <small>From: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
            <p>
              <small>To: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
          </div>
        </Col>
        <Col span={24} sm={12} lg={6}>
          <div className={styles.item}>
            <div className={styles.priceValue}>
              <img className={styles.icon} src={CheckGreenIcon} alt="check green" />
              <span>${formatCurrency(1000000)}</span>
            </div>
            <p>
              <small>Transaction hash: </small>
              <small className={styles.txsDetail}>{getShortWallet("fca3...4aw8")}</small>
            </p>
            <p>
              <small>Block: </small>
              <small className={styles.txsDetail}>{123456789}</small>
            </p>
            <p>
              <small>From: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
            <p>
              <small>To: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
          </div>
        </Col>
        <Col span={24} sm={12} lg={6}>
          <div className={styles.item}>
            <div className={styles.priceValue}>
              <img className={styles.icon} src={CheckGreenIcon} alt="check green" />
              <span>${formatCurrency(1000000)}</span>
            </div>
            <p>
              <small>Transaction hash: </small>
              <small className={styles.txsDetail}>{getShortWallet("fca3...4aw8")}</small>
            </p>
            <p>
              <small>Block: </small>
              <small className={styles.txsDetail}>{123456789}</small>
            </p>
            <p>
              <small>From: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
            <p>
              <small>To: </small>
              <a href="https://fb.com" target="_blank" rel="noreferrer">
                <small>{getShortWallet("fa173...b098")}</small>
                <img src={BlankBlueIcon} alt="blank blue" />
              </a>
            </p>
          </div>
        </Col>
      </Row>
      <NavLink to={routers.BLOCK_LIST} className={styles.seemoreMobile}>
        <small>See All</small>
      </NavLink>
    </div>
  );
};

export default LatestTransactions;
