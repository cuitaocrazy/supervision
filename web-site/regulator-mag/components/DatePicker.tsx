import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePick = () => {
  //const [startDate, setStartDate] = useState(new Date());
   const [dateRange, setDateRange] = useState([null, null]);
   const [startDate, endDate] = dateRange;
  return (
      <DatePicker
      className="p-2 rounded-md "
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      dateFormat="yy-MM-dd"
      placeholderText="请选择交易日期区间"
    />
  );
};

export default DatePick