import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash, getShortWallet } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownTokens from "src/components/commons/DropdownTokens";

import { Header, Img, Item, ItemBox, ItemContent, Wrapper } from "./style";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Box>Addresses</Box>
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
  const { isTablet } = useScreen();
  return (
    <Box>
      {data?.map((item) => (
        <Item key={item.address}>
          <ItemContent>
            <Box display="flex" alignItems="center">
              <Box width={50}>
                <Img src={type === "input" ? receiveImg : sendImg} alt="send icon" />
              </Box>
              {isTablet ? (
                <Box color={({ palette }) => palette.grey[400]}>{type === "input" ? "From" : "To"}:</Box>
              ) : null}
            </Box>
            <Box width={"100%"}>
              <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                {!isTablet ? (
                  <Box
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"flex-start"}
                    pr={1}
                    mr={1}
                    color={({ palette }) => palette.grey[400]}
                  >
                    {type === "input" ? "From" : "To"}:
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
                          color={(theme) => theme.palette.blue[100]}
                          fontWeight="bold"
                          fontFamily={"var(--font-family-text)"}
                          mr={1}
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
                      color={(theme) => (type === "output" ? theme.palette.primary.main : theme.palette.error.main)}
                      fontWeight="bold"
                      mr={1}
                    >
                      {type === "input" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                    </Box>
                    <ADAicon />
                  </Box>
                </Box>
              </Box>
              <Box justifyContent={"space-between"} alignItems={"flex-start"} width={"100%"} display="flex">
                <Box mr={3}>
                  {type === "input" && (
                    <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                      <Link to={details.transaction(item.txHash)}>
                        <CustomTooltip title={item.txHash}>
                          <Box
                            component={"span"}
                            fontWeight="bold"
                            fontFamily={"var(--font-family-text)"}
                            color={(theme) => theme.palette.blue[100]}
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
                {item.tokens && item.tokens.length > 1 && (
                  <Box display={"flex"} alignItems={"center"}>
                    <DropdownTokens
                      tokens={item.tokens}
                      type={type === "input" ? "up" : "down"}
                      hideInputLabel
                      hideMathChar
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </ItemContent>
        </Item>
      ))}
    </Box>
  );
};
