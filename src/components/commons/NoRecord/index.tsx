import React from "react";
import { Box, BoxProps, Container, styled } from "@mui/material";

import { EmptyIcon } from "src/commons/resources";

const NoRecordContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled("img")`
  width: auto;
  height: 214px;
`;

const NoRecord: React.FC<BoxProps> = React.forwardRef((props, ref) => (
  <NoRecordContainer component={Container} ref={ref} {...props}>
    <Image src={EmptyIcon} alt="empty icon" />
  </NoRecordContainer>
));

NoRecord.displayName = "NoRecord";

export default NoRecord;
