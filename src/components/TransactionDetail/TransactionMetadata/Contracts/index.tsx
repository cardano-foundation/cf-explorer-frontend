import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useCopyToClipboard } from "react-use";

import { details } from "src/commons/routers";
import { getShortWallet } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";

import contractImg from "../../../../commons/resources/images/trx-contract.png";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import { CopyButtonMui, Img, Title, WrapAddress, Wrapper } from "./styles";

interface ContractsProps {
  data: Transaction["contracts"] | null;
}

const Contracts: React.FC<ContractsProps> = ({ data }) => {
  const [textCopy, setTextCopy] = useState("");
  const [, copyToClipboard] = useCopyToClipboard();
  const { isLargeTablet } = useScreen();

  useEffect(() => {
    if (textCopy) {
      setTimeout(() => {
        setTextCopy("");
      }, 2000);
    }
  }, [textCopy]);

  const redirectTo = (address: string): string => {
    if (address.startsWith("addr")) return details.contract(address);
    return details.policyDetail(address);
  };

  if (data && data?.length === 1) {
    return (
      <Wrapper>
        <div>
          <Img src={contractImg} alt="contract icon" />
          <Box display={"flex"} alignItems="center" padding={"15px 0 0"} flexDirection="column">
            <Link to={redirectTo(data[0].contract)}>
              <WrapAddress>{isLargeTablet ? getShortWallet(data[0].contract) : data[0].contract}</WrapAddress>
            </Link>
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
          data.map((ct) => {
            return (
              <Box display={"flex"} alignItems="center" padding={"15px 0 0"} key={ct.contract}>
                <Box mx={"auto"} display="flex" alignItems={"center"}>
                  <Link to={redirectTo(ct.contract)}>
                    {isLargeTablet ? (
                      <CustomTooltip title={ct.contract}>
                        <Title>{getShortWallet(ct.contract)}</Title>
                      </CustomTooltip>
                    ) : (
                      <Title>{ct.contract}</Title>
                    )}
                  </Link>
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
