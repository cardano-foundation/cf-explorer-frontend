import i18next from "i18next";
import { BiChevronDown } from "react-icons/bi";

import { APP_LANGUAGES } from "src/commons/utils/constants";
import { StyledMenuItem } from "src/components/commons/Table/styles";
import { handleChangeLanguage } from "src/commons/utils/helper";

import { StyledSelect } from "../SelectNetwork";

const SelectLanguage = () => {
  const language = i18next.language as APP_LANGUAGES;

  const handleChange = (lang: APP_LANGUAGES) => {
    handleChangeLanguage(lang, language);
  };

  return (
    <StyledSelect
      data-testid="language-select"
      onChange={(e) => handleChange(e.target.value as APP_LANGUAGES)}
      value={language}
      IconComponent={BiChevronDown}
      MenuProps={{ style: { zIndex: 1303 } }}
    >
      {Object.entries(APP_LANGUAGES).map(([, value]) => (
        <StyledMenuItem data-testid="language-options" key={value} value={value}>
          {value?.toUpperCase()}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectLanguage;
