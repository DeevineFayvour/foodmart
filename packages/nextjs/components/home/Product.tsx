import { useState } from "react";
import Image from "next/image";
// Components
import { Rating } from "./Rating";
import close from "./assets/close.svg";
import { readContract } from "@wagmi/core";
import { formatUnits } from "viem";
import { useScaffoldContractWrite, useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

interface ProductProps {
  item: any; // replace 'any' with the type of your item object
  account: any;
  foodMart: any;
  abi: any; // replace 'any' with the type of your abi object
  togglePop: (item: any) => void;
}

export const Product = ({ item, account, foodMart, abi, togglePop }: ProductProps) => {
  const [order, setOrder] = useState<any>(null);

  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "Buy",
    listener: async logs => {
      const orders = logs.filter(log => {
        log.args.buyer === account && log.args.itemId?.toString() === item[0].toString();
      });
      if (orders.length === 0) return;
      const order = await readContract({
        abi,
        address: foodMart.data.address,
        functionName: "order",
        args: [account, orders[0].args.orderId],
      });

      console.log(orders);
      console.log(order);

      setOrder(order);
    },
  });

  const { writeAsync: buy } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "buy",
    args: [item[0]],
    value: item[4],
  });

  return (
    <div className="fixed top-0 left-0 z-20 flex justify-center w-screen h-screen text-sm bg-black bg-opacity-60">
      <div className="lg:w-[50%] w-[65%] mt-10 bg-base-200 rounded-3xl h-5/6 sm:grid gap-4 p-6 sm:grid-cols-2 items-center  absolute sm:overflow-hidden overflow-y-scroll">
        <div className="">
          <img src={item[3]} alt="Product" />
        </div>
        <div className="">
          <h1 className="text-lg font-semibold uppercase">{item[2] == "main_dish" ? "Main Dish" : item[2]}</h1>

          <Rating value={item[5]} />

          <hr className="mt-2 mb-2" />

          <h2 className="text-lg font-semibold">{formatUnits(item[4].toString(), 18)} ETH</h2>

          <hr />

          <h2 className="text-lg font-semibold">Overview</h2>

          <p>{item[1]}</p>
          <p>{item[6]}</p>

          <button className="px-6 py-3 bg-orange-400 hover:bg-orange-500 rounded-3xl" onClick={() => buy()}>
            Buy Now
          </button>
        </div>

        <button onClick={togglePop} className="absolute right-3 top-2 ">
          <Image src={close} alt="Close" width={15} />
        </button>
      </div>
    </div>
  );
};
