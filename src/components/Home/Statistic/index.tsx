import { Col, Row } from 'antd';
import React from 'react';
import useFetch from '../../../commons/hooks/useFetch';
import { AdaPriceIcon, CurentEpochIcon, MarketCapIcon, TotalADAStakeIcon } from '../../../commons/resources';
import { formatCurrency, formatPrice } from '../../../commons/utils/helper';
import styles from './index.module.scss';

interface Props { }
interface Statistic {
  id: string;
  data: any
}

const HomeStatistic: React.FC<Props> = () => {
  const { data } = useFetch<Statistic>("tx/list");
  console.log(data)
  return (
    <div className={styles.statistic}>
      <Row gutter={24}>
        <Col span={24} sm={12} xl={6}>
          <div className={styles.box}>
            <img src={AdaPriceIcon} alt="Ada Price" />
            <h4>Ada Price</h4>
            <Row className={styles.content}>
              <Col span={24}>
                <h3>$0.4607</h3>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} sm={12} xl={6}>
          <div className={styles.box}>
            <img src={MarketCapIcon} alt="Market cap" />
            <h4>Market cap</h4>
            <Row className={styles.content}>
              <Col span={24}>
                <h3>${formatCurrency(15592559326)}</h3>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} sm={12} xl={6}>
          <div className={styles.box}>
            <img src={CurentEpochIcon} alt="Curent Epoch" />
            <h4>Curent Epoch</h4>
            <Row gutter={8} className={styles.content}>
              <Col span={12}>
                <div className={styles.leftLeft}>Epoch</div>
                <h3>361</h3>
              </Col>
              <Col span={12} className={styles.textRight}>
                <div>Slot</div>
                <div>325120/432000</div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} sm={12} xl={6}>
          <div className={styles.box}>
            <img src={TotalADAStakeIcon} alt="Total ADA Stake" />
            <h4>Total ADA Stake</h4>
            <Row className={styles.content}>
              <Col span={24}>
                <h3>{formatPrice(24770000000)}</h3>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )

}

export default HomeStatistic;