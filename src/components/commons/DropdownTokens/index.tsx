import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";

import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { formatNumberDivByDecimals, getShortWallet } from "src/commons/utils/helper";

import CustomTooltip from "../CustomTooltip";
import { CustomSelect, OptionSelect, TokenButton } from "./styles";

export interface IDropdownTokens {
  tokens: Token[];
  type?: "up" | "down" | undefined;
  hideInputLabel?: boolean;
  hideMathChar?: boolean;
}

const DropdownTokens: React.FC<IDropdownTokens> = ({ tokens, hideInputLabel, hideMathChar }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const history = useHistory();
  const isSend = tokens[0].assetQuantity < 0;
  const theme = useTheme();
  const handleClickItem = (link: string) => {
    history.push(link);
  };
  const { isMobile } = useScreen();
  return (
    <CustomSelect
      sx={{
        minWidth: isMobile ? "100%" : "250px"
      }}
      open={openDropdown}
      onOpen={() => setOpenDropdown(true)}
      onClose={() => setOpenDropdown(false)}
      value={"default"}
      IconComponent={() =>
        openDropdown ? (
          <>
            <BiChevronUp
              size={30}
              style={{ paddingRight: 10, fontSize: "20px", cursor: "pointer" }}
              onClick={() => setOpenDropdown(false)}
            />
          </>
        ) : (
          <>
            <BiChevronDown
              size={30}
              style={{ paddingRight: 10, fontSize: "20px", cursor: "pointer" }}
              onClick={() => setOpenDropdown(true)}
            />
          </>
        )
      }
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: 2,
            marginTop: 0.5,
            "&::-webkit-scrollbar": {
              width: "5px"
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent"
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent"
            },
            "&:hover": {
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.secondary.light
              },
              "&::-webkit-scrollbar-track": {
                background: theme.palette.secondary[600]
              }
            }
          }
        }
      }}
    >
      <OptionSelect sx={{ display: "none" }} value="default">
        {" "}
        {!hideInputLabel ? (isSend ? "Sent " : "Received ") : ""}Token
      </OptionSelect>
      {tokens.map((token, idx) => {
        const isNegative = token.assetQuantity <= 0;
        const tokenName = token.assetName || token.assetId;
        const shortTokenName = getShortWallet(tokenName);
        const isTokenNameLong = tokenName.length > 20;
        return (
          <OptionSelect key={idx} onClick={() => handleClickItem(details.token(token?.assetId))}>
            <Box color={({ palette }) => palette.secondary.main}>
              {isTokenNameLong ? (
                <CustomTooltip title={tokenName} placement="top">
                  <Box>{shortTokenName}</Box>
                </CustomTooltip>
              ) : (
                tokenName
              )}
            </Box>
            <Box fontWeight={"bold"} fontSize={"14px"} color={({ palette }) => palette.secondary.main}>
              {isNegative || hideMathChar ? "" : "+"}
              {formatNumberDivByDecimals(token?.assetQuantity || 0, token?.metadata?.decimals || 0)}
            </Box>
          </OptionSelect>
        );
      })}
    </CustomSelect>
  );
};

export default DropdownTokens;

export const TokenLink: React.FC<{ token: Token }> = ({ token }) => {
  const tokenName = token.assetName || token.assetId;
  const shortTokenName = getShortWallet(tokenName);
  const isTokenNameLong = tokenName.length > 20;

  return (
    <TokenButton>
      <Box
        component={Link}
        to={details.token(token.assetId)}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pl={2}
        width={"100%"}
        height={38}
      >
        <Box mr={2} color={({ palette }) => palette.secondary.light}>
          {isTokenNameLong ? (
            <CustomTooltip title={tokenName} placement="top">
              <Box color={({ palette }) => palette.secondary.main}>{shortTokenName}</Box>
            </CustomTooltip>
          ) : (
            tokenName
          )}
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Box fontWeight={"bold"} fontSize={"14px"} color={({ palette }) => palette.secondary.main}>
            {formatNumberDivByDecimals(token?.assetQuantity || 0, token?.metadata?.decimals || 0)}
          </Box>
          <Box mr={1} mt={"2px"}>
            <RiArrowRightSLine />
          </Box>
        </Box>
      </Box>
    </TokenButton>
  );
};
