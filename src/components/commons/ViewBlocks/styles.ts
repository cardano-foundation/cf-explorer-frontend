import { Box, Typography, styled } from "@mui/material";

export const SquareBox = styled(Box)`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.primary.main};
  width: 100%;
  max-width: 138px;
  aspect-ratio: 1/1;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  gap: 12px;
`;

export const PrimaryText = styled(Typography)`
  color: ${(props) => props.theme.palette.common.white};
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
`;

export const CircleBoxOutline = styled(CircleBox)`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.common.white};
`;

export const PolygonContainer = styled(Box)`
  box-sizing: border-box;
  position: relative;
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
  color: ${(props) => props.theme.palette.common.white};
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  width: 100%;
  max-width: 170px;
  white-space: nowrap;
`;

export const CustomBadge = styled("span")<{ bgColor?: string; color?: string }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 4px;
  font-size: 12px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor ?? props.theme.palette.secondary.light};
  color: ${(props) => props.color ?? props.theme.palette.common.white};
`;

export const Rrounded = styled(Box)`
  box-sizing: border-box;
  border-radius: 16px;
  border: 2px dashed ${({ theme }) => theme.palette.secondary.light};
  padding: 24px 34px;
  display: flex;
  justify-content: center;
  gap: 24px;
  background-color: ${({ theme }) => theme.palette.primary[200]};
  width: 100%;
  max-width: 324px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    max-width: 336px;
  }
`;

export const MintContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  justify-content: space-between;
  height: max-content;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 920px;
  ${(props) => props.theme.breakpoints.down("lg")} {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
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
    width: 100%;
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

export const SpendContainer = styled(MintContainer)`
  width: 100%;
  max-width: 780px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-wrap: nowrap;
  }
`;

export const LongButton = styled("button")`
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  padding: 16px;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
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
`;

export const RewardContainer = styled(MintContainer)`
  justify-content: center;
  align-items: center;
`;
export const Center = styled(Box)`
  max-width: 620px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down("sm")} {
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
  background-color: ${({ theme }) => theme.palette.common.white};
  width: 100%;
`;

export const CertContainer = styled(MintContainer)`
  justify-content: center;
`;

export const CertRrounded = styled(Rrounded)`
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
`;
