import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash, getShortWallet } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";

import { Header, Img, Item, ItemContent, ItemFooter, WrapInfo, WrapUTXOs } from "./styles";

interface Props {
  data: Transaction["utxOs"] | null;
  fee: number;
  isFailed?: boolean;
}

const UTXO: React.FC<Props> = ({ data, fee, isFailed }) => {
  return (
    <div>
      <Card type="down" items={data?.inputs} isFailed={isFailed} />
      <Card type="up" items={data?.outputs} fee={fee} isFailed={isFailed} />
    </div>
  );
};

export default UTXO;

const Card = ({
  type,
  items,
  isFailed
}: {
  type: "up" | "down";
  items?: Required<Transaction>["utxOs"]["inputs"];
  fee?: number;
  isFailed?: boolean;
}) => {
  const totalADA =
    items &&
    items.reduce((prv, item) => {
      return prv + item.value;
    }, 0);

  const { isMobile } = useScreen();
  return (
    <Box textAlign={"left"} mb={1} sx={{ background: (theme) => theme.palette.background.paper }}>
      <Header fontWeight="bold">
        <Box color={(theme) => theme.palette.secondary.main} fontSize={"1rem"} lineHeight="19px" mb="2px">
          {type === "down" ? "Input" : "Output"}
        </Box>
        <Box color={(theme) => theme.palette.secondary.light} display="flex" justifyContent="space-between">
          <Box>Addresses</Box>
          <Box>Amount</Box>
        </Box>
      </Header>
      <Box fontSize={14}>
        {items?.map((item, index) => (
          <Item key={index}>
            <ItemContent sx={{ overflowX: "auto", overflowY: "hidden" }}>
              <Box display="flex" alignItems="center">
                <Box width={50}>
                  <Img src={type === "down" ? receiveImg : sendImg} alt="send icon" />
                </Box>
              </Box>
              <WrapInfo>
                <Box width={"100%"} display="flex" flexDirection="column" justifyContent="center" paddingTop="5px">
                  {type === "down" ? (
                    <WrapUTXOs>
                      <Box mr={3} minWidth={200}>
                        <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                          <Box color={(theme) => theme.palette.secondary.light} pr={1}>
                            UTXO:
                          </Box>
                          <Link to={details.transaction(item.txHash)}>
                            <CustomTooltip title={item.txHash}>
                              <Box
                                component={"span"}
                                fontWeight="bold"
                                fontFamily={"var(--font-family-text)"}
                                color={(theme) => theme.palette.primary.main}
                                mr={1}
                              >
                                {getShortHash(item.txHash)}
                              </Box>
                            </CustomTooltip>
                          </Link>
                          <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main}>
                            #{item?.index}
                          </Box>
                          <CopyButton text={item.txHash} />
                        </Box>
                      </Box>
                    </WrapUTXOs>
                  ) : (
                    <Box />
                  )}
                  <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      justifyContent={"flex-start"}
                      pr={1}
                      pl={type === "down" ? 2 : 0}
                      color={(theme) => theme.palette.secondary.light}
                    >
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
                              color={(theme) => theme.palette.primary.main}
                              fontWeight="bold"
                              fontFamily={"var(--font-family-text)"}
                              mr={1}
                            >
                              {getShortWallet(item.address)}
                            </Box>
                          </CustomTooltip>
                        </Link>
                        <CopyButton text={item.address} />
                      </Box>
                    </Box>
                  </Box>
                  {item?.stakeAddress && (
                    <Box
                      justifyContent={"space-between"}
                      width={"100%"}
                      display="flex"
                      flexDirection={isMobile ? "column" : "row"}
                      paddingTop="5px"
                    >
                      <Box mr={3} minWidth={180}>
                        <Box
                          display={"flex"}
                          flexDirection={isMobile ? "column" : "row"}
                          justifyContent="flex-start"
                          alignItems={isMobile ? "flex-start" : "center"}
                        >
                          <Box pr={1} color={({ palette }) => palette.secondary.light}>
                            Stake Address:{" "}
                          </Box>
                          <Box>
                            <Link to={details.stake(item?.stakeAddress)}>
                              <CustomTooltip title={item?.stakeAddress}>
                                <Box
                                  component={"span"}
                                  fontWeight="bold"
                                  fontFamily={"var(--font-family-text)"}
                                  color={(theme) => theme.palette.primary.main}
                                  mr={1}
                                >
                                  {getShortWallet(item?.stakeAddress)}
                                </Box>
                              </CustomTooltip>
                            </Link>
                            <CopyButton text={item?.stakeAddress} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box display={"flex"} alignItems={"end"} flexDirection={"column"}>
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
                      color={(theme) => (type === "up" ? theme.palette.success[800] : theme.palette.error[700])}
                      fontWeight="bold"
                      mr={1}
                    >
                      {type === "down" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                    </Box>
                    <ADAicon />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {item.tokens && item.tokens.length === 1 && (
                      <Box mt={2}>
                        <TokenLink token={item.tokens[0]} />
                      </Box>
                    )}
                    {item.tokens && item.tokens.length > 1 && (
                      <Box mt={2}>
                        <DropdownTokens tokens={item.tokens} type={type} hideInputLabel hideMathChar />
                      </Box>
                    )}
                  </Box>
                </Box>
              </WrapInfo>
            </ItemContent>
          </Item>
        ))}
      </Box>
      <ItemFooter>
        <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main}>
          Total {type === "down" ? "Input" : "Output"}
        </Box>
        <div>
          <Box fontWeight={"bold"} component="span" pr={1} color={({ palette }) => palette.secondary.main}>
            {isFailed ? 0 : type === "down" ? `-${formatADAFull(totalADA)}` : `${formatADAFull(totalADA)}`}
          </Box>
          <ADAicon />
        </div>
      </ItemFooter>
    </Box>
  );
};
