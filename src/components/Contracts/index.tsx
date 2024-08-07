import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ContractItem from "./common/ContractItem";
import { UnderlineText } from "./common/styles";
import SmartContractsInfoModal from "./modals/SmartContractsInfoModal";
import ContractDetail from "./ContractDetail";
import InfoSolidIcon from "../commons/InfoSolidIcon";

export interface ContractsListProps {
  data?: IContractItemTx[];
}

const ContractsList: React.FC<ContractsListProps> = ({ data }) => {
  const { t } = useTranslation();
  const { trxHash } = useParams<{ trxHash: string }>();
  const [openContractInfo, setOpenContactInfo] = useState(false);
  const [detailData, setDetailData] = useState<IContractItemTx>();

  const goToDetail = (detail: IContractItemTx) => {
    setDetailData(detail);
  };

  useEffect(() => {
    setDetailData(undefined);
  }, [trxHash]);

  return (
    <>
      {detailData ? (
        <ContractDetail onGoBack={() => setDetailData(undefined)} data={detailData} />
      ) : (
        <Grid container spacing={2}>
          <SmartContractsInfoModal open={openContractInfo} onClose={() => setOpenContactInfo(!openContractInfo)} />
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap="4px" flex={1}>
              <UnderlineText onClick={() => setOpenContactInfo(!openContractInfo)}>
                {t("explain.smartContract")}
              </UnderlineText>
              <InfoSolidIcon onClick={() => setOpenContactInfo(!openContractInfo)} />
            </Box>
          </Grid>
          {data &&
            data.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3}>
                <ContractItem onClick={goToDetail} data={item} index={index} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default ContractsList;
