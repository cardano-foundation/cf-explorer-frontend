import { Box } from "@mui/material";
import { ReactElement } from "react";
import { Label, StyledAction, StyledRowItem, TextNote, Value, WalletAddress, WrapInfoItemMobile } from "./styles";
import { ReactComponent as Edit } from "../../../commons/resources/icons/pen.svg";
import { ReactComponent as Search } from "../../../commons/resources/icons/search.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import moment from "moment";
import CopyButton from "../../commons/CopyButton";
import { useHistory } from "react-router-dom";
import { routers } from "../../../commons/routers";
import { useScreen } from "../../../commons/hooks/useScreen";

type TRowItem = {
  label: string;
  value?: string | ReactElement;
  action?: ReactElement;
  isTablet?: boolean;
};

const RowItem: React.FC<TRowItem> = ({ label, value, action, isTablet }) => {
  return isTablet ? (
    <StyledRowItem justifyContent={"space-between"}>
      <WrapInfoItemMobile>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </WrapInfoItemMobile>
      <StyledAction>{action}</StyledAction>
    </StyledRowItem>
  ) : (
    <StyledRowItem>
      <Label>{label}</Label>
      <Value>{value}</Value>
      <StyledAction>{action}</StyledAction>
    </StyledRowItem>
  );
};

interface IProps {
  handleChangeTab: (value: "overview" | "setting") => void;
}

const OverviewTab: React.FC<IProps> = ({ handleChangeTab }) => {
  const history = useHistory();
  const { userData } = useSelector(({ user }: RootState) => user);
  const { isTablet } = useScreen();

  return (
    <Box textAlign='left'>
      <TextNote>Below are the username, email and overview information for your account</TextNote>
      <RowItem label='Your email address ' value={userData?.email} isTablet={isTablet} />
      <RowItem
        label='Private Notes'
        value={`${userData?.sizeNote} out of 2000 available limit`}
        action={<Search onClick={() => history.push(routers.PRIVATE_NOTES)} />}
        isTablet={isTablet}
      />
      <RowItem
        label='Address Bookmark'
        value={`${userData?.sizeBookmark} out of 2000 available limit`}
        action={<Search onClick={() => history.push(routers.BOOKMARK)} />}
        isTablet={isTablet}
      />
      <RowItem
        label='Wallet'
        value={
          <Box display='flex' alignItems='center'>
            <WalletAddress>{userData?.wallet}</WalletAddress>
            {userData?.wallet ? <CopyButton text={userData?.wallet} /> : null}
          </Box>
        }
        isTablet={isTablet}
        action={<Edit onClick={() => handleChangeTab("setting")} />}
      />
      <RowItem
        label='Last Login'
        value={moment(userData?.lastLogin).format("MM/DD/YYYY hh:mm:ss")}
        isTablet={isTablet}
      />
    </Box>
  );
};

export default OverviewTab;
