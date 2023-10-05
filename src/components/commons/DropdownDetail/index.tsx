import React from "react";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "@mui/material";

import { details } from "src/commons/routers";
import { getShortWallet } from "src/commons/utils/helper";
import { StyledLink } from "src/components/share/styled";

import CopyButton from "../CopyButton";
import CustomTooltip from "../CustomTooltip";
import { ButtonClose, DropdownList, DropdownTitle, InfoValue, ListDropdownContainer } from "./styles";

interface IDropdownDetailProps {
  title: string;
  value: string[];
  close?: () => void;
  minWidth?: number | string;
  isStakeDetail?: boolean;
}

const DropdownDetail: React.FC<IDropdownDetailProps> = ({ title, value, close, minWidth, isStakeDetail = false }) => {
  const ref = useOutsideClick(close);
  const theme = useTheme();
  return (
    <ListDropdownContainer minWidth={minWidth} ref={ref}>
      <ButtonClose onClick={close}>
        <IoMdClose color={theme.palette.secondary.light} data-testid="icon-close" />
      </ButtonClose>
      <DropdownTitle>{title}</DropdownTitle>
      <DropdownList>
        {value.map((item, index) => (
          <InfoValue key={index}>
            <CustomTooltip title={item}>
              <StyledLink to={isStakeDetail ? details.stake(item) : details.address(item)}>
                {getShortWallet(item)}
              </StyledLink>
            </CustomTooltip>
            <CopyButton text={item} />
          </InfoValue>
        ))}
      </DropdownList>
    </ListDropdownContainer>
  );
};

export default DropdownDetail;

const useOutsideClick = (callback?: () => void) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        callback && callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return ref;
};
