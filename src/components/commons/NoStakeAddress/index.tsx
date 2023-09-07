import { Container } from "@mui/material";

import { NoRecordsIcon } from "src/commons/resources";

import { Image, Message, NoRecordContainer } from "./styles";

const NoStakeAddress = () => (
  <NoRecordContainer component={Container}>
    <Image src={NoRecordsIcon} alt="empty icon" />
    <Message>This address has no stake key associated to it.</Message>
  </NoRecordContainer>
);

NoStakeAddress.displayName = "NoStakeAddress";

export default NoStakeAddress;
