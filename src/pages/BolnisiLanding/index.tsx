import { useEffect, useRef } from "react";
import { Box, Button, Container, Grid, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { useUpdateEffect } from "react-use";
import CountUp from "react-countup";

import "./index.css";
import {
  bodyBackground,
  BolnisiDropdown,
  bolnisiHeaderBackgroundDark,
  bolnisiHeaderBackgroundLight,
  bolnisiHeaderLaptop,
  bolnisiHeaderMobile,
  bolnisiHeaderTablet
} from "src/commons/resources";
import { Column } from "src/types/table";
import Table from "src/components/commons/Table";
import { MotionDiv } from "src/commons/animation/motion-div";
import { getShortHash } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";

const BolnisiLanding = () => {
  useEffect(() => {
    document.title = `Bolnisi | Cardano Blockchain Explorer`;
  }, []);

  return (
    <Box>
      <Header />
      <ProgressSession />
      <BolnisiTrx />
    </Box>
  );
};

export default BolnisiLanding;

const Header = () => {
  const topRef = useRef<HTMLDivElement>();
  const { isLaptop, isMobile } = useScreen();
  const theme = useTheme();

  useUpdateEffect(() => {
    if (topRef.current) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [topRef.current]);
  return (
    <Box>
      <Box
        style={{
          backgroundImage: `url(${theme.isDark ? bolnisiHeaderBackgroundDark : bolnisiHeaderBackgroundLight})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
        sx={{
          height: 320
          // [theme.breakpoints.down("md")]: {
          //   height: "calc(100vh - 550px)"
          // }
        }}
      >
        <Container maxWidth="lg" style={{ height: "100%" }}>
          <MotionDiv initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ height: "100%" }}>
            <Box
              height={"100%"}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              color={theme.isDark ? "#F7F9FF" : "#000"}
              fontSize={"clamp(3rem, 3.5vw, 4rem);"}
              fontWeight={600}
              sx={{
                [theme.breakpoints.down("md")]: {
                  paddingY: "30px"
                }
              }}
            >
              {t("bolnisi.landing.header")}
            </Box>
          </MotionDiv>
        </Container>
      </Box>
      <Box
        component={MotionDiv}
        viewRate={0.2}
        maxWidth={"80%"}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        marginX={"auto"}
        sx={{
          [theme.breakpoints.down("md")]: {
            maxWidth: "100%",
            px: 2
          }
        }}
      >
        <img
          alt="bolnisi "
          style={{ width: "100%" }}
          src={isLaptop ? (isMobile ? bolnisiHeaderMobile : bolnisiHeaderTablet) : bolnisiHeaderLaptop}
        />
      </Box>
    </Box>
  );
};

const ProgressSession = () => {
  const theme = useTheme();

  return (
    <Box>
      <Container maxWidth="md" sx={{ height: "100%", mt: 8 }}>
        <Box mx={"auto"}>
          <Grid container>
            <Grid item md={6} sm={6} xs={12}>
              <MotionDiv initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ height: "100%" }}>
                <Box width={"80%"} height={"100%"}>
                  <Box
                    color={theme.isDark ? "#64BCFD" : theme.palette.primary.main}
                    textAlign={"left"}
                    fontSize={"clamp(2.25rem, 3vw, 2.5rem);"}
                    fontWeight={"bold"}
                  >
                    Traceability from grape to glass
                  </Box>
                  <Box
                    textAlign={"left"}
                    color={theme.isDark ? "#D3DFFA" : "#666666"}
                    fontSize={"0.875rem"}
                    lineHeight={"1.375rem"}
                    pt={3}
                  >
                    The advanced supply chain solution brings Georgian wines into the future with the help of the
                    Cardano blockchain.
                  </Box>
                </Box>
              </MotionDiv>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <MotionDiv initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <Box
                  className={"right-to-center"}
                  textAlign={"left"}
                  color={theme.isDark ? "#F7F9FF" : "000000"}
                  fontSize={"1.125rem"}
                  lineHeight={"1.875rem"}
                  width={"85%"}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      mt: 4
                    }
                  }}
                >
                  <Box>
                    Thanks to Cardano’s unique features, the Traceability Program tracks, certifies, and authenticates
                    Georgian wines, ensuring they comply with the commercial industry standard set by the{" "}
                    <Box
                      component={"span"}
                      sx={{
                        color: theme.isDark ? "#64BCFD" : "#2F59DB"
                      }}
                    >
                      International Organisation of Vine and Wine
                    </Box>{" "}
                    (OIV). All the while increasing consumer engagement and trust.
                  </Box>
                  <Box mt={2}>
                    The pilot for the Bolnisi region includes more than 30 wineries with several thousand wine bottles
                    already registered on the Cardano blockchain. This innovative track and trace solution creates
                    verifiable on-chain records for the detailed supply chain data provided by the wineries, plus the
                    certificates of conformity issued by Georgia’s{" "}
                    <Box
                      component={"span"}
                      sx={{
                        color: theme.isDark ? "#64BCFD" : "#2F59DB"
                      }}
                    >
                      National Wine Agency
                    </Box>{" "}
                    . It creates a tamper-proof certification that is easy to validate and not only fights
                    counterfeiting but also gives greater visibility to the wines’ premium quality.
                  </Box>
                </Box>
              </MotionDiv>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        className="bolnisi-body-background"
        width={"100%"}
        position={"relative"}
        sx={{
          "::after": { background: theme.isDark ? "#131316" : "#fff" },
          "::before": { background: theme.isDark ? "#131316" : "#fff" }
        }}
      >
        <Box
          component={"img"}
          sx={{ minHeight: "320px", objectFit: "cover", [theme.breakpoints.down("md")]: { minHeight: "450px" } }}
          width={"100%"}
          src={bodyBackground}
          alt="background body"
        />
      </Box>
    </Box>
  );
};

interface BolnisiTx {
  txHash: string;
  date: string;
  cert: string;
  amount: number;
}

const BolnisiTrx = () => {
  const theme = useTheme();

  const columns: Column<BolnisiTx>[] = [
    {
      title: <Box data-testid="bolnisi.landing.table.txHash">{t("bolnisi.landing.table.txHash")}</Box>,
      key: "no",
      render: (r) => <Box color={theme.palette.primary.main}>{getShortHash(r.txHash)}</Box>
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
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 },
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 }
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
            Revolutionizing the wine industry with Cardano’s enterprise-grade blockchain
          </Box>
        </Container>
      </MotionDiv>

      <Grid
        container
        sx={{
          width: "60%",
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
              <Card count={100000} title="Bottles registered on-chain" />
            </Box>
          </MotionDiv>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ height: "100%" }}>
            <Box height={"100%"} bgcolor={theme.isDark ? "#24262E" : "#F5F7FA"} borderRadius={"1.5rem"}>
              <Card count={30} title="Wineries joining" />
            </Box>
          </MotionDiv>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ height: "100%" }}>
            <Box height={"100%"} bgcolor={theme.isDark ? "#24262E" : "#F5F7FA"} borderRadius={"1.5rem"}>
              <Card count={1000} title="Certificates issued" />
            </Box>
          </MotionDiv>
        </Grid>
      </Grid>
      <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Box
          mx={"auto"}
          sx={{
            width: "60%",
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
              Recent Transactions
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
            Discover the full advantages of a future-proof blockchain to empower businessess
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
            Read Case Study
          </Box>
        </Container>
      </MotionDiv>
    </Box>
  );
};

const Card = ({ count, title }: { count: number; title: string }) => {
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
        <CountUp end={count} duration={2} />
        {count === 30 ? "+" : ""}
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
