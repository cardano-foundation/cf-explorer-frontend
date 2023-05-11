import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { getShortWallet, formatADAFull, getShortHash } from "../../../../commons/utils/helper";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import feeImg from "../../../../commons/resources/images/dola.svg";
import CopyButton from "../../../commons/CopyButton";
import { details } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";
import { CustomSelect, Header, Img, Item, ItemContent, ItemFooter, OptionSelect, TokenLink, WrapToken } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import { useScreen } from "../../../../commons/hooks/useScreen";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import DropdownTokens from "../../../commons/DropdownTokens";

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
  const history = useHistory();
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const handleClickItem = (link: string) => {
    history.push(link);
  }
  const totalADA =
    items &&
    items.reduce((prv, item) => {
      return prv + item.value;
    }, 0);

  const { isTablet } = useScreen();
  return (
    <Box textAlign={"left"} mb={1} sx={{ background: theme => theme.palette.background.paper }}>
      <Header fontWeight="bold">
        <Box color={theme => theme.palette.text.dark} fontSize={"1rem"} lineHeight="19px" mb="2px">
          {type === "down" ? "Input" : "Output"}
        </Box>
        <Box color={theme => theme.palette.text.hint} display="flex" justifyContent="space-between">
          <Box>Wallet Addresses</Box>
          <Box>Amount</Box>
        </Box>
      </Header>
      <Box fontSize={14}>
        {items?.map((item, index) => (
          <Item key={index}>
            <ItemContent>
              <Box display="flex" alignItems="center">
                <Box width={50}>
                  <Img src={type === "down" ? receiveImg : sendImg} alt="send icon" />
                </Box>
                {isTablet ? <Box>{type === "down" ? "From" : "To"}:</Box> : null}
              </Box>
              <Box width={"100%"} display="flex" flexDirection="column" justifyContent="center" paddingTop="5px">
                <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                  {!isTablet ? (
                    <Box display={"flex"} alignItems="center" justifyContent={"flex-start"} pr={1}>
                      {type === "down" ? "From" : "To"}:
                    </Box>
                  ) : null}
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
                            mr={1}
                          >
                            {getShortWallet(item.address)}
                          </Box>
                        </CustomTooltip>
                      </Link>
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
                        <Box pr={1}>
                          UTXO:
                        </Box>
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
                  <Box display={"flex"} alignItems={'center'}>
                    {item.tokens && item.tokens.length > 0 && (
                      <DropdownTokens tokens={item.tokens} type={type} />
                    )}
                  </Box>
                </Box>
              </Box>
            </ItemContent>
          </Item >
        ))
        }
        {
          type === "up" && (
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
          )
        }
      </Box >
      <ItemFooter>
        <Box fontWeight={"bold"}>Total {type === "down" ? "Input" : "Output"}</Box>
        <div>
          <Box fontWeight={"bold"} component="span" pr={1}>
            {type === "down" ? `-${formatADAFull(totalADA)}` : `${formatADAFull(totalADA)}`}
          </Box>
          <ADAicon />
        </div>
      </ItemFooter>
    </Box >
  );
};
