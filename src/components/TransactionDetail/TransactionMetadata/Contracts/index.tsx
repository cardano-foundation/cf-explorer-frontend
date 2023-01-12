import { useState, useEffect } from "react";
import { Box, Button, styled  } from "@mui/material";

import styles from "./index.module.scss";
import contractImg from "../../../../commons/resources/images/trx-contract.png";
import { getShortWallet } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import { useCopyToClipboard } from "react-use";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Img, Wrapper } from "./component";

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
            <Box
              color={props => props.textColor}
              mx={"auto"}
              display="flex"
              alignItems={"center"}
              className={styles.ffTitle}
            >
              {data[0].contract}
            </Box>
            <CopyButtonMui
              className={styles.ffTitle}
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
                <Box mx={"auto"} display="flex" alignItems={"center"} className={styles.ffTitle}>
                  <CustomTooltip title={ct.contract}>
                    <div>{getShortWallet(ct.contract)}</div>
                  </CustomTooltip>
                </Box>
                <CopyButton text={ct.contract} className={styles.icon} />
              </Box>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default Contracts;

const CopyButtonMui = styled(Button)(({ theme }) => {
  return {
    display: "block",
    color: theme.colorGreenLight,
    border: `2px solid ${theme.colorGreenLight}`,
    borderRadius: theme.borderRadius,
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    marginTop: theme.spacing(2),
    textTransform: "capitalize",
    fontWeight: "bold",
  };
});
