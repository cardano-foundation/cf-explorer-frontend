import { styled, Box } from "@mui/material";

export const Header = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  fontSize: "1.125rem",
  textAlign: "left"
}));

export const HereButton = styled("button")`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: var(--font-size-text);
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const StyledCard = {
  Container: styled("div")`
    height: 100%;
    background: ${(props) => props.theme.palette.secondary[0]};
    border-radius: 4px;
    display: flex;
  `,

  ContainerTitile: styled("div")`
    height: 100%;
    display: flex;
    margin-bottom: 15px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `,

  ContainerValue: styled("div")`
    height: 100%;
    display: flex;
    margin-bottom: 15px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `,

  Content: styled("div")`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  Title: styled("span")`
    color: ${(props) => props.theme.palette.secondary.light};
    font-weight: var(--font-weight-bold);
    white-space: nowrap;
    display: block;
  `,
  Value: styled("span")`
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-text-small);
    color: ${(props) => props.theme.palette.secondary.light};
  `,

  Comment: styled("span")`
    font-weight: var(--font-weight-bold);
    color: ${(props) => props.theme.palette.secondary.main};
  `
};
export const StyledImg = styled("img")`
  display: block;
`;
