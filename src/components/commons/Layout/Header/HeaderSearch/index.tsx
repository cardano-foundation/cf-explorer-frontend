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
  max-width: 785px;
  height: 60px;
  margin: auto;
  border-radius: 30px;
  background-color: #fff;
  color: ${props => props.theme.textColor};
  padding: 0px 0px 0px 15px;
  border: 1px solid ${props => props.theme.borderColor};
  margin-top: 30px;
`;

const StyledSelect = styled(Select)`
  font-size: var(--font-size-text-large);
  min-width: 150px;
  position: relative;
  @media screen and (max-width: 539px) {
    min-width: 130px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px !important;
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
const Option = styled(MenuItem)`
  font-size: var(--font-size-text-large);
  color: ${props => props.theme.textColor};
  font-weight: var(--font-weight-normal);
`;

const StyledInput = styled(Input)`
  padding: 0px 0px 0px 20px;
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  font-size: var(--font-size-text-large);
  width: 100%;
  border-left: 2px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 539px) {
    padding: 0px 0px 0px 10px;
  }
`;

const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  min-width: 60px;
  width: 60px;
  height: 60px;
`;
const Image = styled("img")`
  width: 24px;
  height: 24px;
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
      <StyledSelect onChange={handleChangeFilter} value={filter} IconComponent={BiChevronDown}>
        {options.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </StyledSelect>
      <StyledInput
        required
        type="search"
        spellCheck={false}
        placeholder="Search transaction, address, block, epoch, pool..."
        onChange={handleChangeSearch}
        onKeyDown={handleKeydown}
        disableUnderline
      />
      <SubmitButton className={styles.buttonSearch} type="submit">
        <Image src={HeaderSearchIcon} alt="search" />
      </SubmitButton>
    </Form>
  );
};

export default HeaderSearch;
