import { Box, SxProps, Theme, styled } from "@mui/material";
import { useEffect, useId, useRef, useState } from "react";

import CopyButton from "src/components/commons/CopyButton";
import { getShortHash, truncateCustom } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";

import CustomTooltip from "../commons/CustomTooltip";

const Container = styled(Box)<{ whiteSpace?: "nowrap" | "normal" }>`
  display: inline-block;
  white-space: ${({ whiteSpace }) => whiteSpace ?? "nowrap"};
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
  min-width: 50px;
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
  ${({ theme }) => theme.breakpoints.down(430)} {
    margin-left: 3px;
  }
`;

// The number of pixels required to display the shortened address in one row
const MIN_PIXEL = 120;

const DynamicEllipsisText = ({
  value,
  postfix = 8,
  isCopy,
  afterElm,
  isTooltip,
  sxFirstPart,
  sxLastPart,
  sx,
  customTruncateFold,
  isNoLimitPixel,
  whiteSpace
}: {
  value: string;
  postfix?: number;
  isCopy?: boolean;
  isTooltip?: boolean;
  afterElm?: React.ReactNode;
  sxFirstPart?: SxProps<Theme>;
  sxLastPart?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  customTruncateFold?: [number, number];
  isNoLimitPixel?: boolean;
  whiteSpace?: "nowrap" | "normal";
}) => {
  const randomIdRef = useRef(`ELIPSIS_${useId()}`);

  const [isMin, setIsMin] = useState<boolean>(false);
  const { isGalaxyFoldSmall } = useScreen();

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

  if (isMin && !isNoLimitPixel) {
    return (
      <CustomTooltip title={isTooltip ? <ScrollTooltipContent>{value}</ScrollTooltipContent> : ""}>
        <ContainerShortHand id={randomIdRef.current} data-testid="ellipsis-text" sx={sx}>
          {customTruncateFold?.length === 2 && isGalaxyFoldSmall
            ? truncateCustom(value, customTruncateFold[0], customTruncateFold[1])
            : getShortHash(value)}
          {isCopy && <CopyButton text={value} />}
          {afterElm && <StyledAfterElm>{afterElm}</StyledAfterElm>}
        </ContainerShortHand>
      </CustomTooltip>
    );
  }

  return (
    <Container id={randomIdRef.current} sx={sx} whiteSpace={whiteSpace}>
      <CustomTooltip title={isTooltip ? <ScrollTooltipContent>{value}</ScrollTooltipContent> : ""}>
        <Box component={"span"} data-testid="ellipsis-text">
          <FirstPart sx={sxFirstPart}>{firstPart}</FirstPart>
          <Lastpart sx={sxLastPart}>{lastPart}</Lastpart>
        </Box>
      </CustomTooltip>
      {isCopy && <CopyButton text={value} data-testid="copy-button" />}
      {afterElm && <StyledAfterElm className="after-dynamic-text">{afterElm}</StyledAfterElm>}
    </Container>
  );
};

export default DynamicEllipsisText;

export const ScrollTooltipContent = styled(Box)`
  max-height: 40vh;
  overflow: auto;
  padding: 0 ${({ theme }) => theme.spacing(1)};
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.primary[100]};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.secondary.light};
  }
  &:hover {
    border-radius: 8px 0px 0px 8px;
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;
