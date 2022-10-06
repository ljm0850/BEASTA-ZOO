import Chart from "react-apexcharts";
import { saleRecord } from "../../api/solidity";
import { useState, useEffect } from "react";
import _ from "lodash";
import styles from "./SaleRecord.module.scss";
interface Props {
  tokenId: number | 0;
}

// let flag = false
const SaleRecord = ({ tokenId }: Props) => {
  const [records, setRecords] = useState<number[]>([]);
  const [recordsIdx, setRecordsIdx] = useState([""]);
  const getSaleRecord = async () => {
    let value = await saleRecord(tokenId);
    if (value.length > 3) {
      value = value.slice(value.length - 3);
    }
    let tempIdx = [""];
    for (let i = 1; i < value.length + 1; i++) {
      tempIdx.push("");
    }
    await setRecords(value);
    await setRecordsIdx(tempIdx);
  };

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: recordsIdx,
    },
  };
  const series = [
    {
      name: "price",
      data: records,
    },
  ];

  useEffect(() => {
    getSaleRecord();
    return () => {};
  }, [tokenId]);

  return (
    <div>
      <div className={styles.SaleTitle}>
        <div>판매기록(단위 : 1000 JAV)</div>
      </div>
      <div>
        {/* {records.length === 0 ? (
          <div>판매 기록이 없습니다.</div>
        ) : ( */}
        <Chart type="line" width={250} series={series} options={options} />
        {/* )} */}
      </div>
    </div>
  );
};

export default SaleRecord;
