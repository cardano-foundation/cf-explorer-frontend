import React from "react";
import { useTranslation } from "react-i18next";
import { startsWith } from "lodash";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { EmptyRecord } from "src/components/commons/Table";
import { details } from "src/commons/routers";

import { AddressLink, AssociatedAddressTitle, Container, StyledTruncateSubTitleContainer } from "./styles";

import { useNativeScriptDetail } from ".";

export type TAssociatedAddressProps = {
  data?: string[];
};

const AssociatedAddress: React.FC<TAssociatedAddressProps> = () => {
  const { t } = useTranslation();
  const { associatedAddress = [] } = useNativeScriptDetail();
  const getUrl = (s: string) => {
    if (startsWith(s, "stake")) return details.stake(s);
    return details.address(s);
  };
  return (
    <Container>
      <AssociatedAddressTitle>{t("common.associatedAddresses")}:</AssociatedAddressTitle>
      {!associatedAddress.length && <EmptyRecord />}
      {associatedAddress.length > 0 &&
        associatedAddress.map((item) => (
          <React.Fragment key={item}>
            <AddressLink to={getUrl(item)}>
              <StyledTruncateSubTitleContainer>
                <DynamicEllipsisText value={item} isTooltip />
              </StyledTruncateSubTitleContainer>
            </AddressLink>
          </React.Fragment>
        ))}
    </Container>
  );
};

export default AssociatedAddress;
