import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Box } from "@mui/material";

import { EmptyIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import ContractDiagrams from "src/components/ContractDiagrams";
import useComponentVisible from "src/commons/hooks/useComponentVisible";

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

type DetailViewEpochProps = {
  handleClose: () => void;
  txHash: string;
  address: string;
};

const DetailViewContractHash: React.FC<DetailViewEpochProps> = ({ txHash, handleClose, address }) => {
  const { data, loading } = useFetch<IContractItemTx[]>(
    API.TRANSACTION.HASH_CONTRACT(txHash, address),
    undefined,
    false
  );

  const { ref, isComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible) {
      handleClose();
    }
  }, [isComponentVisible, handleClose]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  if (loading) {
    return (
      <ViewDetailDrawer anchor="right" open hideBackdrop variant="permanent" data-testid="view-detail-drawer-loading">
        <ViewDetailHeader>
          <CustomTooltip title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
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
      ref={ref}
      anchor="right"
      open
      hideBackdrop
      variant="permanent"
      data-testid="view-detail-drawer-contract-hash"
    >
      <ViewDetailContainerContractHash>
        <ViewDetailScrollContractHash>
          {data?.[0] ? (
            <ContractDiagrams item={data[0]} txHash={txHash} />
          ) : (
            <Box sx={{ paddingTop: 10 }} height={"200px"} component={"img"} src={EmptyIcon} />
          )}
        </ViewDetailScrollContractHash>
      </ViewDetailContainerContractHash>
    </ViewDetailDrawerContractHash>
  );
};

export default DetailViewContractHash;
