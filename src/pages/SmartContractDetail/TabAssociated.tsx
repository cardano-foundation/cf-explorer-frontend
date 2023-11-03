import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { EmptyRecord } from "src/components/commons/Table";
import { details } from "src/commons/routers";

import { StyledSubNameTab, StyledLink } from "./styles";

const TabAssociated = ({ setVersion }: { setVersion: (v: string) => void }) => {
  const { address } = useParams<{ address: string }>();
  const { t } = useTranslation();
  const { data, loading } = useFetch<ScriptAssociatedAddress>(API.SCRIPTS.ASSOCIATED_ADDRESS(address));

  useEffect(() => {
    if (data?.scriptType) {
      setVersion(data?.scriptType);
    }
  }, [data?.scriptType]);

  return (
    <Box>
      <StyledSubNameTab>{t("AssociatedAddresses")}:</StyledSubNameTab>
      <Box>
        {loading || get(data, "associatedAddresses", []).length > 0 ? (
          data?.associatedAddresses.map((address: string) => (
            <StyledLink
              to={address.startsWith("stake") ? details.stake(address) : details.address(address)}
              key={address}
            >
              <DynamicEllipsisText value={address} />
            </StyledLink>
          ))
        ) : (
          <EmptyRecord />
        )}
      </Box>
    </Box>
  );
};

export default TabAssociated;
