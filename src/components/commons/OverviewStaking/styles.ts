import { alpha, styled, Card as CardMui } from "@mui/material";

export const WrapContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  max-height: 150px;
  background: ${(props) => props.theme.palette.background.paper};
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
`;
export const OverviewIcon = styled("div")`
  border-radius: 49px;
  background: ${(props) => props.theme.palette.primary[100]};
  width: 29px;
  height: 29px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px;
  gap: 10px;
`;
export const OverviewTitle = styled("p")`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const Card = styled(CardMui)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  flexDirection: "column",
  justifyContent: "center",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0m",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "1px 2px 15px 0px " + alpha(theme.palette.secondary.light, 0.25)
  }
}));
