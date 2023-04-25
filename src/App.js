import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { getEpochTime } from "./epochConverter";
import { navbar1 } from "./components/navbar";
import { getAllDetails } from "./fetchTxnDetail";
import MyTable from "./table";
import { csvMaker } from "./csvMaker";
import ReasonsTable from "./reasonsTable";
import FirstDiv from "./r and d/FirstDiv";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("18:00");

  const [successfullTxnCount, setSuccessfullTxnCount] = useState([]);
  const [unSuccessfullTxnCount, setUnSuccessfullTxnCount] = useState([]);

  const [array, setArray] = useState([]);
  const [tableName, setTableName] = useState("");
  const [hidden, setHidden] = useState(false);   // hide or unhide successfull txn table
  const [hidden1, setHidden1] = useState(false);    // hide or unhide unsuccessfull txn table
  const [hidden2 , setHidden2] = useState(false) // hide or unhide reasons table

  const [stage, setStage] = useState("prod");

  const startEpoch = getEpochTime(startDate , startTime); // setting startEpohTime to epoch of start.
  const endEpoch = getEpochTime(endDate , endTime); // // setting endEpohTime to epoch of end.

  async function submitHandler() {
    // this funciton calls all the fetch and calculation funcitons
    // console.log("startEpoch = " , startEpoch);
    // console.log("startDate = " , startDate);
    // console.log("startTime = " , startTime);
    // console.log("EndEpoch = " , endEpoch);
    // console.log("endDate = " , endDate);
    // console.log("endTime = " , endTime);
    
    let arr = await getAllDetails(startEpoch, endEpoch, stage);
    setSuccessfullTxnCount(arr[0]);
    setUnSuccessfullTxnCount(arr[2]);
    setArray(arr);
  }

  function getSuccessfullTxns() {
    setTableName("Successfull Transactions");
    setHidden(true);
    setHidden1(false);
    setHidden2(false);
  }

  function getUnSuccessfullTxns() {
    setTableName("Unsuccessfull Transactions");
    setHidden1(true);
    setHidden(false);
    setHidden2(false);
  }
  function getReason() {
    setHidden1(false);
    setHidden(false);
    setHidden2(true);
    setTableName("Unsuccessfull Transaction's Reason")
  }

  function reset() {
    setHidden1(false);
    setHidden(false);
    setHidden2(false);
    setTableName("happy debugging");
  }

  function handleDownload() {
    if (hidden === true) {
      console.log("downloading succesfullTxnsTable.csv");
      csvMaker(array[1], "succesfull");
    } else if (hidden1 === true) {
      console.log("downloading unSuccesfullTxnsTable.csv");
      csvMaker(array[3], "unsuccesfull");
    }else if(hidden2 === true){
      console.log("downloading reasonsForUnSuccesfullTxnsTable.csv");
      csvMaker(array[4], "reasons");
    }
  }

  return (
    <div className="App">
      <div>{navbar1()}</div>

      <div className="inp">
        <span className="inp1">
          <span className="inp2">Start Date : </span>
          <input value={startDate} className="date mr-2" type="date" onChange={(e) => setStartDate(e.target.value)}  />
          <input value={startTime} type="time" className="time mr-2" onChange={(e) => setStartTime(e.target.value)} />
        </span>

        <span>
          <span className="inp2">End Date : </span>
          <input value={endDate} className="date mr-2" type="date" onChange={(e) => setEndDate(e.target.value)}/>
          <input value={endTime} className="time mr-2" type="time" onChange={(e) => setEndTime(e.target.value)}/>
        </span>

        <span>
          <button className="btn btn-dark m-5" onClick={submitHandler}>
            Submit , onCLick get txn data
          </button>
        </span>
        
        <span>
          <button className="btn btn-dark m-1" onClick={() => setStage("pre-prod")} >
            Pre-Prod
          </button>
        </span>

        <span>
          <button className="btn btn-dark m-1" onClick={() => setStage("prod")}>
            Prod
          </button>
        </span>

        <span>
          <h3>Set to {stage}</h3>
        </span>

      </div>
      {/* <div>
        <FirstDiv/>
      </div> */}

      <div style={{ display: "flex" }}>
        <div className="functions">
          <h3 className="inp3">Functions</h3>

          <div>
            <button className="btn btn-dark m-3">Succesfull Txn Count </button>
            <span>{successfullTxnCount}</span>
          </div>

          <div>
            <button className="btn btn-dark m-3">
              Unsuccesfull Txn Count{" "}
            </button>
            <span>{unSuccessfullTxnCount}</span>
          </div>

          <div>
            <button className="btn btn-dark m-3" onClick={getSuccessfullTxns}>
              Succesfull Txn Table
            </button>
          </div>

          <div>
            <button className="btn btn-dark m-3" onClick={getUnSuccessfullTxns}>
              Unsuccesfull Txn Table
            </button>
          </div>

          <div>
            <button className="btn btn-dark m-3" onClick={getReason}>
              reason for unsuccessfull
            </button>
          </div>

          <div>
            <button className="btn btn-dark m-3" onClick={reset}>
              Reset Table
            </button>
          </div>

          <div></div>
        </div>

        <div className="table">
          <h3 className="inp3">
            {tableName}
            <button className="btn btn-dark m-3 print" onClick={handleDownload}>
              Download
            </button>
          </h3>

          <div className="inp3">
            {hidden && MyTable(array[1])}
            {hidden1 && MyTable(array[3])}
            {hidden2 && ReasonsTable(array[4])}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
