import { Box, Button, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { FunctionComponent, SVGProps, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { details } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import { LockedTimelock, OpenTimeLock, SigNative } from "src/commons/resources";

import DesPlutusVersion from "./DesPlutusVersion";

const NativeScriptCard: React.FC<{ data: NativeScriptsList; hasBeforeAndAfter: boolean }> = ({ data }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isCloseAllTooltip, setIsCloseAllTooltip] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const isOverflowingHorizontally = container?.scrollWidth > container?.clientWidth;

      setIsOverflowing(isOverflowingHorizontally);
    }
  }, [isOverflowing]);

  useEffect(() => {
    const onCloseWhenChangeTab = () => {
      if (document.visibilityState === "visible") {
        setIsCloseAllTooltip(true);
      }
    };

    document.addEventListener("visibilitychange", onCloseWhenChangeTab);

    return () => {
      document.removeEventListener("visibilitychange", onCloseWhenChangeTab);
    };
  }, []);

  return (
    <Item>
      <Box p={2} height={"100%"} display={"block"} component={Link} to={details.nativeScriptDetail(data.scriptHash)}>
        <Row style={{ marginBottom: 2 }}>
          <Title data-testid="nativeScripts.card.scriptHashTitle">{t("common.scriptHash")}: </Title>
          <Box
            data-testid="nativeScripts.card.scriptHashValue"
            mb={"6px"}
            width={"calc(100% - 100px)"}
            color={`${theme.palette.primary.main} !important`}
          >
            <DynamicEllipsisText customTruncateFold={[4, 4]} value={data.scriptHash || ""} isTooltip />
          </Box>
        </Row>
        <Row>
          <Title data-testid="nativeScripts.card.policyTitle" width={"100%"}>
            {t("nativeScript.policy")}:{" "}
          </Title>
          <Value data-testid="nativeScripts.card.policyValue">
            <Box mt={1} display={"flex"} flexWrap={"wrap"}>
              <TimeLockChip isOpen={data.isOpen} />
              <MultiSigChip isMultiSig={data.isMultiSig} />
            </Box>
          </Value>
        </Row>
        <Row>
          <Title data-testid="nativeScripts.card.assetHoldersTitle">{t("nativeScript.assetHolders")}: </Title>
          <Value data-testid="nativeScripts.card.assetHoldersValue">{data.numberOfAssetHolders || 0}</Value>
        </Row>

        <Row>
          <Title data-testid="nativeScripts.card.tokensTitle">{t("nativeScript.tokens")}: </Title>
          <Value data-testid="nativeScripts.card.tokensValue">{data.numberOfTokens || 0}</Value>
        </Row>
        <Row>
          {data.tokens &&
            data.tokens.map((item, index) => {
              return (
                <Box
                  component={isOverflowing ? CustomTooltip : Box}
                  closeTooltip={isCloseAllTooltip}
                  setIsCloseTooltip={() => setIsCloseAllTooltip(true)}
                  key={index}
                  title={isOverflowing ? item.displayName || getShortHash(item.fingerprint) || "" : null}
                >
                  <Link to={details.token(item.fingerprint)}>
                    <Chip
                      pl={`${item.metadata && item.metadata.logo ? "4px" : 1} !important`}
                      mb={1}
                      maxWidth={"130px !important"}
                    >
                      <Box display={"flex"} alignItems={"center"} height={"100%"}>
                        {item.metadata && item.metadata.logo && (
                          <Box
                            height={23}
                            mr={1}
                            width={23}
                            borderRadius={"50%"}
                            sx={{
                              backgroundImage: `url(${item?.metadata?.logo})`,
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat"
                            }}
                          />
                        )}
                        <Box
                          overflow={"hidden"}
                          textOverflow={"ellipsis"}
                          ref={containerRef}
                          sx={{
                            textWrap: "nowrap"
                          }}
                        >
                          {item.displayName || getShortHash(item.fingerprint, 10, 6) || ""}
                        </Box>
                      </Box>
                    </Chip>
                  </Link>
                </Box>
              );
            })}

          {(data.numberOfTokens || 0) > (data.tokens || []).length && (
            <Box
              display={"block"}
              height={"100%"}
              component={Link}
              p={1}
              mb={1}
              fontSize={14}
              to={details.nativeScriptDetail(data.scriptHash, "token")}
              color={`${theme.palette.primary.main} !important`}
              data-testid="nativeScripts.card.more"
            >
              {t("glossary.more")}
            </Box>
          )}
          {!data.tokens && (
            <Box
              textAlign={"center"}
              fontSize={16}
              lineHeight={"18.75px"}
              width={"100%"}
              py={1}
              color={theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600]}
            >
              {t("nativeScript.noToken")}
            </Box>
          )}
        </Row>
      </Box>
    </Item>
  );
};

