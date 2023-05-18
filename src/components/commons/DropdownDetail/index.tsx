import React from "react";

import { CloseIcon } from "~/commons/resources";
import { details } from "~/commons/routers";
import { getShortWallet } from "~/commons/utils/helper";

import CopyButton from "../CopyButton";
import CustomTooltip from "../CustomTooltip";

import { ButtonClose, DropdownList, DropdownTitle, InfoValue, ListDropdownContainer } from "./styles";
import { StyledLink } from "~/components/share/styled";

interface IDropdownDetailProps {
  title: string;
  value: string[];
  close?: () => void;
  minWidth?: number | string;
  isStakeDetail?: boolean;
}

const DropdownDetail: React.FC<IDropdownDetailProps> = ({ title, value, close, minWidth, isStakeDetail = false }) => {
  const ref = useOutsideClick(close);
  return (
    <ListDropdownContainer minWidth={minWidth} ref={ref}>
      <ButtonClose onClick={close}>
        <img src={CloseIcon} alt='icon close' />
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
  }, [ref]);

  return ref;
};
