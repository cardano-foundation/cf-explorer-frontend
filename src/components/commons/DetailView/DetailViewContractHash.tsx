import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CgClose } from "react-icons/cg";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import ContractDiagrams from "src/components/ContractDiagrams";

import CustomTooltip from "../CustomTooltip";
import NoRecord from "../NoRecord";
import {
  CloseButton,
  DetailLabel,
  DetailLabelSkeleton,
  DetailValue,
  DetailValueSkeleton,
  DetailsInfoItem,
  Group,
  HeaderContainer,
  ProgressSkeleton,
  ViewDetailContainer,
  ViewDetailContainerContractHash,
  ViewDetailDrawerContractHash,
  ViewDetailHeader,
  ViewDetailScroll,
  ViewDetailScrollContractHash
} from "./styles";

type DetailViewEpochProps = {
  handleClose: () => void;
  txHash: string;
  address: string;
  open?: boolean;
};

const DetailViewContractHash: React.FC<DetailViewEpochProps> = ({ txHash, handleClose, address, open }) => {
  const { t } = useTranslation();
  const [urlFetch, setUrlFetch] = useState("");
  const { data, loading, initialized } = useFetch<IContractItemTx[]>(urlFetch, undefined, false);
  const theme = useTheme();

  useEffect(() => {
    if (!txHash) {
      setUrlFetch("");
    } else {
      setUrlFetch(API.TRANSACTION.HASH_CONTRACT(txHash, address));
    }
  }, [txHash, address]);

  const renderContent = () => {
    if (loading || !initialized) {
      return (
        <>
          <ViewDetailHeader />
          <ViewDetailContainer>
            <ViewDetailScroll>
              <HeaderContainer>
                <ProgressSkeleton variant="circular" />
              </HeaderContainer>
              <Group>
                {new Array(4).fill(0).map((_, index) => {
                  return (
                    <DetailsInfoItem key={index}>
                      <DetailLabel>
                        <DetailValueSkeleton variant="rectangular" />
                      </DetailLabel>
                      <DetailValue>
                        <DetailLabelSkeleton variant="rectangular" />
                      </DetailValue>
                    </DetailsInfoItem>
                  );
                })}
              </Group>
              {new Array(2).fill(0).map((_, index) => {
                return (
                  <Group key={index}>
                    <DetailsInfoItem>
                      <DetailLabel>
                        <DetailValueSkeleton variant="rectangular" />
                      </DetailLabel>
                      <DetailValue>
                        <DetailLabelSkeleton variant="rectangular" />
                      </DetailValue>
                    </DetailsInfoItem>
                  </Group>
                );
              })}
            </ViewDetailScroll>
          </ViewDetailContainer>
        </>
      );
    }
    return (
      <ViewDetailContainerContractHash>
        <ViewDetailScrollContractHash>
          {data?.[0] ? (
            <ContractDiagrams item={data[0]} txHash={txHash} handleClose={handleClose} />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
              <CustomTooltip title={t("common.close")}>
                <CloseButton onClick={handleClose} sx={{ alignSelf: "end" }}>
                  <CgClose color={theme.palette.secondary.light} />
                </CloseButton>
              </CustomTooltip>
              <NoRecord sx={{ paddingTop: 10 }} width={"200px"} />
            </Box>
          )}
        </ViewDetailScrollContractHash>
      </ViewDetailContainerContractHash>
    );
  };

  return (
    <ViewDetailDrawerContractHash
      anchor="right"
      open={Boolean(open && txHash)}
      variant="temporary"
      onClose={handleClose}
      data-testid="view-detail-drawer-contract-hash"
    >
      {renderContent()}
    </ViewDetailDrawerContractHash>
  );
};

export default DetailViewContractHash;
