import React, { useState } from "react";
import { Checkbox } from "antd";

const FirstDataCheckboxGroup = Checkbox.Group;

function FirstDataCheckbox({ options }) {
  const [checkList, setCheckList] = useState([]);

  return (
    <div>
      <div>選擇要展示的欄位</div>
      <FirstDataCheckboxGroup
        options={options}
        onChange={checkedValues => {
          setCheckList(checkedValues);
        }}
      />
    </div>
  );
}

export default FirstDataCheckbox;
