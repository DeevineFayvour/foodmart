// Components
import { useState } from "react";
import { foodcals } from "../../data/foodcal";
import { Rating } from "./Rating";
import { formatUnits } from "viem";

interface SectionProps {
  title: any;
  items: any;
  togglePop: (item: any) => void;
}

export const Section = ({ title, items, togglePop }: SectionProps) => {
  return (
    <>
      {!items ? (
        <div className="p-20 flex justify-center items-center text-2xl">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div
          className=""
          style={{
            maxWidth: "1200px",
            margin: "0 auto 50px",
            padding: "0 20px",
          }}
        >
          <h3 id={title} className="font-semibold mb-4">
            {title}
          </h3>

          <hr />

          <div className="grid md:grid-cols-4 grid-cols-3 text-sm mt-10 justify-start">
            {items.map((item: any, index: number) => (
              <div
                className="w-5/6 hover:shadow-xl cursor-pointer flex flex-col justify-between my-2"
                key={index}
                onClick={() => togglePop(item)}
              >
                <div className="relative">
                  <img className="hover:opacity-60" src={item[3]} height={300} alt="Item" />
                  <div className="absolute top-0 left-0 w-full h-full bg-black text-white opacity-0 hover:opacity-60 transition-opacity flex justify-center items-center text-">
                    {foodcals.map(food =>
                      food.id.toString() == item[0].toString() ? <div className="font-bold" key={food.id}>{food.calorie}</div> : null,
                    )}
                  </div>
                </div>
                <div className="px-2 mt-3">
                  <h4>{item[1]}</h4>
                  <Rating value={item[5]} />
                  <p className="mt-2">{formatUnits(item[4].toString(), 18)} ETH</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
