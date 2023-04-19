import { styled } from "@mui/material";

export const WrapContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  max-width: 265px;
  max-height: 150px;
  background: ${props => props.theme.palette.background.paper};
  padding: 20px;
  border-radius: 12px;
`;
export const OverviewIcon = styled("div")`
  border-radius: 49px;
  background: ${props => props.theme.palette.green[600_10]};
  width: 29px;
  height: 29px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px;
  gap: 10px;
`
export const OverviewTitle = styled("p")`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.palette.text.primary};
`


