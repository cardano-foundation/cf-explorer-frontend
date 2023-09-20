import { styled } from "@mui/material";

export const ToggleMenu = styled("button")`
  position: absolute;
  top: 50px;
  right: 0px;
  transform: translateX(50%) translateY(-50%);
  width: 40px;
  height: 40px;
  padding: 9px;
  border-radius: 50%;
  border: none;
  color: ${(props) => props.theme.palette.primary.contrastText};
  background: none;
  cursor: pointer;
  z-index: 1;
  ${({ theme }) => theme.breakpoints.down("md")} {
    top: 32px;
    left: -42px;
    padding: 5px;
  }
`;

export const ArrowCollapse = styled("span")<{ mobile?: number }>`
  z-index: 100;
  width: 22px;
  height: 22px;
  display: ${({ mobile }) => (mobile ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.primary[200]};
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: ${({ mobile }) => (mobile ? "flex" : "none")};
    width: 30px;
    height: 30px;
  }
`;
