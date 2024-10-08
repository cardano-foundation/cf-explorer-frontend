import { useEffect, useRef } from "react";
import { Box, Container, Grid, useTheme } from "@mui/material";
import { t } from "i18next";
import { useUpdateEffect } from "react-use";
import Lottie from "react-lottie";

import "./index.css";
import {
  bodyBackground,
  bolnisiHeaderBackgroundDark,
  bolnisiHeaderBackgroundLight,
  bolnisiHeaderLaptop,
  bolnisiHeaderMobile,
  bolnisiHeaderTablet
} from "src/commons/resources";
import { MotionDiv } from "src/commons/animation/motion-div";
import { useScreen } from "src/commons/hooks/useScreen";

import Bolnisi_Animation_Light_Mode from "./resource/Bolnisi_Animation_Light_Mode.json";
import Bolnisi_Animation_Dark_Mode from "./resource/Bolnisi_Animation_Dark_Mode.json";
import bolnisiAnimationmobileLightMode from "./resource/Bolnisi_Animation_mobile_Light_Mode.png";
import BolnisiTrx from "./Transaction";

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

  const { isMobile } = useScreen();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: theme.isDark ? Bolnisi_Animation_Dark_Mode : Bolnisi_Animation_Light_Mode,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

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
                    {t("bolnisi.landing.info.header")}
                  </Box>
                  <Box
                    textAlign={"left"}
                    color={theme.isDark ? "#D3DFFA" : "#666666"}
                    fontSize={"0.875rem"}
                    lineHeight={"1.375rem"}
                    pt={3}
                  >
                    {t("bolnisi.landing.info.value.left")}
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
                    {t("bolnisi.landing.info.right.top1")}{" "}
                    <Box
                      component={"span"}
                      sx={{
                        color: theme.isDark ? "#64BCFD" : "#2F59DB"
                      }}
                    >
                      {t("bolnisi.landing.info.right.top.link")}
                    </Box>{" "}
                    {t("bolnisi.landing.info.right.top2")}
                  </Box>
                  <Box mt={2}>
                    {t("bolnisi.landing.info.right.bot1")}{" "}
                    <Box
                      component={"span"}
                      sx={{
                        color: theme.isDark ? "#64BCFD" : "#2F59DB"
                      }}
                    >
                      {t("bolnisi.landing.info.right.bot.link")}.
                    </Box>{" "}
                    {t("bolnisi.landing.info.right.bot2")}
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
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        marginX={"auto"}
        mt={5}
        sx={{
          [theme.breakpoints.down("md")]: {
            maxWidth: "100%",
            px: 5
          }
        }}
      >
        {!isMobile ? (
          <Lottie options={defaultOptions} width={"100%"} />
        ) : (
          <img alt="bolnisi " style={{ width: "100%" }} src={bolnisiAnimationmobileLightMode} />
        )}
      </Box>
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
