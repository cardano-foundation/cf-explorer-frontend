import { Box, Button, Container, Grid, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { useHistory } from "react-router-dom";

import { MotionDiv } from "src/commons/animation/motion-div";
import { BolnisiDropdown } from "src/commons/resources";
import { details } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";

import bolnisiInfo from "./bolnisiInfo.json";

interface BolnisiTx {
  txHash: string;
  date: string;
  cert: string;
  amount: number;
}

const BolnisiTrx = () => {
  const theme = useTheme();
  const history = useHistory();
  const columns: Column<BolnisiTx>[] = [
    {
      title: <Box data-testid="bolnisi.landing.table.txHash">{t("bolnisi.landing.table.txHash")}</Box>,
      key: "no",
      render: (r) => (
        <Box
          color={theme.palette.primary.main}
          onClick={() => history.push(details.transaction(r.txHash, "metadata"))}
          sx={{ cursor: "pointer" }}
        >
          {getShortHash(r.txHash)}
        </Box>
      )
    },
    {
      title: <Box data-testid="bolnisi.landing.table.date">{t("bolnisi.landing.table.date")}</Box>,
      key: "no",
      render: (r) => <Box>{r.date}</Box>
    },

    {
      title: (
        <Box data-testid="bolnisi.landing.table.cert" component="span">
          {t("bolnisi.landing.table.cert")}
        </Box>
      ),
      key: "value",
      minWidth: "120px",
      render: (r) => <Box>{r.cert}</Box>
    },
    {
      title: (
        <Box data-testid="bolnisi.landing.table.amount" component="span">
          {t("bolnisi.landing.table.amount")}
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{r.amount}</Box>
    }
  ];

  const data = [
    {
      txHash: "a9474320cc89c4c86558ead4a2e6c90113ac687eea63ad562d36ee1462a71c40",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "f1b124c1be12e484fcc7c9bfc210ac0501ec7b4ff387707584b989546844dd29",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "4c5a896ec4a76b947b08f03cbe988b4dfb0068d5d9367431a1856e84623bb20c",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "c717dce01998ce714886649dc4681053cc527013002a912ceb4e4400296e1145",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "f1b124c1be12e484fcc7c9bfc210ac0501ec7b4ff387707584b989546844dd29",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "0beec12e8d65d922eee9b0510fe8aadde19e813be158796112b126e1cad56e2f",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "1b0c149a78e544ad1a1bcdf6d471294695dcbb3793783d68f7cad6ec8ceeb7d7",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "4072199d747ae5b1f882ed2e200c4d5aaa8c20485111774396aa486d23456c6f",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "e5213469590eee4e75d437d1ffbbe9ffc490f2e78b57f992b975a72146e77d85",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "8ed32fad1d88367a743be7a36a7105b7be864c98decbf306c45e497ef41357e2",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    },
    {
      txHash: "969c9141d978b305244b68b92c18aa323cd94f05ff67133af2f070d3e358705e",
      date: "11/16/2023",
      cert: "Conformity",
      amount: 1234
    }
  ];

  return (
    <Box>
      <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Container maxWidth="md">
          <Box
            color={theme.isDark ? "#F7F9FF" : "#000000"}
            fontSize={"2.5rem"}
            lineHeight={"2.625rem"}
            mb={"5rem"}
            fontWeight={600}
          >
            {t("bolnisi.landing.table.title")}
          </Box>
        </Container>
      </MotionDiv>

      <Grid
        container
        sx={{
          width: "65%",
          [theme.breakpoints.down("lg")]: { width: "90%", pr: theme.spacing(2) },
          [theme.breakpoints.down("sm")]: { width: "100%", pr: theme.spacing(2) }
        }}
        mx={"auto"}
        spacing={theme.breakpoints.down("lg") ? 2 : 6}
        mb={"5rem"}
      >
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ height: "100%" }}>
            <Box height={"100%"} bgcolor={theme.isDark ? "#24262E" : "#F5F7FA"} borderRadius={"1.5rem"}>
              <Card count={bolnisiInfo.bottlesRegisteredOnChain} title={t("bolnisi.landing.card.title1")} />
            </Box>
          </MotionDiv>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ height: "100%" }}>
            <Box height={"100%"} bgcolor={theme.isDark ? "#24262E" : "#F5F7FA"} borderRadius={"1.5rem"}>
              <Card count={bolnisiInfo.wineriesJoining} title={t("bolnisi.landing.card.title2")} />
            </Box>
          </MotionDiv>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ height: "100%" }}>
            <Box height={"100%"} bgcolor={theme.isDark ? "#24262E" : "#F5F7FA"} borderRadius={"1.5rem"}>
              <Card count={bolnisiInfo.certificatesIssued} title={t("bolnisi.landing.card.title3")} />
            </Box>
          </MotionDiv>
        </Grid>
      </Grid>
      <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Box
          mx={"auto"}
          sx={{
            width: "80%",
            [theme.breakpoints.down("lg")]: { width: "90%" },
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              width: "calc(100% - 32px)",
              padding: theme.spacing(2)
            }
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ px: 2, [theme.breakpoints.down("sm")]: { flexDirection: "column" } }}
          >
            <Box color={theme.isDark ? "#64BCFD" : theme.palette.primary.main} fontSize={"2.25rem"} fontWeight={"bold"}>
              {t("bolnisi.landing.table.trxRecent")}
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{ cursor: "pointer", [theme.breakpoints.down("md")]: { mt: theme.spacing(1) } }}
              height={"44px"}
              width={"140px"}
              border={`2px solid ${theme.isDark ? "#64BCFD" : theme.palette.primary.main}`}
              justifyContent={"center"}
              borderRadius={"100px"}
              color={theme.isDark ? "#64BCFD" : theme.palette.primary.main}
            >
              <Box fontSize={"1rem"} fontWeight={"500"}>
                Conformity
              </Box>
              <BolnisiDropdown fill={theme.palette.primary.main} />
            </Box>
          </Box>
          <StyledTable
            columns={columns}
            data={data}
            minHeight={780}
            pagination={{
              size: 10,
              total: data.length || 0
            }}
            total={{ count: data.length || 0, title: "" }}
            loading={false}
          />
        </Box>
      </MotionDiv>
      <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Container maxWidth="md" sx={{ my: "5rem" }}>
          <Box
            color={theme.isDark ? "#64BCFD" : theme.palette.primary.main}
            fontSize={"2.5rem"}
            lineHeight={"2.625rem"}
            fontWeight={"bold"}
          >
            {t("bolnisi.landing.footer.title")}
          </Box>

          <Box
            component={Button}
            variant="contained"
            bgcolor={theme.isDark ? "#65BDFE" : theme.palette.primary.main}
            fontSize={"1rem"}
            height={"67px"}
            width={"186px"}
            borderRadius={"100px"}
            mt={"2rem"}
            color={theme.isDark ? "#24262E" : "#fff"}
            textTransform={"capitalize"}
          >
            {t("bolnisi.landing.footer.btn")}
          </Box>
        </Container>
      </MotionDiv>
    </Box>
  );
};
export default BolnisiTrx;

