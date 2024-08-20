import { useEffect, useRef } from "react";
import { Box, Button, Container, Grid, styled, useTheme } from "@mui/material";
import { t } from "i18next";
import { useUpdateEffect } from "react-use";
import CountUp from "react-countup";

import "./index.css";
import {
  bodyBackground,
  BolnisiDropdown,
  bolnisiHeaderBackgroundLight,
  bolnisiHeaderLaptop,
  bolnisiHeaderMobile,
  bolnisiHeaderTablet,
  bolnisiProgress
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
  const { isLaptop, isTablet } = useScreen();

  useUpdateEffect(() => {
    if (topRef.current) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [topRef.current]);
  return (
    <Box>
      <div
        style={{
          backgroundImage: `url(${bolnisiHeaderBackgroundLight})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: 300
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
              color={"#000"}
              fontSize={"clamp(3rem, 3.5vw, 4rem);"}
            >
              {t("bolnisi.landing.header")}
            </Box>
          </MotionDiv>
        </Container>
      </div>
      <Box
        component={MotionDiv}
        viewRate={0.2}
        maxWidth={"80%"}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        marginX={"auto"}
      >
        <img
          alt="bolnisi "
          style={{ width: "100%" }}
          src={isLaptop ? (isTablet ? bolnisiHeaderMobile : bolnisiHeaderTablet) : bolnisiHeaderLaptop}
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
                    color={theme.palette.primary.main}
                    textAlign={"left"}
                    fontSize={"clamp(2.25rem, 3vw, 2.5rem);"}
                    fontWeight={"bold"}
                  >
                    Traceability from grape to glass
                  </Box>
                  <Box textAlign={"left"} color={"#666666"} fontSize={"0.875rem"} lineHeight={"1.375rem"} pt={3}>
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
                  color={"000000"}
                  fontSize={"1.125rem"}
                  lineHeight={"1.875rem"}
                  width={"85%"}
                  sx={{
                    [theme.breakpoints.down("md")]: {
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
                        color: "#2F59DB",
                        [theme.breakpoints.down("md")]: {
                          color: theme.palette.secondary.light,
                          textDecoration: "underline"
                        }
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
                        color: "#2F59DB",
                        [theme.breakpoints.down("md")]: {
                          color: theme.palette.secondary.light,
                          textDecoration: "underline"
                        }
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
        component={MotionDiv}
        viewRate={0.2}
        maxWidth={"80%"}
        mt={6}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        marginX={"auto"}
      >
        <img style={{ width: "100%" }} alt="bolnisi " src={bolnisiProgress} />
      </Box>

      <Box
        className="bolnisi-body-background"
        width={"100%"}
        position={"relative"}
        sx={{
          "::after": { background: "#fff" },
          "::before": { background: "#fff" }
        }}
      >
        <Box
          component={"img"}
          sx={{ objectFit: "cover" }}
          minHeight={"320px"}
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
    { txHash: "536d38469c1m8fcewcn...77f0f8c7f8cwcw89cds", date: "11/16/2023", cert: "Conformity", amount: 1234 }
  ];

  return (
    <Box>
      <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Container maxWidth="md">
          <Box color={"#000000"} fontSize={"2.5rem"} lineHeight={"2.625rem"} mb={"5rem"}>
            Revolutionizing the wine industry with Cardano’s enterprise-grade blockchain
          </Box>
        </Container>
      </MotionDiv>

      <Grid
        container
        sx={{ width: "60%", [theme.breakpoints.down("lg")]: { width: "100%", pr: theme.spacing(2) } }}
        mx={"auto"}
        spacing={theme.breakpoints.down("lg") ? 2 : 6}
        mb={"5rem"}
      >
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Card count={100000} title="Bottles registered on-chain" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Card count={30} title="Wineries joining" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Card count={1000} title="Certificates issued" />
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
            sx={{ [theme.breakpoints.down("md")]: { flexDirection: "column" } }}
          >
            <Box color={theme.palette.primary.main} fontSize={"2.25rem"}>
              Recent Transactions
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{ cursor: "pointer", [theme.breakpoints.down("md")]: { mt: theme.spacing(1) } }}
              height={"44px"}
              width={"140px"}
              border={`2px solid ${theme.palette.primary.main}`}
              justifyContent={"center"}
              borderRadius={"100px"}
              color={theme.palette.primary.main}
            >
              <Box fontSize={"1rem"} fontWeight={"500"}>
                Conformity
              </Box>
              <BolnisiDropdown fill={theme.palette.primary.main} />
              {/* <Select
                label="Age"
                sx={{ height: 44, width: 140, borderRadius: 100, borderColor: theme.palette.primary.main }}
                hiddenLabel={true}
                IconComponent={() => (
                  <Box>
                  </Box>
                )}
                inputProps={{ style: { borderColor: theme.palette.primary.main } }}
              ></Select> */}
            </Box>
          </Box>
          <StyledTable columns={columns} data={data} minHeight={600} />
        </Box>
      </MotionDiv>
      <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Container maxWidth="md" sx={{ my: "5rem" }}>
          <Box color={theme.palette.primary.main} fontSize={"2.5rem"} lineHeight={"2.625rem"} fontWeight={"bold"}>
            Discover the full advantages of a future-proof blockchain to empower businessess
          </Box>

          <Box
            component={Button}
            variant="contained"
            bgcolor={theme.palette.primary.main}
            fontSize={"1rem"}
            height={"67px"}
            width={"186px"}
            borderRadius={"100px"}
            mt={"2rem"}
            color={"#fff"}
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
    <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Box px={3} py={4} bgcolor={"#F5F7FA"} borderRadius={"1.5rem"}>
        <Box
          color={theme.palette.primary.main}
          fontSize={"2.5rem"}
          lineHeight={"2.875rem"}
          fontWeight={500}
          textAlign={"left"}
        >
          <CountUp end={count} duration={2} />
          {count === 30 ? "+" : ""}
        </Box>
        <Box color={"#000000"} fontSize={"0.875rem"} lineHeight={"1rem"} textAlign={"left"} pt={1}>
          {title}
        </Box>
      </Box>
    </MotionDiv>
  );
};

const StyledTable = styled(Table)(({ theme }) => ({
  ".table-wrapper": { background: "transparent" },
  th: {
    background: "transparent",
    color: "#000000",
    borderBottom: "1px solid #E3E5E9",
    ":first-child": { marginLeft: "10px" }
  },
  td: { background: "transparent", color: "#000000" },
  "tbody > tr": {
    ":nth-child(2n)": {
      background: "#F5F7FA",
      borderRadius: theme.spacing(0.5),
      ":hover": { background: "#F5F7FA" }
    }
  }
}));
