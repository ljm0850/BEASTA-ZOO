// import ApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
import { javsGeneContent } from '../../api/solidity'
import { useState,useEffect } from 'react';
import _ from "lodash"
interface Props {
  tokenId:number|0;
}

// let flag = false
const GeneContent = ({tokenId}: Props) =>{
  const [genes,setGenes] = useState([0])
  const [javName,setJavName] = useState([""])
  const totalName = ["Deer","Cat","Rooster","Sheep","Boar","Bird","Dragon","Rabit","Tiger"]
  
  let NFT_Content:number[] = []
  let Content_Name:string[] = []
  const getGenes = async()=>{
    NFT_Content = []
    Content_Name = []
    const javs = await javsGeneContent(tokenId)
    for (let i = 0; i<7; i++){
      if (javs[i]!==0){
        NFT_Content.push(javs[i])
        Content_Name.push(totalName[i])
      }
    }
    console.log(NFT_Content)
    setJavName(Content_Name)
    setGenes(NFT_Content)
  }
  // getGenes()
  useEffect(()=>{
    getGenes()
    return ()=>{
    }
  },[tokenId])

  return (
    <div>
    <button onClick={getGenes}>test</button>
      <Chart
      type='donut'
      width={400}
      height={400}
      series={genes}
      options={{
        labels:javName,
      }} />
  </div>
  )
}

export default GeneContent