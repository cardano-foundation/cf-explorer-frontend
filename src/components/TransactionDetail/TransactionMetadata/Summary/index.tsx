import React from "react";
import { Box, Tooltip } from "@mui/material";

import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import messageImg from "../../../../commons/resources/images/messageImg.svg";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import { Link } from "react-router-dom";

const SummaryItems = ({
  item,
  type,
}: {
  item: Transaction["summary"]["stakeAddressTxInputs"][number];
  type?: "up" | "down";
}) => {
  return (
    <div className={styles.item}>
      <Box display={"flex"} alignItems="center">
        <Box width={50}>
          <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
        </Box>
        <Box>
          <div className={styles.top}>
            <div className={styles.transfer}>
              <div className={styles.wallet}>{type === "down" ? "From" : "To"}: </div>
              <div className={styles.transferInfo}>
                <div className={styles.transferAddress}>
                  <Link to={routers.ADDRESS_DETAIL.replace(":address", item.address)} className={styles.address}>
                    <Tooltip title={item.address} placement="top">
                      <div> {getShortWallet(item.address)}</div>
                    </Tooltip>
                  </Link>
                  <CopyButton text={item.address} className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.transfer} ${styles.nowrap}`}>
            <div className={styles.wallet}>ADA sent: </div>
            <div className={styles.transferInfo}>
              <div className={styles.transferAddress}>
                <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
                  {type === "down" ? `-${formatADA(item.value)}` : `+${formatADA(item.value)}`}
                </span>
                <img src={AIcon} alt="ADA icon" />
              </div>
            </div>
          </div>
          {item.tokens && (
            <Box className={`${styles.transfer} ${styles.nowrap}`}>
              <Box>
                <div className={styles.wallet}>Token received: </div>
              </Box>
              <div className={styles.transferInfo}>
                <Box overflow={"hidden"} display="flex" ml={3} flexWrap={"wrap"}>
                  {item.tokens.map((token, idx) => (
                    <div key={idx} className={styles.transferValue}>
                      <h4 className={`${styles.status} ${styles.yellow} ${styles.ml10}`}>{token.assetName}</h4>
                    </div>
                  ))}
                </Box>
              </div>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

interface SummaryProps {
  data: Transaction["summary"] | null;
}
const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <div>
      {data?.stakeAddressTxInputs.map((tx, key) => (
        <SummaryItems key={key} item={tx} type="down" />
      ))}
      {data?.stakeAddressTxOutputs.map((tx, key) => (
        <SummaryItems key={key} item={tx} type="up" />
      ))}

      <div className={styles.item}>
        <Box display={"flex"} alignItems="center" py={2}>
          <Box width={50}>
            <img className={styles.img} src={messageImg} alt="wallet icon" />
          </Box>
          <Box className={`${styles.bottom} ${styles.textMessage}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi magni neque esse libero commodi. Facere
            quis deserunt et nihil itaque quisquam in mollitia.
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Summary;
