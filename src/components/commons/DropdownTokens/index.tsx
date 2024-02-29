import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { formatNumberDivByDecimals, getShortHash } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import CustomTooltip from "../CustomTooltip";
import { CustomSelect, OptionSelect, TokenButton } from "./styles";

export interface IDropdownTokens {
  tokens: Token[];
  type?: "up" | "down" | undefined;
  hideInputLabel?: boolean;
  hideMathChar?: boolean;
  isSuccess?: boolean;
  isSummary?: boolean;
  sx?: SxProps<Theme>;
}

const DropdownTokens: React.FC<IDropdownTokens> = ({
  tokens,
  hideInputLabel,
  hideMathChar,
  isSuccess,
  sx,
  isSummary
}) => {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const history = useHistory();
  const isSend = tokens[0].assetQuantity < 0;
  const theme = useTheme();
  const hasLongTokenName = tokens.some(
    (token) => token.assetName?.length > 20 || (!token.assetName && token.assetId.length > 20)
  );
  const handleClickItem = (link: string) => {
    history.push(link);
  };
  const { isMobile } = useScreen();
  return (
    <CustomSelect
      sx={{
        minWidth: isMobile ? "100%" : "250px",
        ...sx
      }}
      open={openDropdown}
      isSummary={isSummary}
      onOpen={() => setOpenDropdown(true)}
      onClose={() => setOpenDropdown(false)}
      value={"default"}
      IconComponent={() =>
        openDropdown ? (
          <>
            <BiChevronUp
              size={30}
              color={theme.palette.secondary.main}
              style={{ paddingRight: 10, fontSize: "20px", cursor: "pointer" }}
              onClick={() => setOpenDropdown(false)}
            />
          </>
        ) : (
          <>
            <BiChevronDown
              size={30}
              color={theme.palette.secondary.main}
              style={{ paddingRight: 10, fontSize: "20px", cursor: "pointer" }}
              onClick={() => setOpenDropdown(true)}
            />
          </>
        )
      }
      MenuProps={{
        MenuListProps: {
          sx: {
            bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
          }
        },
        PaperProps: {
          sx: {
            bgcolor: ({ palette }) => `${palette.secondary[0]} !important`,
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
              }
            }
          }
        }
      }}
    >
      <OptionSelect sx={{ display: "none" }} value="default">
        {!hideInputLabel ? (isSend ? t("common.sent") + " " : t("common.received")) + " " : ""} {t("tab.viewTokens")}
      </OptionSelect>
      {tokens.map((token, idx) => {
        const isNegative = token.assetQuantity <= 0;
        const tokenName = token.assetName || token.assetId;
        const shortTokenName = getShortHash(tokenName, tokenName.length > 20 ? 16 : 10);
        return (
          <OptionSelect
            key={idx}
            onClick={() => handleClickItem(details.token(token?.assetId))}
            sx={
              hasLongTokenName
                ? {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    minHeight: "unset",
                    height: "auto"
                  }
                : {}
            }
          >
            <Box color={({ palette }) => palette.secondary.main}>
              <CustomTooltip title={tokenName} placement="top">
                <Box>{shortTokenName || tokenName}</Box>
              </CustomTooltip>
            </Box>
            <Box
              fontWeight={"bold"}
              fontSize={"14px"}
              color={({ palette }) => (isSuccess ? palette.secondary.main : palette.secondary[600])}
            >
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

export const TokenLink: React.FC<{
  token: Token;
  isSuccess?: boolean;
  isSummary?: boolean;
  sx?: SxProps<Theme>;
  sxBox?: SxProps<Theme>;
  sxTokenName?: SxProps<Theme>;
  hideValue?: boolean;
  truncateAddress?: { firstPart: number; lastPart: number };
}> = ({ token, isSuccess, sx, hideValue, isSummary, sxBox = {}, sxTokenName = {}, truncateAddress }) => {
  const theme = useTheme();

  const renderTokenName = (token: Token) => {
    const tokenName = token.assetName;
    let elm: React.ReactElement | string;
    if (tokenName) {
      if (tokenName.length > 20) {
        if (truncateAddress) {
          elm = getShortHash(tokenName, truncateAddress.firstPart, truncateAddress.lastPart);
        } else elm = getShortHash(tokenName);
      } else {
        elm = tokenName;
      }
    } else {
      elm = <DynamicEllipsisText value={token.assetId} />;
    }
    return elm;
  };

  return (
    <TokenButton sx={sx} isSummary={isSummary}>
      <Box
        component={Link}
        to={details.token(token.assetId)}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pl={1}
        width={"100%"}
        height={38}
        flex={1}
        sx={sxBox}
      >
        <Box
          mr={1}
          color={({ palette }) => palette.secondary.main}
          sx={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90%", ...sxTokenName }}
        >
          <CustomTooltip title={token?.assetName || token?.assetId}>
            <Box color={({ palette }) => palette.secondary.main}>{renderTokenName(token)}</Box>
          </CustomTooltip>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          {!hideValue ? (
            <Box
              fontWeight={"bold"}
              fontSize={"14px"}
              color={({ palette }) => (isSuccess ? palette.secondary.main : palette.secondary[600])}
            >
              {formatNumberDivByDecimals(token?.assetQuantity || 0, token?.metadata?.decimals || 0)}
            </Box>
          ) : null}
          <Box mr={1} mt={"2px"}>
            <RiArrowRightSLine color={theme.palette.secondary.main} />
          </Box>
        </Box>
      </Box>
    </TokenButton>
  );
};
