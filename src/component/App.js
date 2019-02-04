import React, { useState, useEffect } from "react";

import "./App.css";
import { Table } from "antd";
import readXlsxFile from "read-excel-file";

function App() {
  const [dataSource, setDataSource] = useState();
  const [columnNum, setColumnNum] = useState(0);
  const [columnTableConfig, setColumnTableConfig] = useState();

  function readExcel() {
    readXlsxFile(document.getElementById("input").files[0]).then(rows => {
      const tableColumnConfig = [];
      for (let x = 0; x < rows[0].length; x++) {
        tableColumnConfig[x] = { title: x, dataIndex: x, key: x };
      }

      setColumnTableConfig(tableColumnConfig);
      setColumnNum(rows[0].length);

      const excelList = [];
      rows.forEach((item, index) => {
        excelList.push({
          0: item[0],
          2: item[2],
          4: item[4]
        });
        setDataSource(excelList);
      });
    });
  }

  useEffect(() => {
    document.getElementById("input").addEventListener("change", readExcel);
    return () => document.getElementById("input").removeEventListener("change", readExcel);
  }, []);

  return (
    <div className="App">
      <input type="file" id="input" accept=".xlsx" />
      <div>欄位數：{columnNum}</div>
      <Table dataSource={dataSource} columns={columnTableConfig} rowKey={(key, index) => index} />
    </div>
  );
}

export default App;
