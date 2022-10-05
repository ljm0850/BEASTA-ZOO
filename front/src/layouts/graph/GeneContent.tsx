// import ApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import { javsGeneContent } from "../../api/solidity";
import { useState, useEffect } from "react";
import _ from "lodash";
interface Props {
  tokenId: number | 0;
}

// let flag = false
const GeneContent = ({ tokenId }: Props) => {
  const [genes, setGenes] = useState([0]);
  const [javName, setJavName] = useState([""]);
  const totalName = [
    "사슴",
    "고양이",
    "닭",
    "양",
    "돼지",
    "새",
    "용",
    "토끼",
    "호랑이",
  ];

  let NFT_Content: number[] = [];
  let Content_Name: string[] = [];
  const getGenes = async () => {
    NFT_Content = [];
    Content_Name = [];
    const javs = await javsGeneContent(tokenId);
    await console.log(javs);
    for (let i = 0; i < 9; i++) {
      console.log(i);
      if (javs[i] !== 0) {
        NFT_Content.push(javs[i]);
        Content_Name.push(totalName[i]);
      }
    }
    setJavName(Content_Name);
    setGenes(NFT_Content);
  };
  // getGenes()
  useEffect(() => {
    getGenes();
    return () => {};
  }, [tokenId]);

  return (
    <div>
      <Chart
        type="donut"
        width={250}
        height={300}
        series={genes}
        options={{
          labels: javName,
          chart: {
            fontFamily: "Pretendard Variable",
          },
        }}
      />
    </div>
  );
};

export default GeneContent;
