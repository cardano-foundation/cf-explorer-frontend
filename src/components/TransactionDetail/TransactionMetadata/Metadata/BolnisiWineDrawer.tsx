import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, IconButton, Typography, alpha, styled, useTheme } from "@mui/material";
import converter from "number-to-words";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { t } from "i18next";
import { IoMdClose } from "react-icons/io";

import { BolsiniAddress, SeeMoreIconHome, VerifiedIcon } from "src/commons/resources";
import bolnisiImageDefault from "src/commons/resources/icons/bolsiniImageDefault.png";
import { details } from "src/commons/routers";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import CustomModal from "src/components/commons/CustomModal";
import { Column } from "src/types/table";
import Table from "src/components/commons/Table";
import { ViewDetailDrawer } from "src/components/commons/DetailView/styles";
import { TBody, TCol, THead, THeader, TableFullWidth } from "src/components/commons/Table/styles";

import { VerifyBadge } from ".";

const BolnisiWineDrawer = () => {
  const theme = useTheme();
  const history = useHistory();
  const { wineryId, trxHash } = useParams<{ wineryId: string; trxHash: string }>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedWine, setSelectedWine] = useState<BolnisiWineLots | null>(null);
  const [selectedIndexWine, setSelectedIndexWine] = useState<number>(0);
  const { hash } = useLocation();
  const { data, loading } = useFetch<WineryData>(
    wineryId && trxHash ? API.TRANSACTION.WINERY_DETAIL(trxHash, wineryId) : ""
  );

  useEffect(() => {
    if (wineryId) {
      setOpenDrawer(true);
    }
  }, [wineryId]);

  const renderLoading = () => {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  };

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
      <Box height={"100vh"} px={2} py={5} position={"relative"} bgcolor={theme.palette.secondary[0]}>
        <CloseButton
          onClick={() => {
            setOpenDrawer(false);
            history.push(details.transaction(trxHash, "metadata"));
          }}
          data-testid="close-modal-button"
        >
          <IoMdClose color={theme.palette.secondary.light} />
        </CloseButton>

        {loading && renderLoading()}

        {!loading && (
          <Box>
            <Header>
              <Box width={100} height={100} borderRadius={"50%"} mx={"auto"} position={"relative"}>
                <Box component={"img"} src={bolnisiImageDefault} width={100} height={100} borderRadius={"50%"} />
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
                <Box fontWeight={"bold"} mb={1} fontSize={20} color={theme.palette.secondary.main}>
                  Georgian Wine
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  <BolsiniAddress fill={theme.palette.secondary.light} />
                  <Box component={"span"} pl={0.5} fontSize={14} color={theme.palette.secondary.light} lineHeight={1}>
                    Sulkhan-Saba Orbeliani 79, Bolnisi
                  </Box>
                </Box>
              </Box>
            </Header>
            <Content
              sx={{
                maxHeight: "calc(100vh - 300px)"
              }}
              overflow={"auto"}
              mt={4}
            >
              <TableFullWidth>
                <Box component={THead} textAlign={"left"}>
                  <THeader>Wine Lot ID</THeader>
                  <THeader>Verification</THeader>
                  <Box component={THeader} textAlign={"center"}>
                    View Data
                  </Box>
                </Box>
                <TBody>
                  {(data?.lots || []).map((item, index) => {
                    return (
                      <Box
                        component={TRow}
                        textAlign={"left"}
                        key={index}
                        selected={hash.split("#") ? +(+hash.split("#")[1] === index) : 0}
                      >
                        <Box component={TCol} textTransform={"capitalize"} py={1}>
                          Wine Lot ID {converter.toWords(index + 1)}
                        </Box>
                        <Box component={TCol} py={1}>
                          <VerifyBadge status={item.signatureVerified} />
                        </Box>
                        <Box component={TCol} py={1} textAlign={"center"}>
                          <StyledLink
                            component={Button}
                            p={0}
                            minWidth={0}
                            m={0}
                            mx={"auto"}
                            onClick={() => {
                              setSelectedWine(item);
                              setSelectedIndexWine(index);
                            }}
                          >
                            <SeeMoreIconHome fill={theme.palette.primary.main} />
                          </StyledLink>
                        </Box>
                      </Box>
                    );
                  })}
                </TBody>
              </TableFullWidth>
            </Content>
            <WineDetailModal
              open={!!selectedWine}
              onClose={() => setSelectedWine(null)}
              wineData={selectedWine}
              indexWine={selectedIndexWine}
            />
          </Box>
        )}
      </Box>
    </ViewDetailDrawer>
  );
};

export default BolnisiWineDrawer;

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
const Header = styled(Box)(() => ({
  textAlign: "center"
}));

const Content = styled(Box)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    height: "3px",
    width: "5px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent"
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.light
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.primary[100]
    }
  }
}));

const StyledLink = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  &:hover {
    background: ${(props) => alpha(props.theme.palette.primary.main, 0.3)};
  }
