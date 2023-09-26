import React from "react";
import { Box, BoxProps, Container, styled, useTheme } from "@mui/material";

import { EmptyDarkIcon, EmptyIcon } from "src/commons/resources";

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

const NoRecord: React.FC<BoxProps> = React.forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <NoRecordContainer component={Container} className="no-record" ref={ref} {...props}>
      <Image src={theme.isDark ? EmptyDarkIcon : EmptyIcon} alt="empty icon" />
    </NoRecordContainer>
  );
});

NoRecord.displayName = "NoRecord";

export default NoRecord;
