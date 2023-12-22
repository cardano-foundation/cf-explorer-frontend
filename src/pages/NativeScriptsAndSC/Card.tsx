import { Box, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { details } from "src/commons/routers";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";

const NativeScriptCard: React.FC<{ data: NativeScriptsList }> = () => {
  return <Item></Item>;
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
              return <Chip key={index}>{item}</Chip>;
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
    fontSize: 12
  };
});
