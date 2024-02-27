import React from "react";
import { Atom, Neutron } from "components/Icons";
import useTokenPair from "hooks/useTokenPair";

export default function Header() {
  const { minPrice, maxPrice, averagePrice, atomPrice, ntrnPrice } =
    useTokenPair();

  return (
    <div className="p-4 bg-blue-500 bg-opacity-60 rounded-lg min-w-[500px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <Atom />
              <p>ATOM</p>
              <p>(${atomPrice})</p>
            </div>
            <div className="flex flex-col items-center">
              <Neutron />
              <p>NTRN</p>
              <p>(${ntrnPrice})</p>
            </div>
          </div>
          <p className="text-white text-2xl">7 Day Price Chart</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-end gap-2">
            <p>Min Price: </p>
            <p className="text-xl font-bold text-yellow-300">{minPrice}</p>
          </div>
          <div className="flex items-end gap-2">
            <p>Max Price: </p>
            <p className="text-xl font-bold text-yellow-300">{maxPrice}</p>
          </div>
          <div className="flex items-end gap-2">
            <p>Avg Price: </p>
            <p className="text-xl font-bold text-yellow-300">
              {averagePrice.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
