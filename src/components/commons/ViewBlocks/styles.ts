import { Box, Typography, styled } from "@mui/material";

export const SquareBox = styled(Box)`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.primary.main};
  width: 100%;
  max-width: 138px;
  aspect-ratio: 1/1;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  gap: 12px;
  transition: 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const PrimaryText = styled(Typography)`
  color: ${(props) => (props.theme.isDark ? props.theme.palette.secondary[100] : props.theme.palette.common.white)};
  font-weight: 500;
  font-size: 16px;
  font-family: "Roboto", monospace;
`;

export const CircleBox = styled(Box)<{ bgColor?: string }>`
  box-sizing: border-box;
  width: 40px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.bgColor ?? props.theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover {
    background-color: ${(props) => props.bgColor ?? props.theme.palette.primary.dark};
  }
`;

export const CircleBoxOutline = styled(CircleBox)`
  box-sizing: border-box;
  background-color: ${(props) =>
    props.theme.isDark ? props.theme.palette.secondary[100] : props.theme.palette.common.white};

  &:hover {
    background-color: ${(props) =>
      props.theme.isDark ? props.theme.palette.secondary[100] : props.theme.palette.common.white};
  }
`;

export const PolygonContainer = styled(Box)`
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
`;

export const PolygonContent = styled(Box)`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`;

export const CompiledCodeButton = styled(Box)`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 16px 20px;
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white)};
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  width: 100%;
  max-width: 170px;
  white-space: nowrap;
  transition: 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const CustomBadge = styled("span")<{ bgColor?: string; color?: string }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 4px;
  font-size: 12px;
  width: fit-content;
  min-width: 16px;
  padding: 2px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${(props) =>
    props.bgColor
      ? props.bgColor
      : props.theme.isDark
      ? props.theme.palette.secondary[600]
      : props.theme.palette.secondary.light};
  color: ${(props) => (props.color ? props.color : props.theme.palette.common.white)};
`;

export const Rrounded = styled(Box)`
  box-sizing: border-box;
  border-radius: 16px;
  border: 2px dashed ${({ theme }) => (theme.isDark ? theme.palette.secondary[600] : theme.palette.secondary.light)};
  padding: 24px 34px;
  display: flex;
  justify-content: center;
  gap: 24px;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[200])};
  width: 100%;
  max-width: 324px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    max-width: 336px;
  }
  ${({ theme }) => theme.breakpoints.down(430)} {
    flex-direction: column;
  }
`;

export const MintContainer = styled(Box)<{ isMobile?: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: space-between;
  height: max-content;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 920px;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  ${(props) => props.theme.breakpoints.down("lg")} {
    max-width: unset;
    gap: 60px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

export const MiddleBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-sizing: border-box;
`;

export const RightBox = styled(Box)`
  ${({ theme }) => theme.breakpoints.down("lg")} {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
`;

export const BlueBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary[200]};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  border-radius: 16px;
`;

export const MintBlueBox = styled(BlueBox)<{ isBurned?: boolean }>(({ isBurned, theme }) => ({
  maxWidth: "100%",
  backgroundColor: theme.isDark
    ? isBurned
      ? theme.palette.secondary[100]
      : theme.palette.secondary[0]
    : isBurned
    ? theme.palette.primary[200]
    : theme.palette.common.white,
  padding: "unset"
}));

export const MintRrounded = styled(Rrounded)`
  ${({ theme }) => theme.breakpoints.down(430)} {
    flex-direction: column;
  }
`;

export const SpendContainer = styled(MintContainer)<{ isMobile?: number }>`
  width: 100%;
  max-width: 920px;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-wrap: nowrap;
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column !important;
  }
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: ${({ isMobile }) => (isMobile ? "60px" : "unset")};
  padding: 0px;
`;

export const LongButton = styled("button")`
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white)};
  padding: 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  font-family: "Roboto", monospace;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const SpendRounded = styled(Rrounded)`
  flex-direction: column;
  background-color: transparent;
  padding: 12px;
`;

export const SpendBlueBox = styled(BlueBox)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 484px;
  border-radius: 20px;
  ${({ theme }) => theme.breakpoints.down(420)} {
    flex-direction: column;
  }
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[200])};
`;

export const RewardContainer = styled(MintContainer)`
  justify-content: center;
  align-items: center;
`;
export const Center = styled(Box)<{ isMoble?: number }>`
  max-width: 900px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${({ isMoble }) => (isMoble ? "column" : "row")};
  gap: ${({ isMoble }) => (isMoble ? "60px" : "unset")};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    gap: 60px;
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
    gap: 60px;
  }
`;

export const CertificateTypeBox = styled(Box)`
  border-radius: 8px;
  box-shadow: 1px 2px 4px 0px rgba(67, 70, 86, 0.2);
  box-sizing: border-box;
  height: 75px;
  display: flex;
  padding: 0px 22px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white)};
  width: 100%;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const CertValueBox = styled(Typography)(({ theme }) => ({
  color: theme.isDark ? theme.palette.secondary.main : "",
  textAlign: "start"
}));

export const CertContainer = styled(MintContainer)`
  justify-content: center;
`;

export const CertRrounded = styled(Rrounded)(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: "300",
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    width: "280"
  }
}));

export const OutputsUTXOLink = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline !important;
  color: ${({ theme }) => theme.palette.primary.main} !important;
  cursor: pointer;
`;
