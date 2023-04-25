import { useState } from "react";
import { getEpochTime } from "../epochConverter";

function FirstDiv(){
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const [stage, setStage] = useState("pre-prod");

    function submitHandler(){
      let details = [];
      details.push(start);
      details.push(end)
      details.push(stage);

    }

    return (
        <div className="inp">
        <span className="inp1">
          <span className="inp2">Start Date : </span>
          <input
            value={start}
            placeholder="start date"
            type="date"
            onChange={(e) => setStart(e.target.value)}
            className="mr-2"
          />
        </span>

        <span>
          <span className="inp2">End Date : </span>
          <input
            value={end}
            placeholder="end date"
            type="date"
            onChange={(e) => setEnd(e.target.value)}
          />
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
    )
}

export default FirstDiv;
