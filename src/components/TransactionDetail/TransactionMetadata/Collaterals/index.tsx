import { Box, styled } from "@mui/material";

import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import { routers } from "../../../../commons/routers";
import { Link } from "react-router-dom";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
  return (
    <Box bgcolor={"white"} p="25px">
      <Header>
        <div>Wallet Addresses</div>
        <div>Amount</div>
      </Header>
      {data && data.map((item, key) => <Items item={item} key={key} type="down" />)}
    </Box>
  );
};

export default Collaterals;

const Items = ({ item, type }: { item?: Required<Transaction>["collaterals"][number]; type?: "up" | "down" }) => {
  return (
    <Item>
      <Box display={"flex"} alignItems="center">
        <Box width={50}>
          <img src={type === "up" ? receiveImg : sendImg} alt="send icon" />
        </Box>
        <Box width={"100%"}>
          <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
            <div>
              From:{" "}
              <Link to={routers.ADDRESS_DETAIL.replace(":address", item?.address || "")}>
                <CustomTooltip title={item?.address} placement="top">
                  <Box
                    component={"span"}
                    color={props => props.colorBlue}
                    fontWeight="bold"
                    fontFamily="Helvetica, monospace"
                  >
                    {getShortWallet(item?.address || "")}{" "}
                  </Box>
                </CustomTooltip>
              </Link>
              <CopyButton text={item?.address || ""} style={{ marginLeft: 5 }} />
            </div>
            <Box display={"flex"} alignItems={"center"}>
              <Box mr={"8px"}>
                <Box component={"span"} fontWeight="bold" color={props => props.colorGreenLight}>
                  {type === "up" ? `- ${formatADA(item?.amount)}` : `+ ${formatADA(item?.amount)}`}
                </Box>
              </Box>
              <Box>
                <img src={AIcon} alt="ADA icon" />
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems={"center"}>
            <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", item?.txHash || "")}>
              <CustomTooltip title={item?.txHash || ""} placement="top">
                <Box component={"span"} color={props => props.colorBlue} fontFamily="Helvetica, monospace">
                  {getShortHash(item?.txHash || "")}
                </Box>
              </CustomTooltip>
            </Link>
            <CopyButton text={item?.txHash || ""} style={{ marginLeft: 5 }} />
          </Box>
        </Box>
      </Box>
    </Item>
  );
};

const Item = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: "10px 0",
  borderBottom: "1px solid #0000001a",
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.875rem",
  fontWeight: "bold",
  color: theme.titleColor,
  borderBottom: "1px solid #0000001a",
  paddingBottom: "8px",
}));
