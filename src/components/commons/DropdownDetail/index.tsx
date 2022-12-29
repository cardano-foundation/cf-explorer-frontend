import React from "react";
import { Link } from "react-router-dom";

import { CloseIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { getShortWallet } from "../../../commons/utils/helper";

import CopyButton from "../CopyButton";
import CustomTooltip from "../CustomTooltip";

import { ButtonClose, DropdownList, DropdownTitle, InfoValue, ListDropdownContainer } from "./styles";

interface IDropdownDetailProps {
  title: string;
  value: string[];
  close?: () => void;
  minWidth?: number | string;
}

const DropdownDetail: React.FC<IDropdownDetailProps> = ({ title, value, close, minWidth}) => {
  return (
    <ListDropdownContainer minWidth={minWidth}>
      <ButtonClose onClick={close}>
        <img src={CloseIcon} alt="icon close" />
      </ButtonClose>
      <DropdownTitle>{title}</DropdownTitle>
      <DropdownList>
        {value.map((item, index) => (
          <InfoValue key={index}>
            <CustomTooltip placement="top" title={item}>
              <Link
                to={details.address(item)}
                style={{ fontFamily: "var(--font-family-text)", color: "var(--color-blue)" }}
              >
                {getShortWallet(item)}
              </Link>
            </CustomTooltip>
            <CopyButton text={item} />
          </InfoValue>
        ))}
      </DropdownList>
    </ListDropdownContainer>
  );
};

export default DropdownDetail;
