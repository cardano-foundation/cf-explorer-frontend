import { MainContent, WrapTopSearch } from "./styles";
import HeaderSearch from "../../Header/HeaderSearch";

type TProps = {
  open: boolean;
  onClose: (value: boolean) => void;
};

function TopSearch({ open, onClose }: TProps) {
  return (
    <WrapTopSearch anchor='top' sx={{ zIndex: 10 }} open={open} onClose={() => onClose(false)}>
      <MainContent>
        <HeaderSearch home={false} callback={() => onClose(false)} />
      </MainContent>
    </WrapTopSearch>
  );
}

export default TopSearch;
