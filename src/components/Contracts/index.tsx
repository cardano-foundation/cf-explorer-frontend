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
  const _dataProposing = data?.map((item) => ({
    ...item,
    purpose: "PROPOSING",
    governanceAction: "Treasury Withdrawal",
    submissionDate: "03/19/2024 15:40:11",
    expireDate: "04/19/2024 15:40:11",
    proposalPolicy: "1234567443445141436541256435236342",
    governanceActionMetadata: "1111111111111111111111111111111111",
    voterType: "DRep",
    vote: "YES",
    dRepId: "12345678901234567890123456789012345678912551324456932154",
    proposalLink: "https://hornan7.github.io/proposal.txt"
  }));
  const _dataVoting = data?.map((item) => ({
    ...item,
    purpose: "VOTING",
    governanceAction: "Treasury Withdrawal",
    submissionDate: "03/19/2024 15:40:11",
    expireDate: "04/19/2024 15:40:11",
    proposalPolicy: "1234567443445141436541256435236342",
    governanceActionMetadata: "1111111111111111111111111111111111",
    voterType: "DRep",
    vote: "YES",
    dRepId: "312413245213123456789012345678901234567890123456789125513244569321543332143543535345"
  }));
  const _data = _dataProposing?.concat(_dataVoting);

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
          {_data &&
            _data.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3}>
                <ContractItem onClick={goToDetail} data={item} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default ContractsList;
