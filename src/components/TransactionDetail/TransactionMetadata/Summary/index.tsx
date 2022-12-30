import React from "react";
import { Box } from "@mui/material";
import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import messageImg from "../../../../commons/resources/images/messageImg.svg";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import { Link } from "react-router-dom";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Icon, Img, LabelStatus } from "./component";

const SummaryItems = ({
  item,
  type,
}: {
  item: Transaction["summary"]["stakeAddressTxInputs"][number];
  type?: "up" | "down";
}) => {
  return (
    <Box textAlign={"left"} px={3} py={2} style={{ background: "#fff" }} mb={2}>
      <Box display={"flex"} alignItems="center">
        <Box width={50}>
          <Icon src={type === "down" ? receiveImg : sendImg} alt="send icon" />
        </Box>
        <Box>
          <Box display={"flex"} alignItems="center" justifyContent={"flex-start"}>
            <Box width={"100%"} display="flex" alignItems={"center"} justifyContent="center" flexWrap={"wrap"}>
              <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} pr={1} mb={1}>
                {type === "down" ? "From" : "To"}:{" "}
              </Box>
              <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} flex={1} mb={1}>
                <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} flexWrap={"nowrap"}>
                  <Link to={routers.ADDRESS_DETAIL.replace(":address", item.address)}>
                    <CustomTooltip title={item.address} placement="top">
                      <Box color={props => props.colorBlue} fontWeight="bold" className={styles.ffText}>
                        {getShortWallet(item.address)}
                      </Box>
                    </CustomTooltip>
                  </Link>
                  <CopyButton text={item.address} style={{ cursor: "pointer", verticalAlign: "text-bottom" }} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} alignItems="center" justifyContent={"space-between"} width="100%" mb={1}>
            <Box display="flex" justifyContent={"space-between"} alignItems="center" pr={1}>
              ADA sent:{" "}
            </Box>
            <Box flex={1} display="flex" justifyContent={"space-between"} alignItems="center">
              <Box>
                <Box
                  component={"span"}
                  whiteSpace="nowrap"
                  color={props => (type === "up" ? props.colorGreenLight : props.colorRed)}
                  fontWeight="bold"
                  mr={1}
                >
                  {type === "down" ? `-${formatADA(item.value)}` : `+${formatADA(item.value)}`}
                </Box>
                <img src={AIcon} alt="ADA icon" />
              </Box>
            </Box>
          </Box>
          {item.tokens && (
            <Box display={"flex"} alignItems="center" flexWrap={"wrap"}>
              <Box component={"span"}>Token received: </Box>

              {item.tokens.map((token, idx) => (
                <Box key={idx} width="auto" component={"span"}>
                  <LabelStatus>{token.assetName}</LabelStatus>
                </Box>
              ))}
              {/* </Box> */}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface SummaryProps {
  data: Transaction["summary"] | null;
}
const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <Box>
      {data?.stakeAddressTxInputs.map((tx, key) => (
        <SummaryItems key={key} item={tx} type="down" />
      ))}
      {data?.stakeAddressTxOutputs.map((tx, key) => (
        <SummaryItems key={key} item={tx} type="up" />
      ))}

      <Box textAlign={"left"} px={3} py={2} style={{ background: "#fff" }} mb={2}>
        <Box display={"flex"} alignItems="center" py={2}>
          <Box width={50}>
            <Img src={messageImg} width="38px" alt="wallet icon" />
          </Box>
          <Box fontWeight={"bold"} maxWidth="700px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi magni neque esse libero commodi. Facere
            quis deserunt et nihil itaque quisquam in mollitia.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
