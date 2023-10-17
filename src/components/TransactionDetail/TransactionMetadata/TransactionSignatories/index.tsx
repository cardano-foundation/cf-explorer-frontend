import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Box } from "@mui/material";
import { t } from "i18next";

import CustomTooltip from "src/components/commons/CustomTooltip";
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
        return <div>{r.index}</div>;
      }
    },
    {
      title: t("trx.signerPublicKeyHas"),
      key: "publicKey",
      minWidth: "40px",
      render: (r) => {
        return (
          <WrapperRowContent>
            <WrapperSignerPublicKey>
              {r?.publicKey}{" "}
              {r?.delegateKey ? (
                <CustomTooltip title={t("trx.tooltipSignatories")} placement={"top"}>
                  <Box>
                    <MdInfoOutline />
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
      <Box color={({ palette }) => palette.secondary.light} textAlign={"left"} mb={1}>
        {t("trx.desSignatories")}
      </Box>
      <Wrapper>
        <TableProtocol
          height={(data || [])?.length > 5 ? 350 : 0}
          showPagination={false}
          columns={columns}
          data={data?.map((d, i) => ({ ...d, index: i + 1 }))}
        />
      </Wrapper>
    </Box>
  );
};

export default TransactionSignatories;
