import { changeLanguage } from "i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import { APP_LANGUAGES } from "src/commons/utils/constants";
import { getLang, setLang } from "src/commons/utils/helper";
import { StyledMenuItem } from "src/components/commons/Table/styles";

import { StyledSelect } from "../SelectNetwork";

const SelectLangauge = () => {
  const [currentLanguage, setCurrentLanguage] = useState<APP_LANGUAGES>(getLang());
  useEffect(() => {
    handleChange(currentLanguage);
  }, [currentLanguage]);

  const handleChange = (lang: APP_LANGUAGES, isUserBehavior?: boolean) => {
    const currentLang = getLang();
    setCurrentLanguage(lang);
    setLang(lang);
    changeLanguage(lang);
    moment.locale(lang);
    if (isUserBehavior) {
      const newURL = window.location.href.replace(`/${currentLang}`, "");
      window.location.href = newURL;
    }
  };

  return (
    <StyledSelect
      data-testid="language-select"
      onChange={(e) => handleChange(e.target.value as APP_LANGUAGES, true)}
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
