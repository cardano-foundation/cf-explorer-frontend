import { Box, Typography, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  & h2 {
    width: 100%;
  }
`;

export const VerifyScriptContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

export const StyledVerifyButton = styled(Box)<{ verified: boolean }>(({ verified }) => ({
  color: verified ? "#438F68" : "#FFFFFF",
  background: verified ? "rgba(67, 143, 104, 0.2)" : "#344054",
  cursor: "pointer",
  borderRadius: 2,
  padding: "4px 14px",
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: "14px",
  height: "24px",
  boxSizing: "border-box"
}));

export const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    label: {
      "*": {
        fontSize: 14,
        lineHeight: "16px"
      }
    }
  }
}));

export const StyledLabel = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin: 6px 0px;
`;

export const ModalTitle = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: rgba(19, 21, 47, 1);
  margin-bottom: 48px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 20px;
  }
`;

export const VerifyButton = styled(Box)<{ disabled: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #13152f;
  border-radius: 8px;
  padding: 10px 20px;
  position: absolute;
  width: 150px;
  height: 24px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    opacity: 0.85;
  }
  pointer-events: ${(props) => (props.disabled ? "none" : "unset")};
  cursor: pointer;
`;

export const ErrorMessage = styled(Box)`
  color: red;
  height: 132px;
  margin: 20px 0px;
`;

export const BannerSuccess = styled(Box)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  background: #5a9c56;
  border-radius: 10px;
  width: 100%;
  padding: 12px 0px;
  margin: 20px 0px;
`;
