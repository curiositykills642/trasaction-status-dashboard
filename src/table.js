import * as React from "react";
import { Dropdown, Table } from "react-bootstrap";
import "./table.css";


function MyTable(data) { // width = 100
  return (
    <table style={{ width: "350%", tableLayout: "fixed" }} > 
      <colgroup>
        <col style={{ width: "35%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "40%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "35%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "60%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Address</th>
          <th>Exchange Rate</th>
          <th>Network</th>
          <th>Fiat Amount</th>
          <th>Fiat Symbol</th>
          <th>User ID</th>
          <th>Crypto Amount</th>
          <th>Crypto Symbol</th>
          <th>Transaction Type</th>
          <th>Transaction Hash</th>
          <th>Failure Code</th>
          <th>Bank Transaction Id</th>
          <th>Failure Desc</th>
          <th>Source Id</th>
          <th>Account No.</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((item, index) => (
            <tr key={index} className="td">
              <td className="col">{item.txId}</td>
              <td className="col">{item.status}</td>
              <td className="col">{item.createdAt}</td>
              <td className="col">{item.address}</td>
              <td className="col">{item.exchange_rate}</td>
              <td className="col">{item.network}</td>
              <td className="col">{item.fiat_amount}</td>
              <td className="col">{item.fiat_symbol}</td>
              <td className="col">{item.userId}</td>
              <td className="col">{item.crypto_amount}</td>
              <td className="col">{item.crypto_symbol}</td>
              <td className="col">{item.transaction_type}</td>
              <td className="col">{item.txn_hash}</td>
              <td className="col">{item.failure_code}</td>
              <td className="col">{item.bank_transaction_id}</td>
              <td className="col">{item.failure_desc}</td>
              <td className="col">{item.source_id}</td>
              <td className="col">{item.account_no}</td>
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

export default MyTable;
