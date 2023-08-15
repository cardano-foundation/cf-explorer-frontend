import { Box, styled } from "@mui/material";
import { BigNumber } from "bignumber.js";

import { DownRedIcon, UpGreenIcon } from "src/commons/resources";

import CustomTooltip from "../CustomTooltip";

const PriceRate = styled(Box)<{ size?: string | number }>`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
  font-size: ${({ size }) => {
    if (typeof size === "number") return `${size}px`;
    if (typeof size === "string") return size;
    return "var(--font-size-text-small)";
  }};
`;

const ImageRate = styled("img")<{ sign: number }>`
  width: 10px;
  height: 10px;
`;

const PriceValue = styled("span")<{ sign: number }>`
  color: ${({ theme, sign }) => (sign > 0 ? theme.palette.success[800] : theme.palette.error[700])};
  font-weight: var(--font-weight-bold);
`;

const PriceChange = styled("span")`
  color: ${(props) => props.theme.palette.text.primary};
  font-weight: var(--font-weight-bold);
`;

const PriceNoValue = styled("span")`
  color: ${(props) => props.theme.palette.text.primary};
  margin-left: 28px;
  font-weight: var(--font-weight-bold);
`;

interface Props {
  value: number;
  size?: string | number;
  multiple?: number;
  showIcon?: boolean;
}
const RateWithIcon = ({ value, size, multiple = 1, showIcon = true }: Props) => {
  if (!value) return <PriceNoValue>0</PriceNoValue>;

  const multiplied = BigNumber(value).multipliedBy(multiple);
  const sign = Math.sign(multiplied.toNumber());

  return (
    <CustomTooltip title={`${sign > 0 ? "+" : ""}${multiplied.toNumber()}`}>
      <PriceRate size={size}>
        {showIcon && <ImageRate sign={sign} src={sign > 0 ? UpGreenIcon : DownRedIcon} alt="rate" />}
        <PriceValue sign={sign}>
          {sign > 0 ? "+" : ""}
          {multiplied.toFixed(2, BigNumber.ROUND_DOWN).toString().replace(".", ",")} %
        </PriceValue>
        <PriceChange>(24h)</PriceChange>
      </PriceRate>
    </CustomTooltip>
  );
};
export default RateWithIcon;
