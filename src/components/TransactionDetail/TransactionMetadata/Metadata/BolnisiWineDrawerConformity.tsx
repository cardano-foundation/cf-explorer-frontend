import { Box, useTheme, IconButton, styled, Grid, AccordionSummary, Drawer } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import { ShowMore, VerifiedIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";

import DefaultImageWine from "./DefaultImageWine";

const data = {
  certificate_number: "93828",
  certificate_type: "Conformity",
  export_country: "Georgia",
  company_name: "National Wine Agency",
  company_rs_code: "-",
  exam_protocol_number: "-",
  tasting_protocol_number: "-"
};

const data1 = [
  { label: "Bottle Count", value: "500" },
  { label: "Bottle Type", value: "A" },
  { label: "Bottle Volume", value: "0.75" },
  { label: "Bottling Date", value: "2023-05-10" },
  { label: "Colour", value: "Red" },
  { label: "Delayed on Chacha", value: "False" },
  { label: "Grape Variety", value: "Saperavi" },
  { label: "Harvest Year", value: "2022" },
  { label: "Lot Number", value: "202345161616" },
  { label: "Origin", value: "Georgia" },
  { label: "Sugar Content Category", value: "Dry" },
  { label: "Type", value: "Red" },
  { label: "Viticulture Area", value: "Kakheti" },
  { label: "Wine Name", value: "Saperavi" }
];

export default function BolnisiWineDrawerConformity() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);

  const theme = useTheme();

  const infoFields = [
    { label: "Certificate No.", value: data.certificate_number },
    { label: "Certificate Type", value: data.certificate_type },
    { label: "Export country", value: data.export_country },
    { label: "Company name", value: data.company_name },
    { label: "Company RS Code", value: data.company_rs_code || "-" },
    { label: "Exam Protocol Number", value: data.exam_protocol_number || "-" },
    { label: "Tasting Protocol Number", value: data.tasting_protocol_number || "-" }
  ];

  return (
    <ViewDetailDrawer
      sx={{ zIndex: 1000 }}
      anchor={"right"}
      open={openDrawer}
      variant="temporary"
      onClose={() => {
        setOpenDrawer(false);
        // history.push(details.transaction(trxHash, "metadata"));
      }}
    >
      <Box
        height={"100%"}
        position={"relative"}
        sx={{
          [theme.breakpoints.up("md")]: {
            minWidth: 420
          }
        }}
        bgcolor={theme.isDark ? "#0000" : "#FFF"}
      >
        <CloseButton
          onClick={() => {
            setOpenDrawer(false);
            // history.push(details.transaction(trxHash, "metadata"));
          }}
          data-testid="close-modal-button"
        >
          <IoMdClose color={theme.palette.secondary.light} />
        </CloseButton>
        <Box>
          <Header>
            <Box width={100} height={100} borderRadius={"50%"} mx={"auto"} position={"relative"}>
              <DefaultImageWine width={"100px"} height={"100px"} fontSize="36px" name={"khanh" || ""} />

              {/* <Box
            position={"absolute"}
            width={32}
            height={32}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            bgcolor={theme.palette.warning[700]}
            borderRadius={"50%"}
            bottom={0}
            right={0}
          >
            <InvalidIcon fill={theme.palette.secondary.main} />
          </Box> */}

              <Box
                position={"absolute"}
                width={32}
                height={32}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                bgcolor={theme.palette.success[700]}
                borderRadius={"50%"}
                bottom={0}
                right={0}
              >
                <VerifiedIcon width={20} height={20} />
              </Box>
            </Box>

            <Box mt={2}>
              <Box
                fontWeight={"bold"}
                mb={1}
                fontSize={20}
                padding={"8px 10px 26px 10px"}
                color={theme.palette.secondary.main}
              >
                J-97
              </Box>
            </Box>
          </Header>
          <Box sx={{ backgroundColor: theme.isDark ? "#000" : "#fff" }}>
            <Box sx={{ padding: "19.5px" }}>
              <HeadingDrawer>Certificate of Conformity Info</HeadingDrawer>
              <Grid container sx={{ border: "1px solid #CCCCCC", borderRadius: "16px", padding: "0 16px" }}>
                {infoFields.map((field, index) => (
                  <Grid
                    item
                    xs={12}
                    key={index}
                    sx={{
                      borderBottom: index !== infoFields.length - 1 ? "1px dashed #ccc" : "none",
                      padding: "17.5px 0px"
                    }}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <TitleItem>{field.label}</TitleItem>
                      </Grid>
                      <Grid item>
                        <ValueItem>{field.value}</ValueItem>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                padding: "19.5px"
              }}
            >
              <HeadingDrawer>Products: 2</HeadingDrawer>
              <Box>
                <Accordion>
                  <AccordionSummary
                    sx={{
                      border: "none",
                      "&.Mui-expanded": {
                        borderBottom: "1px solid #CCCC"
                      }
                    }}
                    expandIcon={<CustomIcon width={24} icon={ShowMore} fill={theme.isDark ? "#fff" : "#000"} />}
                  >
                    <TitleAccordion>Lot Number:</TitleAccordion>
                    <TitleAccordion>123456</TitleAccordion>
                  </AccordionSummary>
                  <Box sx={{ width: "100%" }}>
                    <Grid container sx={{ padding: "0 16px" }}>
                      {data1.map((item, index) => (
                        <Grid
                          container
                          padding={"0 16px"}
                          item
                          xs={12}
                          key={index}
                          sx={{
                            borderBottom: index === data1.length - 1 ? "none:" : "1px dashed #ccc",
                            padding: "17.5px 0px"
                            // marginBottom: index !== infoFields.length - 1 ? "17.5px" : "0"
                          }}
                        >
                          <Grid item xs={6}>
                            <ItemListProduct>{item.label}</ItemListProduct>
                          </Grid>
                          <Grid item xs={6}>
                            <ValueItemListProduct>{item.value}</ValueItemListProduct>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{
                      border: "none",
                      "&.Mui-expanded": {
                        borderBottom: "1px solid #CCCC"
                      }
                    }}
                    expandIcon={<CustomIcon width={24} icon={ShowMore} fill={theme.isDark ? "#fff" : "#000"} />}
                  >
                    <TitleAccordion>Lot Number:</TitleAccordion>
                    <TitleAccordion>123456</TitleAccordion>
                  </AccordionSummary>
                  <Box sx={{ width: "100%" }}>
                    <Grid container sx={{ padding: "0 16px" }}>
                      {data1.map((item, index) => (
                        <Grid
                          container
                          padding={"0 16px"}
                          item
                          xs={12}
                          key={index}
                          sx={{
                            borderBottom: index === data1.length - 1 ? "none:" : "1px dashed #ccc",
                            padding: "17.5px 0px"
                            // marginBottom: index !== infoFields.length - 1 ? "17.5px" : "0"
                          }}
                        >
                          <Grid item xs={6}>
                            <ItemListProduct>{item.label}</ItemListProduct>
                          </Grid>
                          <Grid item xs={6}>
                            <ValueItemListProduct>{item.value}</ValueItemListProduct>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ViewDetailDrawer>
  );
}

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  width: 30,
  height: 30,
  padding: 0,
  border: `1px solid ${theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary[600]}`,
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    right: 15,
    zIndex: 10
  }
}));

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.isDark ? "#303030" : "#F6F9FF",
  textAlign: "center",
  borderBottom: `1px solid ${theme.mode === "light" ? "#D6E2FF" : theme.palette.secondary[600]}`,
  paddingTop: "40px"
}));

