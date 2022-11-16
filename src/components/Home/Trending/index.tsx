import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import TransactionChart from './TransactionChart';

interface Props { }

const HomeTrending: React.FC<Props> = () => {

  return (
    <Row gutter={24}>
      <Col span={24} xl={12}>
        <TransactionChart />
      </Col>
      <Col span={24} xl={12}>
      </Col>
    </Row>
  )

}

export default HomeTrending;