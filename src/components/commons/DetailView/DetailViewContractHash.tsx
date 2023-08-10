import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Box } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import ContractDiagrams from "src/components/ContractDiagrams";

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
  ViewDetailDrawer,
  Group,
  ViewDetailScroll,
  ViewDetailHeader,
  ViewDetailDrawerContractHash,
  ViewDetailContainerContractHash,
  ViewDetailScrollContractHash
} from "./styles";
import NoRecord from "../NoRecord";

type DetailViewEpochProps = {
  handleClose: () => void;
  txHash: string;
  address: string;
};

const DetailViewContractHash: React.FC<DetailViewEpochProps> = ({ txHash, handleClose, address }) => {
  const { data, loading, initialized } = useFetch<IContractItemTx[]>(
    API.TRANSACTION.HASH_CONTRACT(txHash, address),
    undefined,
    false
  );

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  if (loading || !initialized) {
    return (
      <ViewDetailDrawer anchor="right" open hideBackdrop variant="permanent" data-testid="view-detail-drawer-loading">
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
      </ViewDetailDrawer>
    );
  }

  return (
    <ViewDetailDrawerContractHash
      anchor="right"
      open
      hideBackdrop
      variant="permanent"
      data-testid="view-detail-drawer-contract-hash"
    >
      <ViewDetailContainerContractHash>
        <ViewDetailScrollContractHash>
          {data?.[0] ? (
            <ContractDiagrams item={data[0]} txHash={txHash} handleClose={handleClose} />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
              <CustomTooltip title="Close">
                <CloseButton onClick={handleClose} sx={{ alignSelf: "end" }}>
                  <CgClose />
                </CloseButton>
              </CustomTooltip>
              <NoRecord sx={{ paddingTop: 10 }} width={"200px"} />
            </Box>
          )}
        </ViewDetailScrollContractHash>
      </ViewDetailContainerContractHash>
    </ViewDetailDrawerContractHash>
  );
};

export default DetailViewContractHash;
