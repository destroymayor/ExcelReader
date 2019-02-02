import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import readXlsxFile from "read-excel-file";
import { Table } from "antd";

const columns = [
  {
    title: "相似度",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Question",
    dataIndex: "question",
    key: "question"
  },
  {
    title: "Answer",
    dataIndex: "answer",
    key: "answer"
  }
];

function App() {
  const [data, setData] = useState();
  const [columnNum, setColumnNum] = useState(0);

  function readExcel() {
    const list = [];
    readXlsxFile(document.getElementById("input").files[0]).then(rows => {
      setColumnNum(rows[0].length);

      return rows.forEach(item => {
        list.push({
          name: item[0],
          question: item[2],
          answer: item[4]
        });
        setData(list);
      });
    });
  }

  useEffect(() => {
    document.getElementById("input").addEventListener("change", readExcel);
    return () => document.getElementById("input").removeEventListener("change", readExcel);
  }, []);

  return (
    <div>
      <input type="file" id="input" accept=".xlsx" />
      <div>欄位：{columnNum}</div>
      <Table rowKey={(key, index) => index} dataSource={data} columns={columns} />
    </div>
  );
}

export default App;
