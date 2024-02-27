import { useEffect, createRef } from "react";
import { createChart } from "lightweight-charts";
import { CircleLoader } from "react-spinners";
import useTokenPair from "hooks/useTokenPair";

export default function Chart() {
  const { prices } = useTokenPair();
  const divRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (divRef.current && prices) {
      const chart = createChart(divRef.current, {
        width: divRef.current?.clientWidth,
        height: divRef.current?.clientHeight,
        layout: {
          background: { color: "transparent" },
          textColor: "#DDD",
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
      });
      const lineSeries = chart.addLineSeries({
        priceScaleId: "right",
        color: "#fff",
      });

      chart.applyOptions({
        rightPriceScale: {
          visible: true,
        },
      });

      lineSeries.setData(prices);
      chart.timeScale().fitContent();
      const handleResize = () => {
        chart.applyOptions({ width: divRef.current?.clientWidth });
      };
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [divRef, prices]);
  if (!prices) {
    return <CircleLoader color="#36d7b7" />;
  }
  return (
    <div className="bg-blue-500 flex flex-col bg-opacity-60 p-4 gap-4 rounded-lg min-w-[500px] min-h-[500px]">
      <div>
        <div className="flex items-end gap-1">
          <p className="text-xl font-bold text-yellow-300">
            ${prices[prices.length - 1].value}
          </p>
          <p className="text-sm">ATOM/NTRN</p>
        </div>
        <p className="">X - Date</p>
        <p className="">Y - ATOM/NTRN Price</p>
      </div>
      <div ref={divRef} className="w-full h-full" />
    </div>
  );
}
