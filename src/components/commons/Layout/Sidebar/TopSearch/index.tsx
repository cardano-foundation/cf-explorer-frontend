import { useState } from "react";

import HeaderSearch from "../../Header/HeaderSearch";
import { MainContent, WrapTopSearch } from "./styles";

type TProps = {
  open: boolean;
  onClose: (value: boolean) => void;
};

function TopSearch({ open, onClose }: TProps) {
  const [showError, setShowError] = useState(false);
  return (
    <WrapTopSearch anchor="top" sx={{ zIndex: 10 }} open={open} onClose={() => onClose(false)}>
      <MainContent height={showError ? 100 : "auto"}>
        <HeaderSearch home={false} setShowErrorMobile={setShowError} callback={() => onClose(false)} />
      </MainContent>
    </WrapTopSearch>
  );
}

export default TopSearch;
