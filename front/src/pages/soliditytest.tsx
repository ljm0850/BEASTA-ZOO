import {
    getJavToken,pickup,fusion,javsData,createSale,purchaseNFT,
    cancelSaleNFT,saleRecord,approveSale,isApprove, myJavToken,
} from "../api/solidity"
import { useEffect, useState } from "react";




const Test = () => {
    const [ money, setMoney ] = useState()
    const showMeTheMoney = async() =>{
        await getJavToken()
        const myMoney = await myJavToken()
        await setMoney(myMoney)
    }

    const fusionTest = async() => {
        const value = await fusion(2,3)
        console.log(value)
    }
    
    const saleTest = async() => {
        const value = await createSale(4,100)
        console.log(value)
    }

    const purchaseTest = async() => {
        const value = await purchaseNFT("0xb2F2b40e22A95d6dC917531079FaaDc7294298Bb")
        console.log(value)
    }

    return (
        <div>
            <button onClick={approveSale}>사전 작업</button>

            <div>
                <div>잔액 : { money }</div>            
                <button onClick={ showMeTheMoney }>자브토큰 발행</button>
            </div>
            <br></br>
            <div>
                <button onClick={ pickup }>뽑기</button>
            </div>
            <br></br>
            <div>
                <button onClick={ fusionTest }>조합</button>
            </div>
            <br></br>
            <div>
                <button onClick={ saleTest }>판매</button>
            </div>
            <br></br>
            <div>
                <button onClick={ purchaseTest }>구매</button>
            </div>
        </div>
    )
}
export default Test