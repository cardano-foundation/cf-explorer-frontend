import React, { useEffect } from "react";
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
  StyledSpendviewDrawer
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
      <StyledSpendviewDrawer
        transitionDuration={100}
        anchor="right"
        open={open}
        hideBackdrop
        data-testid="view-detail-drawer-contract-hash"
      >
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
      </StyledSpendviewDrawer>
    );
  }

  return (
    <StyledSpendviewDrawer
      hideBackdrop
      transitionDuration={100}
      anchor="right"
      open={open}
      data-testid="view-detail-drawer-contract-hash"
    >
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
    </StyledSpendviewDrawer>
  );
};

export default DetailViewContractHash;
