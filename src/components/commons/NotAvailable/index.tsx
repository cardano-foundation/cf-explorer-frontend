import React from "react";
import { Box, BoxProps, Container, styled } from "@mui/material";

import { NAIcon } from "src/commons/resources";

const NoRecordContainer = styled(Box)`
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

const NotAvailable: React.FC<BoxProps> = React.forwardRef((props, ref) => {
  return (
    <NoRecordContainer component={Container} className="no-record" ref={ref} {...props}>
      <Image src={NAIcon} alt="not avaialble icon" />
    </NoRecordContainer>
  );
});

NotAvailable.displayName = "NoRecord";

export default NotAvailable;
