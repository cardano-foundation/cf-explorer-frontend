import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { get } from "lodash";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { EmptyRecord } from "src/components/commons/Table";

import { StyledAddress, StyledSubNameTab } from "./styles";

const TabAssociated = ({ setVersion }: { setVersion: (v: string) => void }) => {
  const { address } = useParams<{ address: string }>();
  const { data } = useFetch<ScriptAssociatedAddress>(API.SCRIPTS.ASSOCIATED_ADDRESS(address));

  useEffect(() => {
    if (data?.scriptType) {
      setVersion(data?.scriptType);
    }
  }, [data?.scriptType]);

  return (
    <Box>
      <StyledSubNameTab>Associated Addresses:</StyledSubNameTab>
      <Box>
        {get(data, "associatedAddresses", []).length > 0 ? (
          data?.associatedAddresses.map((address: string) => (
            <StyledAddress key={address}>
              <DynamicEllipsisText value={address} />
            </StyledAddress>
          ))
        ) : (
          <EmptyRecord />
        )}
      </Box>
    </Box>
  );
};

export default TabAssociated;
