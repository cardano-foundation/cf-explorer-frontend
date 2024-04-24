import { Box } from "@mui/material";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { EmptyRecord } from "src/components/commons/Table";

import { StyledLink, StyledSubNameTab } from "./styles";

export type TTabAssociatedProps = {
  data?: ScriptAssociatedAddress | null;
  loading: boolean;
};

const TabAssociated: React.FC<TTabAssociatedProps> = ({ data, loading }) => {
  const { t } = useTranslation();

  const renderData = () => {
    if (loading) {
      return <Box component={CommonSkeleton} variant="rectangular" width={"100%"} height={"80px"} borderRadius={2} />;
    }
    if (get(data, "associatedAddresses", []).length > 0) {
      return data?.associatedAddresses.map((address: string) => (
        <StyledLink to={address.startsWith("stake") ? details.stake(address) : details.address(address)} key={address}>
          <DynamicEllipsisText value={address} />
        </StyledLink>
      ));
    }
    return <EmptyRecord />;
  };

  return (
    <Box>
      <StyledSubNameTab data-testid="sc.subNameTab">{t("AssociatedAddresses")}:</StyledSubNameTab>
      <Box maxHeight={380} overflow="auto">
        {renderData()}
      </Box>
    </Box>
  );
};

export default TabAssociated;
