import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Box } from "@mui/material";

import { CopyOutline2 } from "src/commons/resources";
import CopyButton from "src/components/commons/CopyButton";
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
      maxWidth: "40px",
      render: (r) => {
        return <div>{r.index}</div>;
      }
    },
    {
      title: "Signer Public Key Hash",
      key: "publicKey",
      minWidth: "40px",
      render: (r) => {
        return (
          <WrapperRowContent>
            <WrapperSignerPublicKey>
              {r?.publicKey}{" "}
              {r?.delegateKey ? (
                <CustomTooltip title={r?.delegateKey} placement={"top"}>
                  <Box pt={"5px"}>
                    <MdInfoOutline />
                  </Box>
                </CustomTooltip>
              ) : null}
            </WrapperSignerPublicKey>
            <CopyButton
              text={r.publicKey}
              customIcon={CopyOutline2}
              style={{ cursor: "pointer", verticalAlign: "text-bottom" }}
            />
          </WrapperRowContent>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <TableProtocol columns={columns} data={data?.map((d, i) => ({ ...d, index: i + 1 }))} />
    </Wrapper>
  );
};

export default TransactionSignatories;
