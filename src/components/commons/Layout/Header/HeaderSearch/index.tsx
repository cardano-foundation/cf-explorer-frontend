import React, { FormEvent, useState } from "react";
import { Button, Input, MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { HeaderSearchIcon } from "../../../../../commons/resources";
import styles from "./index.module.scss";
import { routers } from "../../../../../commons/routers";
import { stringify } from "qs";
import { BiChevronDown } from "react-icons/bi";

const Form = styled("form")<{ isHome: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${props => (props.isHome ? 785 : 400)}px;
  height: ${props => (props.isHome ? 60 : 44)}px;
  margin: auto;
  border-radius: ${props => (props.isHome ? 30 : 8)}px;
  background-color: #fff;
  color: ${props => props.theme.textColor};
  padding: 0px 0px 0px ${props => (props.isHome ? 15 : 0)}px;
  border: 1px solid ${props => props.theme.borderColor};
  margin-top: ${props => (props.isHome ? 30 : 0)}px;
`;

const StyledSelect = styled(Select)<{ isHome: boolean }>`
  font-size: ${props => (props.isHome ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  min-width: ${props => (props.isHome ? 150 : 130)}px;
  position: relative;
  @media screen and (max-width: 539px) {
    min-width: ${props => (props.isHome ? 130 : 110)}px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => (props.isHome ? 50 : 34)}px !important;
    padding: 5px;
    font-weight: var(--font-weight-normal);
    border-radius: 0px !important;
    padding-right: 2em !important;
    color: ${props => props.theme.textColor};
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${props => props.theme.textColorPale};
    font-size: 1.75rem;
  }
`;
const Option = styled(MenuItem)<{ isHome: boolean }>`
  font-size: ${props => (props.isHome ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  color: ${props => props.theme.textColor};
  font-weight: var(--font-weight-normal);
`;

const StyledInput = styled(Input)<{ isHome: boolean }>`
  padding: 0px 0px 0px ${props => (props.isHome ? 20 : 10)}px;
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  font-size: ${props => (props.isHome ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  width: 100%;
  border-left: 2px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 539px) {
    padding: 0px 0px 0px 10px;
  }
  & > input {
    padding: ${props => (props.isHome ? 5 : 0)}px;
  }
`;

const SubmitButton = styled(Button)<{ isHome: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: ${props => (props.isHome ? 50 : 12.5)}%;
  min-width: ${props => (props.isHome ? 60 : 44)}px;
  width: ${props => (props.isHome ? 60 : 44)}px;
  height: ${props => (props.isHome ? 60 : 44)}px;
`;
const Image = styled("img")<{ isHome: boolean }>`
  width: ${props => (props.isHome ? 24 : 20)}px;
  height: ${props => (props.isHome ? 24 : 20)}px;
`;

interface Props {
  isHome: boolean;
}
interface FormValues {
  filter: string;
  search: string;
}
interface Option {
  value: string;
  label: React.ReactNode;
}
const intitalValue: FormValues = {
  filter: "all",
  search: "",
};

const options: Option[] = [
  {
    value: "all",
    label: "All Filters",
  },
  {
    value: "other",
    label: "Other Filter",
  },
];
const HeaderSearch: React.FC<Props> = ({ isHome }) => {
  const history = useHistory();
  const [{ search, filter }, setValues] = useState<FormValues>({ ...intitalValue });

  const handleSearch = (e?: FormEvent) => {
    e?.preventDefault();
    if (search) {
      history.push(
        `${routers.TRANSACTION_LIST}?${stringify({ search, filter: filter !== "all" ? filter : undefined })}`
      );
      setValues({ ...intitalValue });
    }
  };
  const handleChangeFilter = (e: SelectChangeEvent<unknown>) => {
    setValues({ search, filter: e.target.value as Option["value"] });
  };
  const handleChangeSearch = (e?: React.ChangeEvent) => {
    setValues({ filter, search: (e?.target as HTMLInputElement)?.value as Option["value"] });
  };
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.code === "Enter" || e.keyCode === 13 || e.which === 13) {
      handleSearch();
    }
  };

  return (
    <Form onSubmit={handleSearch} isHome={isHome}>
      <StyledSelect onChange={handleChangeFilter} value={filter} IconComponent={BiChevronDown} isHome={isHome}>
        {options.map(({ value, label }) => (
          <Option key={value} value={value} isHome={isHome}>
            {label}
          </Option>
        ))}
      </StyledSelect>
      <StyledInput
        isHome={isHome}
        required
        type="search"
        spellCheck={false}
        placeholder="Search transaction, address, block, epoch, pool..."
        onChange={handleChangeSearch}
        onKeyDown={handleKeydown}
        disableUnderline
      />
      <SubmitButton className={styles.buttonSearch} type="submit" isHome={isHome}>
        <Image src={HeaderSearchIcon} alt="search" isHome={isHome} />
      </SubmitButton>
    </Form>
  );
};

export default HeaderSearch;
