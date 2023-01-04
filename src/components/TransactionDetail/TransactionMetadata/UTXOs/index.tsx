import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { getShortWallet, formatADA, getShortHash } from "../../../../commons/utils/helper";
import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import feeImg from "../../../../commons/resources/images/dola.svg";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Header, Img, LabelStatus } from "./conmponent";

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
    <Box textAlign={"left"} mb={1} style={{ background: "#fff" }}>
      <Header>
        <div>
          <Box color={"black"} fontWeight="bold" fontSize={"1rem"}>
            {type === "down" ? "Input" : "Output"}
          </Box>
          Wallet Addresses
        </div>
        <div>Amount</div>
      </Header>
      {item &&
        item.map((i, ii) => (
          <Box textAlign={"left"} padding="10px 25px" borderBottom={"1px solid #0000001a"} key={ii}>
            <Box display={"flex"} alignItems="center">
              <Box width={50}>
                <Img src={type === "down" ? receiveImg : sendImg} alt="send icon" />
              </Box>
              <Box width={"100%"}>
                <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                  <Box display={"flex"} alignItems="center" justifyContent={"flex-start"} pr={1}>
                    {type === "down" ? "From" : "To"}:
                  </Box>
                  <Box display={"flex"} justifyContent="space-between" flex={"1"} alignItems={"center"}>
                    <Box
                      display={"flex"}
                      justifyContent="flex-start"
                      alignItems={"center"}
                      flexWrap="nowrap"
                      width={"auto"}
                    >
                      <Link to={routers.ADDRESS_DETAIL.replace(":address", i.address)}>
                        <CustomTooltip title={i.address} placement="top">
                          <Box color={props => props.colorBlue} fontWeight="bold" className={styles.ffText}>
                            {getShortWallet(i.address)}
                          </Box>
                        </CustomTooltip>
                      </Link>{" "}
                      <CopyButton text={i.address} className={styles.icon} />
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent="flex-start"
                      alignItems={"center"}
                      flexWrap="nowrap"
                      width={"auto"}
                    >
                      <Box
                        component={"span"}
                        whiteSpace="nowrap"
                        color={props => (type === "up" ? props.colorGreenLight : props.colorRed)}
                        fontWeight="bold"
                        mr={1}
                      >
                        {type === "down" ? `${formatADA(i.value)}` : `${formatADA(i.value)}`}
                      </Box>
                      <img src={AIcon} alt="ADA icon" />
                    </Box>
                  </Box>
                </Box>
                <Box justifyContent={"space-between"} alignItems="center" width={"100%"} display="flex">
                  {type === "down" && (
                    <Box mr={3}>
                      <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                        <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", i.txHash)}>
                          <CustomTooltip title={i.txHash} placement="top">
                            <Box
                              component={"span"}
                              fontWeight="bold"
                              className={styles.ffText}
                              color={props => props.colorBlue}
                              mr={1}
                            >
                              {getShortHash(i.txHash)}
                            </Box>
                          </CustomTooltip>
                        </Link>
                        <CopyButton text={i.txHash} />
                      </Box>
                    </Box>
                  )}
                  <Box display={"flex"} alignItems="center" justifyContent={"space-between"}>
                    <Box overflow={"hidden"} display="flex" flexWrap={"wrap"} gap={1}>
                      {i.tokens.map((token, idx) => (
                        <Box
                          key={idx}
                          display="flex"
                          justifyContent={"flex-start"}
                          alignItems="center"
                          flexWrap={"nowrap"}
                          width="auto"
                        >
                          <LabelStatus>{token.assetName}</LabelStatus>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      {type === "up" && (
        <Box textAlign={"left"} padding="10px 25px" borderBottom={"1px solid #0000001a"}>
          <Box width={"100%"} display="flex" justifyContent={"space-between"} alignItems="center">
            <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
              <Box display={"flex"} alignItems="center">
                <Img src={feeImg} alt="wallet icon" />
                <Box>Fee</Box>
              </Box>
            </Box>
            <Box display={"flex"} alignItems="center">
              <Box mr="8px" fontWeight={"bold"} className={`${styles.ffText}`} color="red">
                {formatADA(fee)}
              </Box>
              <Box>
                <img src={AIcon} alt="ADA icon" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Box display={"flex"} justifyContent="space-between" padding={"12px 25px"} style={{ background: "#dedede" }}>
        <div>Total {type === "down" ? "Input" : "Output"}</div>
        <div>
          <Box fontWeight={"bold"} component="span" pr={1}>
            {type === "down" ? `${formatADA(totalADA)}` : `${formatADA(totalADA)}`}
          </Box>
          <img src={AIcon} alt="ADA icon" />
        </div>
      </Box>
    </Box>
  );
};
