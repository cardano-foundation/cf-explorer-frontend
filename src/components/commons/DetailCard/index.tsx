import { Col, Progress, Row, Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import blockImg from "../../../commons/resources/images/block.png";
import slotImg from "../../../commons/resources/images/slot.png";
import Card from "../Card";
import { routers } from "../../../commons/routers";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { Policy } from "../../../commons/resources";

interface DetailCardProps {
  listDetails: { title?: string; value: React.ReactNode }[];
  loading: boolean;
  progress?: {
    epoch: number;
    block: number;
    currentSlot: number;
  };
  tokenDetail?: {
    decimal: number;
    totalSupply: string;
  };
}

const DetailCard: React.FC<DetailCardProps> = ({ listDetails, progress, loading, tokenDetail }) => {
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

  const renderCard = () => {
    if (progress) {
      return (
        <>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#184C78",
              "100%": "#5A9C56",
            }}
            format={() => (
              <>
                <div className={styles.epoch}>{progress.epoch}</div>
                <div className={styles.epochTitle}>EPOCH</div>
              </>
            )}
            strokeWidth={6}
            width={200}
            percent={(progress.currentSlot / MAX_SLOT_EPOCH) * 100}
          />

          <div className={styles.progessInfo}>
            <div className={styles.row}>
              <img className={styles.img} src={blockImg} alt="Block Icon" />
              <div>
                <div className={styles.title}>Block</div>
                <Link
                  className={`${styles.fwBold} ${styles.link}`}
                  to={routers.BLOCK_DETAIL.replace(":blockId", `${progress.block}`)}
                >
                  {progress.block}
                </Link>
              </div>
            </div>
            <div className={styles.row}>
              <img className={styles.img} src={slotImg} alt="Slot Icon" />
              <div>
                <div className={styles.title}>Slot</div>
                <div>
                  <span className={styles.fwBold}>{progress.currentSlot}</span> / {MAX_SLOT_EPOCH}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (tokenDetail) {
      return (
        <div className={styles.token}>
          <div className={styles.policy}>
            <img src={Policy} alt="Policy Script Icon" />
            <h3>Policy Script</h3>
          </div>
          <div className={styles.bridgeInfo}>
            <div>
              <span className={styles.title}>WETH</span>
              <span className={styles.details}>Wrapped ether bridged through Nomda</span>
            </div>
            <img src={infoIcon} alt="info" />
          </div>
          <div className={styles.tokenInfo}>
            <div className={styles.tokenWrapper}>
              <span className={styles.title}>Total Supply</span>
              <span className={styles.details}>{tokenDetail.totalSupply}</span>
            </div>
            <div className={`${styles.tokenWrapper} ${styles.borderLeft} ${styles.pl15}`}>
              <span className={styles.title}>Decimal</span>
              <span className={styles.details}>{tokenDetail.decimal}</span>
            </div>
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <Row className={styles.wrapper} gutter={[16, 16]}>
      <Col span={24} xl={14}>
        <Card className={styles.info}>
          {listDetails.map((item, idx) => (
            <div key={idx} className={styles.detailItem}>
              {item.title ? (
                <>
                  <img src={infoIcon} alt="info" className={styles.img} />
                  <div className={styles.row}>
                    <div style={{ minWidth: 150 }}>{item.title}:</div>
                    <div className={` ${styles.fwBold} ${styles.value}`}>{item.value}</div>
                  </div>
                </>
              ) : (
                <>{item.value}</>
              )}
            </div>
          ))}
        </Card>
      </Col>
      <Col span={24} xl={10}>
        <Card className={styles.progress}>{renderCard()}</Card>
      </Col>
    </Row>
  );
};

export default DetailCard;
