import { Box } from "@mui/material";
import { ReactElement, useState } from "react";
import { ActivityButton, Label, StyledAction, StyledRowItem, TextNote, Value } from "./styles";
import { ReactComponent as Edit } from "../../../commons/resources/icons/pen.svg";
import { ReactComponent as Search } from "../../../commons/resources/icons/search.svg";
import { ReactComponent as File } from "../../../commons/resources/icons/file.svg";
import ActivityLogModal from "../ActivityLogModal";

type TRowItem = {
  label: string;
  value: string | ReactElement;
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

const OverviewTab: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box textAlign="left">
      <TextNote>Below are the username, email and overview information for your account</TextNote>
      <RowItem label="Your username" value="abcxyz" />
      <RowItem label="Your email address " value="abcxyz@gmail.com" action={<Edit />} />
      <RowItem label="Private Notes" value="0 out of 2000 available limit" action={<Search />} />
      <RowItem label="Address Bookmark" value="0 out of 2000 available limit" action={<Search />} />
      <RowItem label="Wallet" value="0x4a79f65f393335ba6acc76c7...." action={<Edit />} />
      <RowItem label="Last Login" value="" />
      <ActivityButton endIcon={<File />} onClick={() => setOpenModal(true)}>
        Activity History
      </ActivityButton>
      <ActivityLogModal open={openModal} handleCloseModal={() => setOpenModal(false)} />
    </Box>
  );
};

export default OverviewTab;
