import { Popover } from "@mui/material";
import { Button, styled } from "@mui/material";

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 8px;
  background: ${props => props.theme.palette.primary.dark};
  color: ${props => props.theme.palette.background.paper};
  font-weight: 700;
  font-size: 14px;
  height: 38px;
  text-transform: none;
`;
export const OutlineButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 8px;
  background: ${props => props.theme.palette.green[600_10]};
  color: ${props => props.theme.palette.primary.dark};
  font-weight: 700;
  font-size: 14px;
  height: 35px;
  text-transform: none;
`;

export const GridBox = styled("div")`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px 10px;
  @media (max-width: 1240px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

export const WrapFilterDescription = styled("span")`
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.palette.grey[400]};
`

export const WrapPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: 6px;
    border-radius: 20px;
    width: 220px;
    height: 120px;
    display: flex;
    align-items: center;
  }
`;

