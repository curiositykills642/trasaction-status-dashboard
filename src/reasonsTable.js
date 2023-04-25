import * as React from "react";
import "./table.css";

function ReasonsTable(data) { // width = 100
  return (
    <table style={{ width: "150%", tableLayout: "fixed" }} > 
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "40%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>States Entered</th>
          <th>States Not Entered</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((item, index) => (
            <tr key={index} className="td">
              <td className="col">{item.txid}</td>
              <td className="col">{item.statesEntered}</td>
              <td className="col">{item.statesNotEntered}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="13">No data found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ReasonsTable;
  