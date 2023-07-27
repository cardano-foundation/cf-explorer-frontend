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
    display: none;
  }
`;

export const ArrowCollapse = styled("span")`
  z-index: 100;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.primary[200]};
`;
