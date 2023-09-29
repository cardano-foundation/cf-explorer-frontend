import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import ContractSideView from "src/components/Contracts/ContractSideView";

import CustomTooltip from "../CustomTooltip";
import {
  CloseButton,
  HeaderContainer,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  ProgressSkeleton,
  Group,
  ViewDetailScroll,
  ViewDetailHeader,
  ViewDetailContainerContractHash,
  ViewDetailScrollContractHash,
  ViewDetailDrawer
} from "./styles";
import NoRecord from "../NoRecord";

type DetailViewEpochProps = {
  handleClose: () => void;
  txHash: string;
  address: string;
  open?: boolean;
};

const DetailViewContractHash: React.FC<DetailViewEpochProps> = ({ txHash, handleClose, address, open }) => {
  const { t } = useTranslation();
  const [urlFetch, setUrlFetch] = useState("");
  const { data, loading } = useFetch<IContractItemTx[]>(urlFetch, undefined, false);

  useEffect(() => {
    if (!txHash) {
      setUrlFetch("");
    } else {
      setUrlFetch(API.TRANSACTION.HASH_CONTRACT(txHash, address));
    }
  }, [address, txHash]);

  const renderContent = () => {
    if (!data || loading || !address) {
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
      <>
        <ViewDetailContainerContractHash>
          <ViewDetailScrollContractHash>
            {data?.[0] ? (
              <ContractSideView data={data[0]} txHash={txHash} handleClose={handleClose} />
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
                <CustomTooltip title={t("common.close")}>
                  <CloseButton onClick={handleClose} sx={{ alignSelf: "end" }}>
                    <CgClose />
                  </CloseButton>
                </CustomTooltip>
                <NoRecord sx={{ paddingTop: 10 }} width={"200px"} />
              </Box>
            )}
          </ViewDetailScrollContractHash>
        </ViewDetailContainerContractHash>
      </>
    );
  };

  return (
    <ViewDetailDrawer
      hideBackdrop
      transitionDuration={100}
      data-testid="view-detail-drawer-contract-hash"
      anchor="right"
      open={Boolean(open && txHash)}
      variant="temporary"
      onClose={handleClose}
    >
      {renderContent()}
    </ViewDetailDrawer>
  );
};

export default DetailViewContractHash;
