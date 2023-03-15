import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { getShortWallet, formatADAFull, getShortHash } from "../../../../commons/utils/helper";
import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import feeImg from "../../../../commons/resources/images/dola.svg";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { details } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Header, Img, TokenLink } from "./conmponent";

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
    }, 0);

  return (
    <Box textAlign={"left"} mb={1} style={{ background: "#fff" }}>
      <Header>
        <Box color={"#98A2B3"} fontWeight="bold">
          <Box color={"black"} fontSize={"1rem"} mb={1}>
            {type === "down" ? "Input" : "Output"}
          </Box>
          Wallet Addresses
        </Box>
        <Box color={"#98A2B3"} fontWeight="bold">
          Amount
        </Box>
      </Header>
      {item &&
        item.map((i, ii) => (
          <Box textAlign={"left"} padding="10px 0" mx={"25px"} borderBottom={"1px solid #0000001a"} key={ii}>
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
                      <Link to={details.address(i.address)}>
                        <CustomTooltip title={i.address}>
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
                        {type === "down" ? `-${formatADAFull(i.value)}` : `+${formatADAFull(i.value)}`}
                      </Box>
                      <img src={AIcon} alt="ADA icon" />
                    </Box>
                  </Box>
                </Box>
                <Box justifyContent={"space-between"} alignItems="center" width={"100%"} display="flex">
                  {type === "down" && (
                    <Box mr={3}>
                      <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                        <Link to={details.transaction(i.txHash)}>
                          <CustomTooltip title={i.txHash}>
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
                          <TokenLink to={details.token(token.assetId)}>
                            {token.assetName || getShortWallet(token.assetId)}
                          </TokenLink>
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
                {formatADAFull(fee)}
              </Box>
              <Box>
                <img src={AIcon} alt="ADA icon" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Box display={"flex"} justifyContent="space-between" padding={"12px 25px"} style={{ background: "#dedede" }}>
        <Box fontWeight={"bold"}>Total {type === "down" ? "Input" : "Output"}</Box>
        <div>
          <Box fontWeight={"bold"} component="span" pr={1}>
            {type === "down" ? `${formatADAFull(totalADA)}` : `${formatADAFull(totalADA)}`}
          </Box>
          <img src={AIcon} alt="ADA icon" />
        </div>
      </Box>
    </Box>
  );
};
