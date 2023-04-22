import { styled } from "@mui/material";

export const ModalTitle = styled("div")({
  fontWeight: "var(--font-weight-bold)",
  fontSize: "var(--font-size-title)",
  color: "var(--text-color)",
  marginBottom: 30,
});

export const TextUserInfo = styled("span")({
  fontWeight: 500,
  fontSize: "var(--font-size-text)",
  color: "var(--text-color)",
});

export const TextTx = styled("span")`
  font-weight: 400;
  font-size: 14px;
  color: #667085;
`;

export const CustomTab = styled("span")`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-transform: none;
`;

export const TextAmountReward = styled("span")`
  color: #f75e5e;
`;
