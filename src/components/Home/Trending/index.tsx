import { Col, Row } from "antd";
import React from "react";
import styles from "./index.module.scss";
import TransactionChart from "./TransactionChart";
import ComingSoon from "./ComingSoon";

interface Props {}

const HomeTrending: React.FC<Props> = () => {
  return (
    <Row gutter={15} className={styles.trending}>
      <Col span={24} xl={12} style={{ height: "100%" }}>
        <TransactionChart />
      </Col>
      <Col span={24} xl={8} style={{ height: "100%" }}>
        <ComingSoon />
      </Col>
    </Row>
  );
};

export default HomeTrending;
