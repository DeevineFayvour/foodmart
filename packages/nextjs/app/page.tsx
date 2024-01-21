"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
// import { LoadingOutlined } from "@ant-design/icons";
import { getAccount, readContract } from "@wagmi/core";
import type { NextPage } from "next";
import { Navigation } from "~~/components/home/Navigation";
import { Product } from "~~/components/home/Product";
import { Section } from "~~/components/home/Section";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

interface item {
  id: number;
  cost: any;
  image: any;
  name: any;
  rating: any;
  stock: any;
  description: any;
  address: any;
}

const Home: NextPage = () => {
  const account = getAccount();

  const [toggle, setToggle] = useState(false);
  const [smoothies, setSmoothies] = useState<any>(null);
  const [maindish, setMaindish] = useState<any>(null);
  const [salad, setSalad] = useState<any>(null);
  const [item, setItem] = useState<item | any>({});

  let contractAddress: any;
  let contractABI: any;

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("YourContract");
  if (deployedContractData) {
    ({ address: contractAddress, abi: contractABI } = deployedContractData);
  }

  const contract = useScaffoldContract({ contractName: "YourContract" });

  const togglePop = (item: any) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  const loadBlockchainData = async () => {
    const items = [];

    for (let i = 0; i < 18; i++) {
      const item = await readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "items",
        args: [i],
      });
      items.push(item);
    }

    const smoothies = items.filter(item => item[2] === "smoothie");
    const maindish = items.filter(item => item[2] === "main_dish");
    const salad = items.filter(item => item[2] === "salad");

    setSmoothies(smoothies);
    setMaindish(maindish);
    setSalad(salad);
  };

  useEffect(() => {
    if (deployedContractData) loadBlockchainData();
  }, [deployedContractData, contractABI, account]);

  return (
    <>
      <div>
        <div className="flex flex-col items-center pt-4 pb-16">
          <h2 className="text-3xl font-bold">FOOD MART</h2>
          <h2 className="text-lg"> We delight in serving you healthy meals…</h2>
        </div>
        
        <Navigation />
        
        {smoothies && salad && maindish ? (
          <>
            <Section title={"SMOOTHIE"} items={smoothies} togglePop={togglePop} />
            <Section title={"SALAD"} items={salad} togglePop={togglePop} />
            <Section title={"MAIN DISH"} items={maindish} togglePop={togglePop} />
          </>
        ) : (
          <div className="flex items-center justify-center p-32 text-2xl">
            {/* <LoadingOutlined /> */}
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        )}

        {toggle && (
          <Product item={item} account={account.address} foodMart={contract} abi={contractABI} togglePop={togglePop} />
        )}
      </div>
    </>
  );
};

export default Home;
