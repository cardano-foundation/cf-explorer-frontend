import { useEffect } from "react";
import Highcharts from "highcharts";

const useResizeHighChart = (wrapperRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!wrapperRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      for (let i = 0; i < Highcharts.charts.length; i++) {
        if (Highcharts.charts[i] !== undefined) {
          Highcharts.charts[i]?.reflow();
        }
      }
    });
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [wrapperRef]);
};

export default useResizeHighChart;
