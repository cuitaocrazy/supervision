import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
   
      <DatePicker className="p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

export default DatePick