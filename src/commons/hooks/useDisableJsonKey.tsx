import { Box } from "@mui/material";
import { JsonViewerKeyRenderer } from "@textea/json-viewer";
import { isNumber } from "lodash";
import { useEffect } from "react";

const useDisableJsonKey = (data: unknown): { trigger: () => void; keyRenderer: JsonViewerKeyRenderer } => {
  const trigger = () => {
    setTimeout(() => {
      const elements = document.querySelectorAll("[data-row-id='json-row']");
      elements.forEach((element) => {
        const visibleElemet = element.parentNode?.parentNode?.querySelector("& > div");
        (visibleElemet as HTMLElement).style.display = "none";
      });
    }, 50);
  };
  useEffect(() => {
    const elements = document.querySelectorAll("[data-row-id='json-row']");
    elements.forEach((element) => {
      const visibleElemet = element.parentNode?.parentNode?.querySelector("& > div");
      (visibleElemet as HTMLElement).style.display = "none";
    });
  }, [data]);
  const keyRenderer: JsonViewerKeyRenderer = () => {
    return <Box data-row-id="json-row" />;
  };
  keyRenderer.when = ({ path }) => {
    return isNumber(path[path.length - 1]);
  };
  return { keyRenderer, trigger };
};

export default useDisableJsonKey;
