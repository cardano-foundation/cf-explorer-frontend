import { Box, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { TimeLock } from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";

const NativeScriptCard: React.FC<{ data: NativeScriptsList }> = ({ data }) => {
  const theme = useTheme();

  return (
    <Item>
      <Box p={2} height={"100%"}>
        <Row>
          <Title>{t("common.scriptHash")}: </Title>
          <Box
            width={"calc(100% - 100px)"}
            component={Link}
            to={details.nativeScriptDetail(data.scriptHash)}
            color={`${theme.palette.primary.main} !important`}
          >
            <DynamicEllipsisText value={data.scriptHash || ""} isTooltip />
          </Box>
        </Row>
        <Row>
          <Title>{t("nativeScript.timeLock")}: </Title>
          <Value>
            {data.before || data.after ? (
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <>{formatDateTimeLocal(data.before || data.after)}</>
                <TimeLock fill={theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600]} />
              </Box>
            ) : (
              t("common.N/A")
            )}
          </Value>
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
                <CustomTooltip
                  key={index}
                  title={item.displayName || item.name || getShortHash(item.fingerprint) || ""}
                >
                  <Link to={details.token(item.fingerprint)}>
                    <Chip pl={`${item.metadata && item.metadata.logo ? "4px" : 1} !important`}>
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
                        <Box overflow={"hidden"} textOverflow={"ellipsis"}>
                          {item.displayName || item.name || getShortHash(item.fingerprint) || ""}
                        </Box>
                      </Box>
                    </Chip>
                  </Link>
                </CustomTooltip>
              );
            })}
          {(data.numberOfTokens || 0) > (data.tokens || []).length && (
            <Link to={details.nativeScriptDetail(data.scriptHash, "token")}>
              <Chip>
                <Box display={"flex"} alignItems={"center"} height={"100%"}>
                  {`+${(data.numberOfTokens || 0) - (data.tokens || []).length} More`}
                </Box>
              </Chip>
            </Link>
          )}
          {data.tokens && data.tokens.length === 0 && (
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

  return (
    <Item>
      <Box p={2} height={"100%"}>
        <Row>
          <Title>{t("common.scriptHash")}: </Title>
          <Box
            width={"calc(100% - 100px)"}
            component={Link}
            to={details.smartContract(data.scriptHash)}
            color={`${theme.palette.primary.main} !important`}
          >
            <DynamicEllipsisText value={data.scriptHash || ""} isTooltip />
          </Box>
        </Row>
        <Row>
          <Title>{t("Version")}: </Title>
          <Value>{data.scriptVersion || ""}</Value>
        </Row>
        <Row>
          <Title>{t("smartContract.totalTrx")}: </Title>
          <Value>{data.txCount || 0}</Value>
        </Row>
        <Row>
          <Title>{t("smartContract.trxPurpose")}: </Title>
          {data.txPurposes &&
            data.txPurposes.map((item, index) => {
              return (
                <Chip key={index}>
                  <Box display={"flex"} alignItems={"center"} height={"100%"}>
                    {item}
                  </Box>
                </Chip>
              );
            })}
        </Row>
      </Box>
    </Item>
  );
};

export { SmartContractCard, NativeScriptCard };

const Item = styled(Card)<{ smallItem?: boolean }>`
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
    marginBottom: theme.spacing(1),
    height: 20
  };
});
