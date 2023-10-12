import { Box, SxProps, Theme, styled } from "@mui/material";
import { useEffect, useId, useRef, useState } from "react";

import CopyButton from "src/components/commons/CopyButton";
import { getShortHash } from "src/commons/utils/helper";

import CustomTooltip from "../commons/CustomTooltip";

const Container = styled(Box)`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: left;
  transform: translateY(2px);
`;

const SubPart = styled("span")`
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
`;

const FirstPart = styled(SubPart)`
  max-width: calc(100% - 130px);
  min-width: 95px;
  text-overflow: ellipsis;
`;
const Lastpart = styled(SubPart)`
  direction: rtl;
`;

const ContainerShortHand = styled(Box)`
  word-break: break-word;
  text-align: left;
`;

const StyledAfterElm = styled(Box)`
  display: inline-block;
  vertical-align: bottom;
  margin-left: 10px;
`;

// The number of pixels required to display the shortened address in one row
const MIN_PIXEL = 180;

const DynamicEllipsisText = ({
  value,
  postfix = 8,
  isCopy,
  afterElm,
  isTooltip,
  sxFirstPart,
  sxLastPart
}: {
  value: string;
  postfix?: number;
  isCopy?: boolean;
  isTooltip?: boolean;
  afterElm?: React.ReactNode;
  sxFirstPart?: SxProps<Theme>;
  sxLastPart?: SxProps<Theme>;
}) => {
  const randomIdRef = useRef(`ELIPSIS_${useId()}`);

  const [isMin, setIsMin] = useState<boolean>(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const widthContainer = entry.contentRect.width;
        if (widthContainer < MIN_PIXEL) {
          setIsMin(true);
        } else {
          setIsMin(false);
        }
      }
    });
    const container = document.getElementById(randomIdRef.current);
    if (container) {
      resizeObserver.observe(container);
    }
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, [isMin]);

  const firstPart = value?.slice(0, value?.length - postfix);
  const lastPart = value?.slice(-postfix);

  if (isMin) {
    return (
      <ContainerShortHand id={randomIdRef.current}>
        {getShortHash(value)} {isCopy && <CopyButton text={value} />}
        {afterElm && <StyledAfterElm>{afterElm}</StyledAfterElm>}
      </ContainerShortHand>
    );
  }

  return (
    <Container id={randomIdRef.current}>
      <CustomTooltip title={isTooltip ? value : ""}>
        <Box component={"span"}>
          <FirstPart sx={sxFirstPart}>{firstPart}</FirstPart>
          <Lastpart sx={sxLastPart}>{lastPart}</Lastpart>
        </Box>
      </CustomTooltip>
      {isCopy && <CopyButton text={value} data-testId="copy-button" />}
      {afterElm && <StyledAfterElm className="after-dynamic-text">{afterElm}</StyledAfterElm>}
    </Container>
  );
};

export default DynamicEllipsisText;
