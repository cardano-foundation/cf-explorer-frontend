import React from "react";
import { useTranslation } from "react-i18next";
import { startsWith } from "lodash";
import { Box } from "@mui/material";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { EmptyRecord } from "src/components/commons/Table";
import { details } from "src/commons/routers";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

import { AddressLink, AssociatedAddressTitle, Container, StyledTruncateSubTitleContainer } from "./styles";

import { useNativeScriptDetail } from ".";

export type TAssociatedAddressProps = {
  data?: string[];
};

const AssociatedAddress: React.FC<TAssociatedAddressProps> = () => {
  const { t } = useTranslation();

  const { associatedAddress = [], loading } = useNativeScriptDetail();
  const getUrl = (s: string) => {
    if (startsWith(s, "stake")) return details.stake(s);
    return details.address(s);
  };

  const renderData = () => {
    if (loading) {
      return <Box component={CommonSkeleton} variant="rectangular" width={"100%"} height={"80px"} borderRadius={2} />;
    }
    if (associatedAddress.length > 0) {
      return associatedAddress.map((item) => (
        <React.Fragment key={item}>
          <AddressLink to={getUrl(item)}>
            <StyledTruncateSubTitleContainer>
              <DynamicEllipsisText value={item} isTooltip />
            </StyledTruncateSubTitleContainer>
          </AddressLink>
        </React.Fragment>
      ));
    }
    return <EmptyRecord />;
  };

  return (
    <Container>
      <AssociatedAddressTitle data-testid="sc.subNameTab">{t("common.associatedAddresses")}:</AssociatedAddressTitle>
      {renderData()}
    </Container>
  );
};

export default AssociatedAddress;
