import { Box } from "@mui/material";
import { ReactElement, useState } from "react";
import { ActivityButton, Label, StyledAction, StyledRowItem, TextNote, Value, WalletAddress } from "./styles";
import { ReactComponent as Edit } from "../../../commons/resources/icons/pen.svg";
import { ReactComponent as Search } from "../../../commons/resources/icons/search.svg";
import { ReactComponent as File } from "../../../commons/resources/icons/file.svg";
import ActivityLogModal from "../ActivityLogModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import moment from "moment";
import CopyButton from "../../commons/CopyButton";
import { useHistory } from "react-router-dom";
import { routers } from "../../../commons/routers";

type TRowItem = {
  label: string;
  value?: string | ReactElement;
  action?: ReactElement;
};

const RowItem: React.FC<TRowItem> = ({ label, value, action }) => {
  return (
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
  const [openModal, setOpenModal] = useState(false);
  const { userData } = useSelector(({ user }: RootState) => user);

  return (
    <Box textAlign="left">
      <TextNote>Below are the username, email and overview information for your account</TextNote>
      <RowItem label="Your username" value={userData?.username} />
      <RowItem
        label="Your email address "
        value={userData?.email}
        action={<Edit onClick={() => handleChangeTab("setting")} />}
      />
      <RowItem
        label="Private Notes"
        value={`${userData?.sizeNote} out of 2000 available limit`}
        action={<Search onClick={() => history.push(routers.PRIVATE_NOTES)} />}
      />
      <RowItem
        label="Address Bookmark"
        value={`${userData?.sizeBookmark} out of 2000 available limit`}
        action={<Search onClick={() => history.push(routers.BOOKMARK)} />}
      />
      <RowItem
        label="Wallet"
        value={
          <Box display="flex" alignItems="center">
            <WalletAddress>{userData?.wallet}</WalletAddress>
            <CopyButton text={userData?.wallet} />
          </Box>
        }
        action={<Edit onClick={() => handleChangeTab("setting")} />}
      />
      <RowItem label="Last Login" value={moment(userData?.lastLogin).format("MM/DD/YYYY hh:mm:ss")} />
      <ActivityButton endIcon={<File />} onClick={() => setOpenModal(true)}>
        Activity History
      </ActivityButton>
      <ActivityLogModal open={openModal} handleCloseModal={() => setOpenModal(false)} />
    </Box>
  );
};

export default OverviewTab;
