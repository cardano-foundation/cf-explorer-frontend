import React from "react";
import { Box } from "@mui/material";
import { t } from "i18next";

import CustomTooltip from "src/components/commons/CustomTooltip";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import { Column } from "src/components/commons/Table";

import { TableProtocol, Wrapper, WrapperRowContent, WrapperSignerPublicKey } from "./styles";

interface IProps {
  data: Transaction["signersInformation"];
}

const TransactionSignatories: React.FC<IProps> = ({ data }) => {
  const columns: Column<SignersInformation & { index: number }>[] = [
    {
      title: "#",
      key: "index",
      minWidth: "10px",
      maxWidth: "20px",
      render: (r) => {
        return <div data-testid="transactionMetadata.transactionSignatories.index">{r.index}</div>;
      }
    },
    {
      title: t("trx.signerPublicKeyHas"),
      key: "publicKey",
      minWidth: "40px",
      render: (r) => {
        return (
          <WrapperRowContent data-testid="transactionMetadata.transactionSignatories.key">
            <WrapperSignerPublicKey>
              {r?.publicKey}{" "}
              {r?.delegateKey ? (
                <CustomTooltip title={t("trx.tooltipSignatories")} placement={"top"}>
                  <Box>
                    <InfoSolidIcon />
                  </Box>
                </CustomTooltip>
              ) : null}
            </WrapperSignerPublicKey>
          </WrapperRowContent>
        );
      }
    }
  ];

  return (
    <Box>
      <Box
        data-testid="transactionMetadata.transactionSignatories.des"
        color={({ palette }) => palette.secondary.light}
        textAlign={"left"}
        mb={1}
      >
        {t("trx.desSignatories")}
      </Box>
      <Wrapper>
        <TableProtocol
          data-testid="transactionMetadata.transactionSignatories.table"
          height={(data || [])?.length > 5 ? 320 : 0}
          showPagination={false}
          columns={columns}
          data={data?.map((d, i) => ({ ...d, index: i + 1 }))}
        />
      </Wrapper>
    </Box>
  );
};

export default TransactionSignatories;
