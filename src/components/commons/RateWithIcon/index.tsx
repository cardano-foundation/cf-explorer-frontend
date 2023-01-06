import { Box, styled } from "@mui/material";
import { DownRedIcon, UpGreenIcon } from "../../../commons/resources";

const PriceRate = styled(Box)<{ size?: string | number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.colorRed};
  font-size: ${({ size }) => {
    if (typeof size === "number") return `${size}px`;
    if (typeof size === "string") return size;
    return "var(--font-size-text-small)";
  }}};
`;

const ImageRate = styled("img")<{ up: number }>`
  width: 0.7143em;
  height: 0.7143em;
`;

const PriceValue = styled("span")<{ up: number }>`
  color: ${props => (props.up ? props.theme.colorGreenLight : props.theme.colorRed)};
`;

const RateWithIcon = ({ value, size }: { value: number; size?: string | number }) => (
  <PriceRate size={size}>
    {!value ? "" : <ImageRate up={value >= 0 ? 1 : 0} src={value >= 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />}
    <PriceValue up={value >= 0 ? 1 : 0}>
      {!value ? "" : value > 0 ? "+" : "-"}
      {value?.toString().replace(".", ",") || 0} %
    </PriceValue>
  </PriceRate>
);
export default RateWithIcon;