const Card = ({ count, title }: { count: number | string; title: string }) => {
  const theme = useTheme();
  return (
    <Box px={3} py={4}>
      <Box
        color={theme.isDark ? "#64BCFD" : theme.palette.primary.main}
        fontSize={"2.5rem"}
        lineHeight={"2.875rem"}
        fontWeight={500}
        sx={{ textAlign: "left", [theme.breakpoints.down("md")]: { textAlign: "center" } }}
      >
        {count}
      </Box>
      <Box
        color={theme.isDark ? "#F7F9FF" : "#000000"}
        fontSize={"0.875rem"}
        lineHeight={"1rem"}
        sx={{ textAlign: "left", [theme.breakpoints.down("md")]: { textAlign: "center" } }}
        pt={1}
      >
        {title}
      </Box>
    </Box>
  );
};

const StyledTable = styled(Table)(({ theme }) => ({
  ".table-wrapper": { background: "transparent" },

  th: {
    background: "transparent",
    color: theme.isDark ? "#F7F9FF" : "#000000",
    borderBottom: "1px solid #E3E5E9",
    fontWeight: "normal",
    ":first-child": { marginLeft: "10px" }
  },
  td: { background: "transparent", color: theme.isDark ? "#F7F9FF" : "#000000" },
  "tbody > tr": {
    ":nth-child(2n)": {
      background: theme.isDark ? "#23262E" : "#F5F7FA",
      borderRadius: theme.spacing(0.5),
      ":hover": { background: theme.isDark ? "#23262E" : "#F5F7FA" }
    }
  },
  "div:last-child": {
    "> div": {
      color: theme.isDark ? "#F7F9FF" : "#000000"
    },
    "> div > div > div": {
      color: theme.isDark ? "#F7F9FF" : "#000000"
    },
    "> nav > ul > li > div > span": {
      color: theme.isDark ? "#F7F9FF" : "#000000"
    },
    "> nav > ul > li > div > input": {
      color: theme.isDark ? "#F7F9FF" : "#000000"
    }
  }
}));
