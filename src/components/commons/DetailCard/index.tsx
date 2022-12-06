import React from "react";
import { Progress } from "antd";
import { Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";

import styles from "./index.module.scss";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import blockImg from "../../../commons/resources/images/block.png";
import slotImg from "../../../commons/resources/images/slot.png";
import Card from "../Card";
import { routers } from "../../../commons/routers";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { Policy } from "../../../commons/resources";
import { numberWithCommas } from "../../../commons/utils/helper";
import ProgressCircle from "../ProgressCircle";

interface DetailCardProps {
  listDetails: { title?: string; value: React.ReactNode }[];
  loading: boolean;
  progress?: {
    epoch: number;
    block: number;
    currentSlot: number;
    gradientId?: string;
  };
  delegationPools?: {
    poolSize: React.ReactNode;
    stakeLimit: React.ReactNode;
    delegators: number;
    satulation: number;
  };
  tokenDetail?: {
    decimal: number;
    totalSupply: number;
  };
}

const DetailCard: React.FC<DetailCardProps> = ({ listDetails, progress, loading, tokenDetail, delegationPools }) => {
  if (loading) {
    return (
      <Grid container className={styles.wrapper} spacing={2}>
        <Grid item md={7} xs={12}>
          <Skeleton className={styles.skeleton} variant="rectangular" />
        </Grid>
        <Grid item md={5} xs={12}>
          <Skeleton className={styles.skeleton} variant="rectangular" />
        </Grid>
      </Grid>
    );
  }
  const renderCard = () => {
    if (progress) {
      return (
        <>
          <ProgressCircle percent={(progress.currentSlot / MAX_SLOT_EPOCH) * 100}>
            <>
              <div className={styles.epoch}>{progress.epoch}</div>
              <div className={styles.epochTitle}>EPOCH</div>
            </>
          </ProgressCircle>

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

    if (delegationPools) {
      return (
        <div className={styles.delegation}>
          {Object.keys(delegationPools).map((k, i) => {
            return (
              <div className={styles.detailItem} key={i}>
                <div>
                  <img src={infoIcon} alt="info" className={styles.img} />
                </div>
                <div className={styles.row}>
                  <div style={{ minWidth: 100 }}>
                    {delegationPoolsTitle[k as keyof Required<DetailCardProps>["delegationPools"]] || 0}:
                  </div>
                  <div className={` ${styles.fwBold} ${styles.value}`}>
                    {delegationPools[k as keyof Required<DetailCardProps>["delegationPools"]] || 0}
                  </div>
                </div>
              </div>
            );
          })}
          <div className={styles.fullWidth}>
            {/* <ProgressCircle percent={+delegationPools.satulation} /> */}

            <Progress
              strokeColor={{
                "0%": "#184C78",
                "100%": "#5A9C56",
              }}
              strokeWidth={10}
              percent={+delegationPools.satulation}
              status="active"
              showInfo={false}
            />
          </div>
        </div>
      );
    }
    if (tokenDetail) {
      return (
        <div className={styles.token}>
          <div className={styles.policy}>
            <img src={Policy} alt="Policy Script Icon" />
            <h3>Policy Script</h3>
          </div>
          {/* TODO - add behavior */}
          <button className={styles.bridgeInfo}>
            <div>
              <span className={styles.title}>WETH</span>
              <span className={styles.details}>Wrapped ether bridged through Nomda</span>
            </div>
            <img src={infoIcon} alt="info" />
          </button>
          <div className={styles.tokenInfo}>
            <div className={styles.tokenWrapper}>
              <span className={styles.title}>Total Supply</span>
              <span className={styles.details}>{numberWithCommas(tokenDetail.totalSupply)}</span>
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
    <Grid container className={styles.wrapper} spacing={2}>
      <Grid item md={7} xs={12}>
        <Card className={styles.info}>
          {listDetails.map((item, idx) => (
            <div className={styles.detailItem} key={idx}>
              {item.title ? (
                <>
                  <div>
                    <img src={infoIcon} alt="info" className={styles.img} />
                  </div>
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
      </Grid>
      <Grid item md={5} xs={12}>
        <Card className={styles.progress}>{renderCard()}</Card>
      </Grid>
    </Grid>
  );
};

export default DetailCard;

const delegationPoolsTitle = {
  poolSize: "Pool size",
  stakeLimit: "Stake limit",
  delegators: "Delegators",
  satulation: "Saturation",
};
