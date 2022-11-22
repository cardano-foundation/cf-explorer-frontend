import { Col, Input, Progress, Row } from "antd";
import Card from "../../components/commons/Card";

import styles from "./index.module.scss";
import rocketImg from "../../commons/resources/images/rocket.png";
import moneyImg from "../../commons/resources/images/money.png";
import searchImg from "../../commons/resources/images/search.png";
import useFetch from "../../commons/hooks/useFetch";
import { formatADA, numberWithCommas } from "../../commons/utils/helper";

const Delegations = () => {
  const { data: overviews } = useFetch<OverViewDelegation>("/delegation/header");
  return (
    <div className={styles.container}>
      <Card title="Delegation Pools Explorer" className={styles.wrapper}>
        <OverViews data={overviews} />
      </Card>
      <div className={styles.search}>
        <div className={styles.group}>
          <Input
            className={styles.input}
            size="large"
            placeholder="Search transaction, address, block, epoch, pool..."
            prefix={<img src={searchImg} alt="search icon" />}
          />
          <button className={styles.button}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Delegations;

interface OverViewProps {
  data: OverViewDelegation | null;
}

const OverViews: React.FC<OverViewProps> = ({ data }) => {
  return (
    <Row gutter={[10, 10]}>
      <Col className="gutter-row" span={24} md={12} xl={8}>
        <div className={styles.card}>
          <div>
            <div className={styles.title}>Epoch</div>
            <div className={styles.subtitle}>
              {/* To Do */}
              End in: <span className={styles.value}>1 day 19 hours 29 minutes</span>
            </div>
          </div>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#184C78",
              "100%": "#5A9C56",
            }}
            format={() => (
              <>
                <div className={styles.epochTitle}>{data?.epochNo || 0} </div>
              </>
            )}
            strokeWidth={6}
            width={96}
            percent={80}
          />
        </div>
      </Col>
      <Col className="gutter-row" span={24} md={12} xl={8}>
        <div className={styles.card}>
          <div style={{ width: "80%" }}>
            <div className={styles.title}>Slot</div>
            <div className={styles.subtitle}>
              {" "}
              <span className={styles.value}>{data?.epochSlotNo || 0} / </span>432000
            </div>
            <Progress
              type="line"
              strokeColor={{
                "0%": "#184C78",
                "100%": "#5A9C56",
              }}
              strokeWidth={8}
              width={200}
              percent={80}
              format={(p, c) => ""}
            />
          </div>
          <div>
            <img src={rocketImg} alt="rocket icon" />
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={24} md={12} xl={8}>
        <div className={styles.card}>
          {" "}
          <div>
            <div className={styles.title}>
              Live Stake: <span className={styles.value}>{formatADA(data?.liveStake)}</span>
            </div>
            <div className={styles.title}>
              Delegators: <span className={styles.value}> {numberWithCommas(data?.delegators || 0)}</span>
            </div>
          </div>
          <div>
            <img src={moneyImg} alt="money icon" />
          </div>
        </div>
      </Col>
    </Row>
  );
};
