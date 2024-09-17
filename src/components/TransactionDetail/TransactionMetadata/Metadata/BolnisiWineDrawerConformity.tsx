import { Box, useTheme, IconButton, styled, Grid, AccordionSummary, Drawer } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";

import { AvatarIcon, InvalidIcon, ShowMore, VerifiedIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

const dataMapping: Array<{ label: string; key: keyof Product }> = [
  { label: "Bottle Count", key: "bottle_count_in_lot" },
  { label: "Bottle Type", key: "bottle_type" },
  { label: "Bottle Volume", key: "bottle_volume" },
  { label: "Bottling Date", key: "bottling_date" },
  { label: "Colour", key: "color" },
  { label: "Delayed on Chacha", key: "delayed_on_chacha" },
  { label: "Grape Variety", key: "grape_variety" },
  { label: "Harvest Year", key: "harvest_year" },
  { label: "Lot Number", key: "lot_number" },
  { label: "Origin", key: "origin" },
  { label: "Sugar Content Category", key: "sugar_content_category" },
  { label: "Type", key: "type" },
  { label: "Viticulture Area", key: "viticulture_area" },
  { label: "Wine Name", key: "wine_name" }
];

export default function BolnisiWineDrawerConformity({
  openDrawer,
  setOpenDrawer,
  certNo
}: {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  certNo: string;
}) {
  const { trxHash } = useParams<{ trxHash: string }>();

  const theme = useTheme();
  const history = useHistory();
  const { data: dataConformity, loading } = useFetch<CertificateData>(
    openDrawer ? API.TRANSACTION.CERTIFICATE_DETAIL(trxHash, certNo) : ""
  );

  const infoFields = [
    { label: "Certificate No.", value: dataConformity?.offChainData?.certificate_number || "-" },
    { label: "Certificate Type", value: dataConformity?.offChainData?.certificate_type || "-" },
    { label: "Export country", value: dataConformity?.offChainData?.export_country || "-" },
    { label: "Company name", value: dataConformity?.offChainData?.company_name || "-" },
    { label: "Company RS Code", value: dataConformity?.offChainData?.company_rs_code || "-" },
    { label: "Exam Protocol Number", value: dataConformity?.offChainData?.exam_protocol_number || "-" },
    { label: "Tasting Protocol Number", value: dataConformity?.offChainData?.tasting_protocol_number || "-" }
  ];

  return (
    <ViewDetailDrawer
      sx={{ zIndex: 1000 }}
      anchor={"right"}
      open={openDrawer}
      variant="temporary"
      onClose={() => {
        setOpenDrawer(false);
        history.push(details.transaction(trxHash, "metadata"));
      }}
    >
      {loading ? (
        <CommonSkeleton variant="rectangular" width={"444px"} height={"100%"} />
      ) : (
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
              history.push(details.transaction(trxHash, "metadata"));
            }}
            data-testid="close-modal-button"
          >
            <IoMdClose color={theme.palette.secondary.light} />
          </CloseButton>
          <Box>
            <Header>
              <Box width={100} height={100} borderRadius={"50%"} mx={"auto"} position={"relative"}>
                <Box
                  width={100}
                  height={100}
                  sx={{
                    background: "#BD2F2D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%"
                  }}
                >
                  <CustomIcon height={68} width={48} icon={AvatarIcon} />
                </Box>
                {dataConformity?.signatureVerified ? (
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
                ) : (
                  <Box
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
                  </Box>
                )}
              </Box>

              <Box mt={2}>
                <Box
                  fontWeight={"bold"}
                  mb={1}
                  fontSize={20}
                  padding={"8px 10px 26px 10px"}
                  color={theme.palette.secondary.main}
                >
                  National Wine Agency
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
                          <ValueItem>{field.label === "Company name" ? "National Wine Agency" : field.value}</ValueItem>
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
                <HeadingDrawer>Products: {dataConformity?.offChainData?.products.length}</HeadingDrawer>
                <Box>
                  {dataConformity?.offChainData?.products.map((el, i) => {
                    return (
                      <Box key={i}>
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
                            <TitleAccordion>{el.lot_number}</TitleAccordion>
                          </AccordionSummary>
                          <Box sx={{ width: "100%" }}>
                            <Grid container sx={{ padding: "0 16px" }}>
                              {dataMapping.map((itemMapping, index) => {
                                const valueDelayedOnChacha = el["delayed_on_chacha"] ? "True" : "False";
                                const valueItem =
                                  itemMapping.key === "delayed_on_chacha"
                                    ? valueDelayedOnChacha
                                    : String(el[itemMapping.key] || "-");
                                return (
                                  <Grid
                                    container
                                    padding={"0 16px"}
                                    item
                                    xs={12}
                                    key={index}
                                    sx={{
                                      borderBottom: index === dataMapping.length - 1 ? "none:" : "1px dashed #ccc",
                                      padding: "17.5px 0px"
                                    }}
                                  >
                                    <Grid item xs={6}>
                                      <ItemListProduct>{itemMapping.label}</ItemListProduct>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <ValueItemListProduct>{valueItem}</ValueItemListProduct>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Box>
                        </Accordion>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
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
  margin: 0,
  textAlign: "start"
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
