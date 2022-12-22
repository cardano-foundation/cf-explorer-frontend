import React from "react";
import { Link } from "react-router-dom";
import { Box  } from "@mui/material";
import { getShortWallet, formatADA, getShortHash } from "../../../../commons/utils/helper";
import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import feeImg from "../../../../commons/resources/images/dola.svg";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";

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
  console.log("🚀 ~ file: index.tsx:41 ~ item", item);
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
          <div className={styles.item} key={ii}>
            <Box display={"flex"} alignItems="center">
              <Box width={50}>
                <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
              </Box>
              <Box width={"100%"}>
                <div className={styles.transfer}>
                  <div className={styles.wallet}>{type === "down" ? "From" : "To"}:</div>
                  <div className={styles.transferInfoTop}>
                    <div className={styles.transferAddress}>
                      <Link to={routers.ADDRESS_DETAIL.replace(":address", i.address)} className={styles.address}>
                        <CustomTooltip title={i.address} placement="top">
                          <div> {getShortWallet(i.address)}</div>
                        </CustomTooltip>
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
                <Box className={styles.transfer} display="flex">
                  {type === "down" && (
                    <Box mr={3} className={styles.transferInfo}>
                      <div className={styles.transferHash}>
                        <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", i.txHash)} className={styles.txHash}>
                          <CustomTooltip title={i.txHash} placement="top">
                            <div>
                              <Box component={"span"} fontWeight="bold">
                                {getShortHash(i.txHash)}
                              </Box>
                            </div>
                          </CustomTooltip>
                        </Link>
                        <CopyButton text={i.txHash} className={styles.icon} />
                      </div>
                    </Box>
                  )}
                  <div className={styles.transferInfo}>
                    <Box overflow={"hidden"} display="flex" gap={1} flexWrap={"wrap"}>
                      {i.tokens.map((token, idx) => (
                        <div key={idx} className={styles.transferValue}>
                          <h4 className={`${styles.status} ${styles.yellow} `}>{token.assetName}</h4>
                        </div>
                      ))}
                    </Box>
                  </div>
                </Box>
              </Box>
            </Box>
          </div>
        ))}
      {type === "up" && (
        <div className={styles.item}>
          <div className={styles.transfer}>
            <div className={styles.transferInfo}>
              <Box display={"flex"} alignItems="center">
                <img className={styles.img} src={feeImg} alt="wallet icon" />
                <Box>Fee</Box>
              </Box>
            </div>
            <Box display={"flex"} alignItems="center">
              <Box mr="8px" className={`${styles.address} ${styles.up}`}>
                {formatADA(fee)}
              </Box>
              <Box>
                <img src={AIcon} alt="ADA icon" />
              </Box>
            </Box>
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
