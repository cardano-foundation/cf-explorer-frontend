import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { useCopyToClipboard } from "react-use";

import { getShortWallet, formatADA, getShortHash } from "../../../../commons/utils/helper";

import styles from "./index.module.scss";
import walletImg from "../../../../commons/resources/images/Wallet.png";
import sendImg from "../../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../../commons/resources/images/summary-down.png";
import feeImg from "../../../../commons/resources/images/fee.png";
import { BiCheckCircle } from "react-icons/bi";
import { AIcon } from "../../../../commons/resources";
import { Link } from "react-router-dom";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import { Tooltip } from "antd";

interface Props {
  data: Transaction["utxOs"] | null;
  fee: number;
}

const UTXO: React.FC<Props> = ({ data, fee }) => {
  return (
    <div>
      <Card type="down" item={data?.inputs} />
      <Card type="up" item={data?.outputs} fee={fee} />
    </div>
  );
};

export default UTXO;

const Card = ({
  type,
  item,
  fee,
}: {
  type: "up" | "down";
  item?: Required<Transaction>["utxOs"]["inputs"];
  fee?: number;
}) => {
  const totalADA =
    item &&
    item.reduce((prv, i) => {
      return prv + i.value;
    }, fee || 0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div className={styles.type}>{type === "down" ? "Input" : "Output"}</div>Wallet Addresses
        </div>
        <div>Amount</div>
      </div>
      {item &&
        item.map((i, ii) => (
          <>
            <div className={styles.item} key={ii}>
              <div className={styles.transfer}>
                <div className={styles.wallet}>
                  <img className={styles.img} src={walletImg} alt="wallet icon" />
                  {type === "down" ? "From" : "To"}:
                </div>
                <div className={styles.transferInfo}>
                  <div className={styles.transferAddress}>
                    <Link to={routers.ADDRESS_DETAIL.replace(":address", i.address)} className={styles.address}>
                      <Tooltip title={i.address} placement="top">
                        {getShortWallet(i.address)}
                      </Tooltip>
                    </Link>{" "}
                    <CopyButton text={i.address} className={styles.icon} />
                  </div>
                  <div className={styles.transferValue}>
                    <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
                      {type === "down" ? `- ${formatADA(i.value)}` : `+ ${formatADA(i.value)}`}
                    </span>
                    <img src={AIcon} alt="ADA icon" />
                  </div>
                </div>
              </div>
              <div className={styles.transfer}>
                {type === "down" && (
                  <div className={styles.transferInfo}>
                    <div className={styles.transferHash}>
                      <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
                      <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", i.txHash)} className={styles.txHash}>
                        <Tooltip title={i.txHash} placement="top">
                          <span className={styles.txHashDesktop}>{i.txHash}</span>
                          <span className={styles.txHashMobile}>{getShortHash(i.txHash)}</span>
                        </Tooltip>
                      </Link>
                      <CopyButton text={i.txHash} className={styles.icon} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
      {type === "up" && (
        <div className={styles.item}>
          <div className={styles.transfer}>
            <div className={styles.transferInfo}>
              <img className={styles.img} src={feeImg} alt="wallet icon" />
              <div>Fee</div>
            </div>
            <div>
              <span className={`${styles.address} ${styles.up}`}>{formatADA(fee)}</span>
              <img src={AIcon} alt="ADA icon" />
            </div>
          </div>
          <div className={`${styles.paddingTop} ${styles.transfer}`}></div>
        </div>
      )}
      <div className={styles.footer}>
        <div>Total {type === "down" ? "Input" : "Output"}</div>
        <div>
          <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `- ${formatADA(totalADA)}` : `+ ${formatADA(totalADA)}`}
          </span>
          <img src={AIcon} alt="ADA icon" />
        </div>
      </div>
    </div>
  );
};
