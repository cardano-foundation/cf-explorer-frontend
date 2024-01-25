import { Box, Button, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { details } from "src/commons/routers";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import DesPlutusVersion from "./DesPlutusVersion";

const NativeScriptCard: React.FC<{ data: NativeScriptsList; hasBeforeAndAfter: boolean }> = ({
  data,
  hasBeforeAndAfter
}) => {
  const theme = useTheme();

  const cardRef = useRef<HTMLDivElement | null>();
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.clientWidth);
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const isMoreThan10years = (date: string) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const differenceInTime = date2.getTime() - date1.getTime();
    const differenceInYears = differenceInTime / (1000 * 3600 * 24 * 365);
    if (isNaN(differenceInYears) || Math.abs(differenceInYears) > 10) return true;
    return false;
  };

  const renderTimeLock = () => {
    if (data.before && data.after) {
      return (
        <Box>
          <Box display={"flex"} alignContent={"center"} gap={1}>
            until: {isMoreThan10years(data.after) ? t("moreThan10Years") : formatDateTimeLocal(data.after)}
          </Box>
          <Box display={"flex"} alignContent={"center"} gap={1}>
            as of: {isMoreThan10years(data.before) ? t("moreThan10Years") : formatDateTimeLocal(data.before)}
          </Box>
        </Box>
      );
    }
    if (data.before || data.after) {
      return (
        <Box
          display={"flex"}
          alignItems={cardWidth < 350 ? "baseline" : "center"}
          gap={1}
          height={hasBeforeAndAfter ? 38 : "unset"}
        >
          {data.before ? "as of: " : " until: "}
          {isMoreThan10years(data.before || data.after)
            ? t("moreThan10Years")
            : formatDateTimeLocal(data.before || data.after)}
        </Box>
      );
    }
    return (
      <Box
        height={hasBeforeAndAfter ? 38 : "unset"}
        display={"flex"}
        alignItems={cardWidth < 350 ? "baseline" : "center"}
      >
        {t("common.N/A")}
      </Box>
    );
  };

  return (
    <Item>
      <Box
        p={2}
        height={"100%"}
        display={"block"}
        component={Link}
        to={details.nativeScriptDetail(data.scriptHash)}
        ref={cardRef}
      >
        <Row>
          <Title>{t("common.scriptHash")}: </Title>
          <Box width={"calc(100% - 100px)"} color={`${theme.palette.primary.main} !important`}>
            <DynamicEllipsisText customTruncateFold={[4, 4]} value={data.scriptHash || ""} isTooltip />
          </Box>
        </Row>
        <Row alignItems={"center"}>
          <Title>{t("nativeScript.timeLock")}: </Title>
          <Value width={cardWidth < 350 ? "100%" : "unset"}>{renderTimeLock()}</Value>
        </Row>
        <Row>
          <Title>{t("nativeScript.multiSig")}: </Title>
          <Value>{data.isMultiSig ? "Yes" : "No"}</Value>
        </Row>

        <Row>
          <Title>{t("nativeScript.assetHolders")}: </Title>
          <Value>{data.numberOfAssetHolders || 0}</Value>
        </Row>

        <Row>
          <Title>{t("nativeScript.tokens")}: </Title>
          <Value>{data.numberOfTokens || 0}</Value>
        </Row>
        <Row>
          {data.tokens &&
            data.tokens.map((item, index) => {
              return (
                <CustomTooltip key={index} title={item.displayName || getShortHash(item.fingerprint) || ""}>
                  <Link to={details.token(item.fingerprint)}>
                    <Chip pl={`${item.metadata && item.metadata.logo ? "4px" : 1} !important`} mb={1}>
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
                          sx={{
                            textWrap: "nowrap"
                          }}
                        >
                          {item.displayName || getShortHash(item.fingerprint, 10, 6) || ""}
                        </Box>
                      </Box>
                    </Chip>
                  </Link>
                </CustomTooltip>
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
            >
              {`+More`}
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
    PLUTUSV2: "Plutus V2"
  };

  return (
    <Item>
      <Box p={2} height={"100%"} display={"block"} component={Link} to={details.smartContract(data.scriptHash)}>
        <Row>
          <Title>{t("common.scriptHash")}: </Title>
          <Box width={"calc(100% - 100px)"} color={`${theme.palette.primary.main} !important`}>
            <DynamicEllipsisText customTruncateFold={[4, 4]} value={data.scriptHash || ""} isTooltip />
          </Box>
        </Row>
        <Row>
          <Title>{t("Version")}: </Title>
          <Value>
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
          <Title>{t("smartContract.totalTrx")}: </Title>
          <Value>{data.txCount || 0}</Value>
        </Row>
        <Row>
          <Title>{t("smartContract.trxPurpose")}: </Title>
          {data.txPurposes && data.txPurposes.length > 0
            ? data.txPurposes.map((item, index) => {
                return (
                  <Chip key={index}>
                    <Box display={"flex"} alignItems={"center"} height={"100%"}>
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
    // marginBottom: theme.spacing(1),
    height: 20
  };
});
