import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { changeLanguage } from "i18next";
import moment from "moment";

import { APP_LANGUAGES } from "src/commons/utils/constants";
import { StyledMenuItem } from "src/components/commons/Table/styles";
import { getLang, setLang } from "src/commons/utils/helper";

import { StyledSelect } from "../SelectNetwork";

const SelectLangauge = () => {
  const [currentLanguage, setCurrentLanguage] = useState<APP_LANGUAGES>(getLang());

  useEffect(() => {
    handleChange(currentLanguage);
  }, [currentLanguage]);

  const handleChange = (lang: APP_LANGUAGES) => {
    setCurrentLanguage(lang);
    setLang(lang);
    changeLanguage(lang);
    moment.locale(lang);
  };

  return (
    <StyledSelect
      data-testid="language-select"
      onChange={(e) => handleChange(e.target.value as APP_LANGUAGES)}
      value={currentLanguage}
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

export default SelectLangauge;
