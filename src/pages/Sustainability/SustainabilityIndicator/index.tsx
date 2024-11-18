import { ReactNode } from "react";
import { Box, Card, CardContent, Container, Divider, Grid, Typography, useTheme } from "@mui/material";

import { useScreen } from "src/commons/hooks/useScreen";

import { Content, StyledBox, StyledBoxContent, StyledBoxIcon, Title, Value } from "./styles";

interface SustainabilityProps {
  title: string;
  icon: ReactNode;
  bgColor: string;
  des1?: string;
  des2?: string;
  des3?: string;
  value1: string;
  value2?: string;
  value3?: string;
  content: string;
}
const SustainabilityIndicator = ({
  title,
  content,
  bgColor,
  des1,
  des2,
  des3,
  icon,
  value1,
  value2,
  value3
}: SustainabilityProps) => {
  const { isSmallScreen, isLaptop, isMobile } = useScreen();
  const theme = useTheme();

  const StyledText = ({ value, unit }) => {
    const cleanedValue = String(value).replace(new RegExp(unit, "i"), "");

    return (
      <Box display="flex">
        <Value>{cleanedValue}</Value>
        <Typography fontSize="20px" fontWeight={500} component="span" ml={1}>
          {unit === "kgCO2e" ? "kgCO" : "tCO"}
          <Box component="span" sx={{ fontSize: "0.6em", verticalAlign: "sub" }}>
            2
          </Box>
          e
        </Typography>
      </Box>
    );
  };

  const renderValue = (text) => {
    const containsCO2E = /tCO2e/i.test(text);
    const containsKGCO2E = /kgCO2e/i.test(text);

    if (containsCO2E) {
      return <StyledText value={text} unit="tCO2e" />;
    } else if (containsKGCO2E) {
      return <StyledText value={text} unit="kgCO2e" />;
    } else {
      return <Value>{text}</Value>;
    }
  };
  return (
    <Box>
      <Container maxWidth="lg" sx={{ height: "100%", mt: 8 }}>
        <Box mx={"auto"}>
          <Card sx={{ backgroundColor: theme.isDark ? "#24262E" : bgColor, borderRadius: 8, boxShadow: "none" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <StyledBox sx={{ padding: isSmallScreen ? 1 : 8 }}>
                    <StyledBoxIcon>{icon}</StyledBoxIcon>
                    <Typography
                      mt={2}
                      fontWeight="bold"
                      textAlign={"left"}
                      fontSize={isMobile ? "20px" : isLaptop ? "40px" : "48px"}
                      color={theme.isDark ? "#64BCFD" : "#000000"}
                    >
                      {title}
                    </Typography>
                    <Content>{content}</Content>
                  </StyledBox>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{
                    padding: isSmallScreen ? 0 : 8,
                    marginTop: isSmallScreen ? 0 : 8
                  }}
                >
                  <StyledBoxContent>
                    <Title fontSize={isMobile ? "16px" : isLaptop ? "20px" : "24px"}>{des1}</Title>
                    {renderValue(value1)}
                    <Divider />
                    <Title fontSize={isMobile ? "16px" : isLaptop ? "20px" : "24px"} mt={2}>
                      {des2}
                    </Title>
                    {renderValue(value2)}
                    {value2 ? <Divider /> : <></>}
                    <Title fontSize={isMobile ? "16px" : isLaptop ? "20px" : "24px"} sx={{ marginTop: 2 }}>
                      {des3}
                    </Title>
                    {renderValue(value3)}
                  </StyledBoxContent>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default SustainabilityIndicator;
