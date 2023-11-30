import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { pick } from "lodash";

import { getPageInfo } from "../utils/helper";

const usePageInfo = () => {
  const { search } = useLocation();
  const history = useHistory();

  const pageInfo = getPageInfo(search);

  const setSort = (sort: string) => {
    if (sort === "") {
      history.replace({ search: stringify(pick(pageInfo, ["page", "size", "retired"])) });
    } else {
      history.replace({ search: stringify({ ...pageInfo, sort }) });
    }
  };

  return { pageInfo, setSort };
};

export default usePageInfo;
