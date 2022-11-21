import { Col, Progress, Row, Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import blockImg from "../../../commons/resources/images/block.png";
import slotImg from "../../../commons/resources/images/slot.png";
import Card from "../Card";

interface DetailCardProps {
  listDetails: { title?: string; value: React.ReactNode }[];
  progress: {
    epoch: number;
    block: number;
    currentSlot: number;
  };
  loading: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({ listDetails, progress, loading }) => {
  if (loading) {
    return (
      <Row className={styles.wrapper} gutter={[16, 16]}>
        <Col span={24} xl={14}>
          <Skeleton.Input active block className={styles.skeleton} />
        </Col>
        <Col span={24} xl={10}>
          <Skeleton.Input active className={styles.skeleton} block />
        </Col>
      </Row>
    );
  }
  return (
    <Row className={styles.wrapper} gutter={[16, 16]}>
      <Col span={24} xl={14}>
        <Card className={styles.info}>
          <div style={{ width: "100%" }}>
            {listDetails.map((item, idx) => (
              <div className={styles.detailItem} key={idx}>
                {item.title ? (
                  <>
                    <div>
                      <img src={infoIcon} alt="info" className={styles.img} />
                    </div>
                    <div className={styles.row}>
                      <div style={{ minWidth: 150 }}>{item.title}</div>:
                      <div className={` ${styles.fwBold} ${styles.value}`}>{item.value}</div>
                    </div>
                  </>
                ) : (
                  <>{item.value}</>
                )}
              </div>
            ))}
          </div>
        </Card>
      </Col>
      <Col span={24} xl={10}>
        <Card className={styles.progress}>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#184C78",
              "100%": "#5A9C56",
            }}
            format={() => (
              <>
                <div className={styles.epoch}>{progress.epoch} </div>
                <div className={styles.epochTitle}>EPOCH </div>
              </>
            )}
            strokeWidth={6}
            width={200}
            percent={(progress.currentSlot / 432000) * 100}
          />

          <div className={styles.progessInfo}>
            <div className={styles.row}>
              <div>
                <img className={styles.img} src={blockImg} alt="Block Icon" />
              </div>
              <div>
                <div className={styles.title}>Block</div>
                <Link className={`${styles.fwBold} ${styles.link}`} to="#">
                  {progress.block}
                </Link>
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <img className={styles.img} src={slotImg} alt="Slot Icon" />
              </div>
              <div>
                <div className={styles.title}>Slot</div>
                <div>
                  <span className={styles.fwBold}>{progress.currentSlot}</span>/ 432000
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailCard;
