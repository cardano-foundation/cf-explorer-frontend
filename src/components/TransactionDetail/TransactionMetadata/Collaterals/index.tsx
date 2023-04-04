import { alpha, Box, styled } from "@mui/material";

import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import { formatADAFull, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import { details } from "../../../../commons/routers";
import { Link } from "react-router-dom";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Header, Img, Item, ItemBox, TokenLink, Wrapper } from "./style";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Box>Wallet Addresses</Box>
        <Box>Amount</Box>
      </Header>
      <ItemBox>
        <ItemCollateral data={data?.collateralInputResponses || []} type="input" />
        <ItemCollateral data={data?.collateralOutputResponses || []} type="output" />
      </ItemBox>
    </Wrapper>
  );
};

export default Collaterals;

const ItemCollateral = ({ data, type }: { data: CollateralResponses[]; type: "input" | "output" }) => {
  return (
    <Box>
      {data?.map(item => (
        <Item key={item.address}>
          <Box display={"flex"} alignItems="center">
            <Box width={50}>
              <Img src={type === "input" ? receiveImg : sendImg} alt="send icon" />
            </Box>
            <Box width={"100%"}>
              <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                <Box display={"flex"} alignItems="center" justifyContent={"flex-start"} pr={1}>
                  {type === "input" ? "From" : "To"}:
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
                      color={theme => (type === "output" ? theme.palette.primary.main : theme.palette.error.main)}
                      fontWeight="bold"
                      mr={1}
                    >
                      {type === "input" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                    </Box>
                    <img src={AIcon} alt="ADA icon" />
                  </Box>
                </Box>
              </Box>
              <Box justifyContent={"space-between"} alignItems="center" width={"100%"} display="flex">
                <Box mr={3}>
                  {type === "input" && (
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
                    {(item?.tokens || []).map((token, idx) => (
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
    </Box>
  );
};
