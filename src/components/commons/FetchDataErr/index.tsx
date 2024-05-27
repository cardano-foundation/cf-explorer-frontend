import React from "react";
import { Box, BoxProps, Container, styled, useTheme } from "@mui/material";

import { FetchDataErrLight, FetchDataErrDark } from "src/commons/resources";

const FetchDataErrContainer = styled(Box)`
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

const FetchDataErr: React.FC<BoxProps> = React.forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <FetchDataErrContainer component={Container} className="no-record" ref={ref} {...props}>
      <Image src={theme.isDark ? FetchDataErrDark : FetchDataErrLight} alt="not avaialble icon" />
    </FetchDataErrContainer>
  );
});

FetchDataErr.displayName = "";

export default FetchDataErr;
