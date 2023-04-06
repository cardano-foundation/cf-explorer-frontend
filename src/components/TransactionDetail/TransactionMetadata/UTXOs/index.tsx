import React from "react";
import { Link } from "react-router-dom";
import { alpha, Box } from "@mui/material";
import { getShortWallet, formatADAFull, getShortHash } from "../../../../commons/utils/helper";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import feeImg from "../../../../commons/resources/images/dola.svg";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { details } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Header, Img, Item, TokenLink } from "./styles";
import ADAicon from "../../../commons/ADAIcon";

interface Props {
  data: Transaction["utxOs"] | null;
  fee: number;
}

const UTXO: React.FC<Props> = ({ data, fee }) => {
  return (
    <div>
      <Card type="down" items={data?.inputs} />
      <Card type="up" items={data?.outputs} fee={fee} />
    </div>
  );
};

export default UTXO;

const Card = ({
  type,
  items,
  fee,
}: {
  type: "up" | "down";
  items?: Required<Transaction>["utxOs"]["inputs"];
  fee?: number;
}) => {
  const totalADA =
    items &&
    items.reduce((prv, item) => {
      return prv + item.value;
    }, 0);

  return (
    <Box textAlign={"left"} mb={1} sx={{ background: theme => theme.palette.background.paper }}>
      <Header>
        <Box color={theme => theme.palette.text.hint} fontWeight="bold">
          <Box color={theme => theme.palette.text.dark} fontSize={"1rem"} mb="3px">
            {type === "down" ? "Input" : "Output"}
          </Box>
          Wallet Addresses
        </Box>
        <Box color={theme => theme.palette.text.hint} fontWeight="bold">
          Amount
        </Box>
      </Header>
      <Box>
        {items?.map(item => (
          <Item key={item.address}>
            <Box display={"flex"}>
              <Box width={50}>
                <Img src={type === "down" ? receiveImg : sendImg} alt="send icon" />
              </Box>
              <Box width={"100%"} display="flex" flexDirection="column" justifyContent="center" paddingTop="5px">
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
                      <Link to={details.address(item.address)}>
                        <CustomTooltip title={item.address}>
                          <Box
                            color={theme => theme.palette.secondary.main}
                            fontWeight="bold"
                            fontFamily={"var(--font-family-text)"}
                          >
                            {getShortWallet(item.address)}
                          </Box>
                        </CustomTooltip>
                      </Link>{" "}
                      <CopyButton text={item.address} />
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
                        color={theme => (type === "up" ? theme.palette.primary.main : theme.palette.error.main)}
                        fontWeight="bold"
                        mr={1}
                      >
                        {type === "down" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                      </Box>
                      <ADAicon />
                    </Box>
                  </Box>
                </Box>
                <Box justifyContent={"space-between"} width={"100%"} display="flex" paddingTop="5px">
                  <Box mr={3} minWidth={200}>
                    {type === "down" && (
                      <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                        <Link to={details.transaction(item.txHash)}>
                          <CustomTooltip title={item.txHash}>
                            <Box
                              component={"span"}
                              fontWeight="bold"
                              fontFamily={"var(--font-family-text)"}
                              color={theme => theme.palette.secondary.main}
                              mr={1}
                            >
                              {getShortHash(item.txHash)}
                            </Box>
                          </CustomTooltip>
                        </Link>
                        <CopyButton text={item.txHash} />
                      </Box>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems="center" justifyContent={"space-between"}>
                    <Box overflow={"hidden"} display="flex" flexWrap={"wrap"} gap={1}>
                      {item.tokens.map((token, idx) => (
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
          </Item>
        ))}
        {type === "up" && (
          <Item>
            <Box width={"100%"} display="flex" justifyContent={"space-between"} alignItems="center">
              <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                <Box display={"flex"} alignItems="center">
                  <Img src={feeImg} alt="wallet icon" />
                  <Box>Fee</Box>
                </Box>
              </Box>
              <Box display={"flex"} alignItems="center">
                <Box mr="8px" fontWeight={"bold"} fontFamily={"var(--font-family-text)"} color="red">
                  {formatADAFull(fee)}
                </Box>
                <Box>
                  <ADAicon />
                </Box>
              </Box>
            </Box>
          </Item>
        )}
      </Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        padding={"12px 25px"}
        sx={{ background: theme => theme.palette.green[800_10] }}
      >
        <Box fontWeight={"bold"}>Total {type === "down" ? "Input" : "Output"}</Box>
        <div>
          <Box fontWeight={"bold"} component="span" pr={1}>
            {type === "down" ? `${formatADAFull(totalADA)}` : `${formatADAFull(totalADA)}`}
          </Box>
          <ADAicon />
        </div>
      </Box>
    </Box>
  );
};