export const HeadingDrawer = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: "left",
  fontSize: "18px",
  fontWeight: "500",
  marginBottom: "12px",
  display: "block"

  //   [theme.breakpoints.down("md")]: {
  //     fontSize: "48px"
  //   },
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "36px"
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     fontSize: "28px"
  //   }
}));

export const TitleItem = styled("p")(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: "left",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0"
}));

export const ValueItem = styled("p")(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "16px",
  fontWeight: "400",
  padding: 0,
  margin: 0
}));

export const ViewDetailDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: 1302,
  "& .MuiDrawer-paper": {
    background: `${theme.palette.secondary[0]}`,
    border: "none",
    height: "100%",
    boxShadow: theme.shadow.rightDraw,
    maxWidth: "444px",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      height: "calc(100% - 76px)",
      top: "76px"
    },
    [theme.breakpoints.down("sm")]: {
      right: "auto",
      width: "100%",
      overflowY: "hidden"
    }
  },
  "& .MuiModal-backdrop": {
    background: "transparent"
  }
}));

const Accordion = styled((props: AccordionProps) => <MuiAccordion elevation={0} square {...props} />)(({ theme }) => ({
  border: "1px solid #CCCC",
  borderRadius: "16px",
  backgroundColor: theme.isDark ? "#000" : "#fff",
  marginBottom: 0,

  "&.Mui-expanded": {
    borderBottom: "1px solid #CCCC"
  },

  "&::before": {
    display: "none"
  }
}));

export const ItemListProduct = styled("span")(({ theme }) => ({
  display: "block",
  color: theme.palette.secondary.main,
  textAlign: "start",
  fontSize: "16px",
  fontWeight: "400",
  margin: "0"
}));

export const ValueItemListProduct = styled("span")(({ theme }) => ({
  display: "block",
  color: theme.palette.secondary.main,
  textAlign: "end",
  fontSize: "16px",
  fontWeight: "400",
  margin: "0"
}));

export const TitleAccordion = styled("span")(({ theme }) => ({
  display: "block",
  color: theme.palette.secondary.main,
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
  paddingRight: "30px"
}));
