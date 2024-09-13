import { ReactNode } from "react";
import { Box, Card, CardContent, Container, Divider, Grid, Typography, useTheme } from "@mui/material";

import { useScreen } from "src/commons/hooks/useScreen";

import { StyledBox, StyledBoxIcon, StyledCard, Title, Value } from "./styles";

interface MicarProps {
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
const MicarIndicator = ({ title, content, bgColor, des1, des2, des3, icon, value1, value2, value3 }: MicarProps) => {
  const { isSmallScreen, isLaptop, isMobile } = useScreen();
  const theme = useTheme();

  return (
    <Box>
      <Container maxWidth="lg" sx={{ height: "100%", mt: 8 }}>
        <Box mx={"auto"}>
          <Card sx={{ backgroundColor: theme.isDark ? "#24262E" : bgColor, borderRadius: 8, boxShadow: "none" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledBox sx={{ padding: isSmallScreen ? 1 : 8 }}>
                    <StyledBoxIcon
                      sx={{
                        backgroundColor: theme.isDark ? "#2E303B" : "#FFFFFF"
                      }}
                    >
                      {icon}
                    </StyledBoxIcon>
                    <Typography
                      mt={2}
                      fontWeight="bold"
                      textAlign={"left"}
                      fontSize={isMobile ? "20px" : isLaptop ? "40px" : "48px"}
                      color={theme.isDark ? "#64BCFD" : "#000000"}
                    >
                      {title}
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      lineHeight={2}
                      variant="body2"
                      color={theme.isDark ? "#F7F9FF" : "#000000"}
                      sx={{ marginTop: 2 }}
                      textAlign={"left"}
                      maxWidth={500}
                    >
                      {content}
                    </Typography>
                  </StyledBox>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    padding: isSmallScreen ? 0 : 8,
                    marginTop: isSmallScreen ? 0 : 8
                  }}
                >
                  <StyledCard>
                    <Title fontSize={isMobile ? "16px" : isLaptop ? "20px" : "24px"}>{des1}</Title>
                    <Value>{value1}</Value>
                    <Divider />
                    <Title fontSize={isMobile ? "16px" : isLaptop ? "20px" : "24px"} mt={2}>
                      {des2}
                    </Title>
                    <Value>{value2}</Value>
                    {value2 ? <Divider /> : <></>}
                    <Title fontSize={isMobile ? "16px" : isLaptop ? "20px" : "24px"} sx={{ marginTop: 2 }}>
                      {des3}
                    </Title>
                    <Value> {value3}</Value>
                  </StyledCard>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default MicarIndicator;