`;

interface WineDetailModalProps {
  open: boolean;
  wineData: BolnisiWineLots | null;
  indexWine: number;
  onClose: () => void;
}

const WineDetailModal: React.FC<WineDetailModalProps> = ({ wineData, indexWine, ...props }) => {
  if (!wineData) return null;

  const { offChainData } = wineData;
  const keyData = Object.keys(mappingNameWineProperties);
  const dataTable: { index: number; property: string; value: string | number }[] = [];
  keyData.forEach((key, index) => {
    dataTable.push({
      index: index,
      property: mappingNameWineProperties[key as keyof typeof mappingNameWineProperties],
      value: offChainData[key as keyof typeof offChainData]
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: Column<{ index: number; property: string; value: string | number }>[] = [
    {
      title: "#",
      key: "index",
      minWidth: 30,
      render: (r) => r.index + 1
    },
    {
      title: "Property",
      minWidth: 150,
      key: "property",
      render: (r) => r.property
    },
    {
      title: "Value",
      minWidth: 150,
      key: "value",
      render: (r) => r.value
    }
  ];

  return (
    <CustomModal
      {...props}
      modalContainerProps={{
        style: { maxWidth: "min(1000px, 98vw)", width: "min(700px, 98vw)", boxSizing: "content-box" }
      }}
      style={{ maxHeight: "unset" }}
      title={
        <CIPLabel>
          <span>{t("bolnisi.titleModal")}</span>
        </CIPLabel>
      }
    >
      <Box>
        <CIPModalDesc display={"flex"} gap={2} alignItems={"center"} flexWrap={"wrap"}>
          <Box textTransform={"capitalize"}>Wine Lot ID: Wine Lot ID {converter.toWords(+(indexWine || 0) + 1)}</Box>
          <VerifyBadge status={wineData.signatureVerified} />
        </CIPModalDesc>

        <WineTable
          showPagination={false}
          isModal
          height="auto"
          isFullTableHeight={true}
          data={dataTable || []}
          columns={columns}
        />
      </Box>
    </CustomModal>
  );
};

const mappingNameWineProperties = {
  wine_name: t("bolnisi.wineName"),
  origin: t("bolnisi.origin"),
  country_of_origin: t("bolnisi.countryOfOrigin"),
  produced_by: t("bolnisi.producedBy"),
  producer_address: t("bolnisi.producerAddress"),
  producer_latitude: t("bolnisi.producerLatitude"),
  producer_longitude: t("bolnisi.producerLongitude"),
  varietal_name: t("bolnisi.varietalName"),
  vintage_year: t("bolnisi.vintageYear"),
  wine_type: t("bolnisi.wineType"),
  wine_color: t("bolnisi.wineColor"),
  harvest_date: t("bolnisi.harvestDate")
};

export const WineTable = styled(Table)(({ theme }) => ({
  marginBottom: "30px",
  "& .table-wrapper": {
    padding: `0 ${theme.spacing(2)}`,
    borderBottom: "0px",
    boxShadow: theme.shadow.card
  },
  "& td, th": {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    paddingTop: "18px",
    paddingBottom: "18px"
  },

  "& tr th:nth-child(4), & tr td:nth-child(4)": {
    borderLeft: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
  },

  "& tr th:nth-child(4), & tr th:nth-child(5), & tr th:nth-child(6), & tr td:nth-child(4), & tr td:nth-child(5), & tr td:nth-child(6) ":
    {
      backgroundColor: theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100]
    }
}));

export const CIPLabel = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90%"
  },
  span: {
    marginRight: "12px",
    fontSize: "32px"
  }
}));
export const CIPModalDesc = styled(Typography)`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.secondary.light};
  font-weight: 400;
  margin-bottom: 16px;
`;

const TRow = styled("tr")<{ selected?: number }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)} 0;
  font-size: 14px;
  position: relative;
  > td {
    background-color: ${({ selected, theme }) =>
      selected ? alpha(theme.palette.primary[200], 0.5) : "transparent"} !important;
    &:first-child {
      border: 1px solid ${({ selected, theme }) => (selected ? theme.palette.primary[200] : "transparent")} !important;
      border-right: none !important;
      border-top-left-radius: ${({ selected, theme }) => (selected ? theme.spacing(1) : "none")};
      border-bottom-left-radius: ${({ selected, theme }) => (selected ? theme.spacing(1) : "none")};
    }
    &:nth-child(2) {
      border: 1px solid ${({ selected, theme }) => (selected ? theme.palette.primary[200] : "transparent")} !important;
      border-right: none !important;
      border-left: none !important;
    }
    &:last-child {
      border: 1px solid ${({ selected, theme }) => (selected ? theme.palette.primary[200] : "transparent")} !important;
      border-left: none !important;
      border-top-right-radius: ${({ selected, theme }) => (selected ? theme.spacing(1) : "none")};
      border-bottom-right-radius: ${({ selected, theme }) => (selected ? theme.spacing(1) : "none")};
    }
  }

  &:hover {
    border-radius: 10px;
    > td {
      background-color: ${({ theme }) =>
        theme.isDark ? alpha(theme.palette.primary[100], 0.7) : theme.palette.primary[100]} !important;
    }
  }
`;
