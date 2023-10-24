import React from "react";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "@mui/material";

import { details } from "src/commons/routers";
import { StyledLink } from "src/components/share/styled";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

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
            <StyledLink to={isStakeDetail ? details.stake(item) : details.address(item)}>
              <DynamicEllipsisText value={item} isCopy isTooltip />
            </StyledLink>
          </InfoValue>
        ))}
      </DropdownList>
    </ListDropdownContainer>
  );
};

export default DropdownDetail;

const useOutsideClick = (callback?: () => void) => {
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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