const SmartContractCard: React.FC<{ data: ScriptSmartContracts }> = ({ data }) => {
  const theme = useTheme();
  const [openDesPlutusVersion, setOpenDesPlutusVersion] = useState(false);
  const version = {
    PLUTUSV1: "Plutus V1",
    PLUTUSV2: "Plutus V2",
    PLUTUSV3: "Plutus V3"
  };

  return (
    <Item>
      <Box p={2} height={"100%"} display={"block"} component={Link} to={details.smartContract(data.scriptHash)}>
        <Row style={{ marginBottom: 4 }}>
          <Title data-testid="nativeScripts.smartContract.card.scriptHashTitle">{t("common.scriptHash")}: </Title>
          <Box
            data-testid="nativeScripts.smartContract.card.scriptHashValue"
            mb={"4px"}
            width={"calc(100% - 100px)"}
            color={`${theme.palette.primary.main} !important`}
          >
            <DynamicEllipsisText customTruncateFold={[4, 4]} value={data.scriptHash || ""} isTooltip />
          </Box>
        </Row>
        <Row>
          <Title data-testid="nativeScripts.smartContract.card.versionTitle">{t("Version")}: </Title>
          <Value data-testid="nativeScripts.smartContract.card.versionValue">
            {data.scriptVersion ? version[data.scriptVersion] : ""}
            <Box
              component={Button}
              m={0}
              p={0}
              width={24}
              minWidth={24}
              ml={1}
              borderRadius={"50%"}
              onClick={(event) => {
                setOpenDesPlutusVersion(true);
                event.stopPropagation();
                event.preventDefault();
              }}
            >
              <InfoSolidIcon />
            </Box>
          </Value>
        </Row>
        <Row>
          <Title data-testid="nativeScripts.smartContract.card.totalTrxTitle">{t("smartContract.totalTrx")}: </Title>
          <Value data-testid="nativeScripts.smartContract.card.totalTrxValue">{data.txCount || 0}</Value>
        </Row>
        <Row>
          <Title data-testid="nativeScripts.smartContract.card.purposeTitle">{t("smartContract.trxPurpose")}: </Title>
          {data.txPurposes && data.txPurposes.length > 0
            ? data.txPurposes.map((item, index) => {
                return (
                  <Chip key={index}>
                    <Box
                      data-testid="nativeScripts.smartContract.card.purposeValue"
                      display={"flex"}
                      alignItems={"center"}
                      height={"100%"}
                    >
                      {item}
                    </Box>
                  </Chip>
                );
              })
            : t("common.N/A")}
        </Row>
      </Box>

      <DesPlutusVersion open={openDesPlutusVersion} onClose={() => setOpenDesPlutusVersion(false)} />
    </Item>
  );
};

export { SmartContractCard, NativeScriptCard };

const Item = styled(Card)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[700])};
  box-shadow: 2px 2px 10px 0px #43465633;
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.isDark ? ` 2px 2px 10px 0px ${theme.palette.secondary[100]}` : theme.shadow.cardHover};
  }
`;

const Row = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    color: theme.palette.secondary.light,
    marginBottom: theme.spacing(1),
    ":last-child": {
      marginBottom: 0
    }
  };
});

const Title = styled(Box)(({ theme }) => {
  return {
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: theme.spacing(1)
  };
});

const Value = styled(Box)(() => {
  return {
    fontSize: "16px"
  };
});

const Chip = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(0.5, 1),
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200],
    borderRadius: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    fontSize: 12,
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 20
  };
});

export const TimeLockChip: React.FC<{ isOpen: boolean | null }> = ({ isOpen }) => {
  if (isOpen) {
    return <ChipContainer Icon={OpenTimeLock} message="Open" variant="success" />;
  }
  return <ChipContainer Icon={LockedTimelock} message="Locked" variant="warning" />;
};

export const MultiSigChip: React.FC<{ isMultiSig: boolean }> = ({ isMultiSig }) => {
  if (isMultiSig) {
    return <ChipContainer Icon={SigNative} message="Multi-Sig" variant="info" />;
  }
  return <ChipContainer Icon={SigNative} message="Single-Sig" variant="info" />;
};

export const ChipContainer: React.FC<{
  Icon?: string | FunctionComponent<SVGProps<SVGSVGElement>>;
  message?: string | JSX.Element;
  titleTooltip?: string;
  variant?: "success" | "warning" | "info" | "error" | "gray";
  messageColor?: string;
  maxWidth?: string;
}> = ({ Icon, message, variant, titleTooltip, messageColor, maxWidth }) => {
  const theme = useTheme();

  const color = (variant?: "success" | "warning" | "info" | "error" | "gray") => {
    switch (variant) {
      case "success":
        return theme.palette.success[700];
      case "info":
        return theme.isDark ? theme.palette.primary[500] : theme.palette.primary.main;
      case "warning":
        return theme.palette.warning[700];
      case "error":
        return theme.palette.error[700];
      case "gray":
        return theme.palette.secondary[600];
      default:
        return theme.palette.success[700];
    }
  };

  const backgroundColor = (variant?: "success" | "warning" | "info" | "error" | "gray") => {
    switch (variant) {
      case "success":
        return theme.palette.success[100];
      case "info":
        return theme.palette.primary[200];
      case "warning":
        return theme.palette.warning[100];
      case "error":
        return theme.palette.error[100];
      case "gray":
        return theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100];

      default:
        return theme.palette.success[100];
    }
  };

  return (
    <CustomTooltip title={titleTooltip || ""}>
      <Chip
        pl={`${Icon ? "4px" : 1} !important`}
        maxWidth={maxWidth ? `${maxWidth} !important` : "unset"}
        mb={1}
        bgcolor={`${backgroundColor(variant)} !important`}
        borderColor={`${color(variant)} !important`}
      >
        <Box display={"flex"} alignItems={"center"} height={"100%"}>
          {Icon && (
            <Box
              height={23}
              mr={1}
              width={23}
              borderRadius={"50%"}
              bgcolor={`${color(variant)} !important`}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon />
            </Box>
          )}
          <Box
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            color={({ palette }) => messageColor || palette.secondary.light}
            sx={{
              textWrap: "nowrap"
            }}
          >
            {message}
          </Box>
        </Box>
      </Chip>
    </CustomTooltip>
  );
};
