import { useState } from "react";
import { Box } from "@mui/material";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";

import { StyledLink, StyledSubNameTab } from "./styles";

export type TTabAssociatedProps = {
  data?: ScriptAssociatedAddress | null;
  loading: boolean;
};

const TabAssociated: React.FC<TTabAssociatedProps> = ({ data, loading }) => {
  const { t } = useTranslation();

  const associatedAddresses = get(data, "associatedAddresses", []);
  const totalRecords = associatedAddresses.length;

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setRowsPerPage(size);
  };

  const paginatedAddresses = associatedAddresses.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const renderData = () => {
    if (loading) {
      return <Box component={CommonSkeleton} variant="rectangular" width={"100%"} height={"80px"} borderRadius={2} />;
    }

    if (associatedAddresses.length > 0) {
      return (
        <Box maxHeight={"350px"} overflow={"scroll"}>
          {paginatedAddresses.map((address: string) => (
            <StyledLink
              to={address.startsWith("stake") ? details.stake(address) : details.address(address)}
              key={address}
            >
              <Box mb={1}>
                <DynamicEllipsisText value={address} />
              </Box>
            </StyledLink>
          ))}
        </Box>
      );
    }

    return <EmptyRecord />;
  };

  return (
    <Box>
      <StyledSubNameTab data-testid="sc.subNameTab">{t("AssociatedAddresses")}:</StyledSubNameTab>
      <Box>{renderData()}</Box>

      <FooterTable
        total={{ count: totalRecords, isDataOverSize: false }}
        pagination={{
          page: page - 1,
          size: rowsPerPage,
          total: totalRecords,
          onChange: handlePageChange
        }}
        loading={loading}
        optionList={[10, 20, 50, 100]}
      />
    </Box>
  );
};

export default TabAssociated;
