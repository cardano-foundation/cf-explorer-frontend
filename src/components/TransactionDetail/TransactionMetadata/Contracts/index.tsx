import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useCopyToClipboard } from "react-use";

import contractImg from "../../../../commons/resources/images/trx-contract.png";
import { getShortWallet } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import { CopyButtonMui, Img, Title, WrapAddress, Wrapper } from "./styles";

interface ContractsProps {
  data: Transaction["contracts"] | null;
}

const Contracts: React.FC<ContractsProps> = ({ data }) => {
  const [textCopy, setTextCopy] = useState("");
  const [, copyToClipboard] = useCopyToClipboard();
  useEffect(() => {
    if (textCopy) {
      setTimeout(() => {
        setTextCopy("");
      }, 2000);
    }
  }, [textCopy]);
  if (data && data?.length === 1) {
    return (
      <Wrapper>
        <div>
          <Img src={contractImg} alt="contract icon" />
          <Box display={"flex"} alignItems="center" padding={"15px 0 0"} flexDirection="column">
            <WrapAddress>{data[0].contract}</WrapAddress>
            <CopyButtonMui
              onClick={() => {
                copyToClipboard(data[0].contract);
                setTextCopy(data[0].contract);
              }}
            >
              {textCopy === data[0].contract ? "Copied" : "Copy"}
            </CopyButtonMui>
          </Box>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <Img src={contractImg} alt="contract icon" />
        {data &&
          data.map((ct, key) => {
            return (
              <Box display={"flex"} alignItems="center" padding={"15px 0 0"} key={key}>
                <Box mx={"auto"} display="flex" alignItems={"center"}>
                  <CustomTooltip title={ct.contract}>
                    <Title>{getShortWallet(ct.contract)}</Title>
                  </CustomTooltip>
                </Box>
                <CopyButton text={ct.contract} />
              </Box>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default Contracts;
