import { Box, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { TransferIcon } from "src/commons/resources";

import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import { details } from "../../../../commons/routers";
import { formatADAFull, getShortWallet } from "../../../../commons/utils/helper";
import ADAicon from "../../../commons/ADAIcon";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "../../../commons/DropdownTokens";
import { Icon, Item, TitleText } from "./styles";
import { useScreen } from "../../../../commons/hooks/useScreen";

const SummaryItems = ({
  item,
  type
}: {
  item: Transaction["summary"]["stakeAddress"][number];
  type?: "up" | "down";
}) => {
  const isTransferType = item?.tokens.some((t) => {
    return (t.assetQuantity < 0 && item?.value >= 0) || (t.assetQuantity >= 0 && item?.value < 0);
  });

  const theme = useTheme();
  const { isMobile } = useScreen();

  return (
    <Box
      display={"flex"}
      flexDirection={isMobile ? "column" : "row"}
      justifyContent={"space-between"}
      sx={{
        background: (theme) => theme.palette.background.paper,
        px: 3,
        py: 2,
        mb: 1,
        [theme.breakpoints.down("sm")]: {
          px: 2
        }
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} sx={{ overflowX: "auto", overflowY: "hidden" }}>
        {isTransferType ? (
          <Box width={40} ml={"2px"} mt={"3px"} mr={"8px"}>
            <TransferIcon style={{ scale: "1.15" }} />
          </Box>
        ) : (
          <Box width={50}>
            <Icon src={type !== "up" ? receiveImg : sendImg} alt="send icon" />
          </Box>
        )}
        <Box flex={1} pt="4px">
          <Box display={"flex"} alignItems="center" justifyContent={"flex-start"}>
            <Item>
              <TitleText>{type === "down" ? "From" : "To"}: </TitleText>
              <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} flex={1} mb={1}>
                <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} flexWrap={"nowrap"}>
                  <Link
                    to={item.address.startsWith("stake") ? details.stake(item.address) : details.address(item.address)}
                  >
                    <CustomTooltip title={item.address}>
                      <Box
                        color={(theme) => theme.palette.primary.main}
                        fontWeight="bold"
                        fontFamily={"var(--font-family-text)"}
                      >
                        {getShortWallet(item.address)}
                      </Box>
                    </CustomTooltip>
                  </Link>
                  <CopyButton text={item.address} style={{ cursor: "pointer", verticalAlign: "text-bottom" }} />
                </Box>
              </Box>
            </Item>
          </Box>
          <Box
            display={"flex"}
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent={"space-between"}
            width="100%"
            mb={1}
          >
            <Box display="flex" justifyContent={"space-between"} alignItems={"baseline"} pr={1} flexDirection={"row"}>
              <Box pr={1} whiteSpace={"nowrap"} color={({ palette }) => palette.secondary.light}>
                {type === "down" ? "ADA sent:" : "ADA received:"}{" "}
              </Box>
              <Box display="flex" justifyContent={"space-between"} alignItems="center">
                <Box
                  component={"span"}
                  whiteSpace="nowrap"
                  color={(theme) => (type === "up" ? theme.palette.success[800] : theme.palette.error[700])}
                  fontWeight="bold"
                  mr={1}
                >
                  {type === "down" ? `${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                </Box>
                <ADAicon />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {item.tokens && item.tokens.length === 1 && (
        <Box display={"flex"} alignItems={"center"} ml={isMobile ? "50px" : 0}>
          <TokenLink token={item.tokens[0]} />
        </Box>
      )}
      {item.tokens && item.tokens.length > 1 && (
        <Box display={"flex"} alignItems={"center"} ml={isMobile ? "50px" : 0}>
          <DropdownTokens tokens={item.tokens} type={type} hideInputLabel />
        </Box>
      )}
    </Box>
  );
};

interface SummaryProps {
  data: Transaction["summary"] | null;
}
const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <Box>
      {data?.stakeAddress?.map((tx, key) => {
        const type = tx.value >= 0 ? "up" : "down";
        return <SummaryItems key={key} item={tx} type={type} />;
      })}
    </Box>
  );
};

export default Summary;
