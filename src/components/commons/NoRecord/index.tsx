import { Container, styled } from "@mui/material";
import { EmptyIcon } from "../../../commons/resources";

const NoRecordContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
`;

const Image = styled("img")`
  width: auto;
  height: 214px;
`;

const NoRecord = () => {
  return (
    <NoRecordContainer>
      <Image src={EmptyIcon} alt="empty icon" />
    </NoRecordContainer>
  );
};
export default NoRecord;
