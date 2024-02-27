import { LineData, Time } from "lightweight-charts";
import { useState, useEffect } from "react";
import { getPrice } from "services";

export default function useTokenPair() {
  const [prices, setPrices] = useState<LineData<Time>[]>();
  const [atomPrice, setAtomPrice] = useState<number>(0);
  const [ntrnPrice, setNtrnPrice] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    getPrice().then((res) => {
      const data = res.result.data.json;
      const atom =
        data[
          "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
        ];
      const ntrn = data["untrn"];
      const lineData = atom.series.map(
        (item: LineData<Time>, index: number) => ({
          time: item.time,
          value: parseFloat((ntrn.series[index].value / item.value).toFixed(4)),
        })
      );
      setPrices(lineData);
      const values = lineData.map((item: LineData<Time>) => item.value);
      setMinPrice(Math.min(...values));
      setMaxPrice(Math.max(...values));
      setAtomPrice(atom.series[atom.series.length - 1].value);
      setNtrnPrice(ntrn.series[ntrn.series.length - 1].value);
      setAveragePrice(
        values.reduce((a: number, b: number) => a + b, 0) / values.length
      );
      setLoading(false);
    });
  }, []);
  return {
    isLoading,
    prices,
    minPrice,
    maxPrice,
    averagePrice,
    atomPrice,
    ntrnPrice,
  };
}
