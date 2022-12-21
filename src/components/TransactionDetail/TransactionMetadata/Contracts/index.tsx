import { useState, useEffect } from "react";
import { Box, Button, styled, Tooltip } from "@mui/material";

import styles from "./index.module.scss";
import contractImg from "../../../../commons/resources/images/trx-contract.png";
import { getShortWallet } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import { useCopyToClipboard } from "react-use";

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
      <div className={styles.wrapper}>
        <div>
          <img className={styles.img} src={contractImg} alt="contract icon" />
          <Box className={styles.item} flexDirection="column">
            <Box color={props => props.textColor} className={styles.address}>
              {data[0].contract}
            </Box>
            <CopyButtonMui
              className={styles.btn}
              onClick={() => {
                copyToClipboard(data[0].contract);
                setTextCopy(data[0].contract);
              }}
            >
              {textCopy === data[0].contract ? "Copied" : "Copy"}
            </CopyButtonMui>
          </Box>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.img} src={contractImg} alt="contract icon" />
        {data &&
          data.map((ct, key) => {
            return (
              <div key={key} className={styles.item}>
                <Box className={styles.address}>
                  <Tooltip title={ct.contract} placement="top">
                    <div>{getShortWallet(ct.contract)}</div>
                  </Tooltip>
                </Box>
                <CopyButton text={ct.contract} className={styles.icon} />
              </div>
            );
          })}
      </div>
    </div>
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
