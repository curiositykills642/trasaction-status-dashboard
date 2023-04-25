import data1 from "./data";
import { fetchDynamoDb } from "./fetchDynamoDb";

export async function FetchTransactionDetail(startEpoch, endEpoch, stage) {

  let txnTable = await fetchDynamoDb(stage);

  let txns = {};

  let statusOrienter = {
    CRYPTO_INIT: 0,
    CRYPTO_COMPLETED: 1,
    FIAT_INIT: 2,
    FIAT_COMPLETED: 3,
  };

  let cnt = 0;  // number of transactions

  let base_array = [0, 0, 0, 0, 0 , 0]; // [ CRYPTO_INIT , CRYPTO_COMPLETED , FIAT_INIT , FIAT_COMPLETED , wrong state , right state but duplicate ]

  for (let i = 0; i < txnTable.length; i++) {

    let object = txnTable[i];

    // console.log(object);
    
    let currTxnEpoch = object.createdAt;

    if (currTxnEpoch >= startEpoch && currTxnEpoch <= endEpoch) {

      let txid = object.txId; // txid of that tha txn
      let stat = object.status; // txn status of that txn in curr obj
      let stat_pos; // stat_pos = the position og txns status in base array. exp crypto_init = 0

      if (!txns.hasOwnProperty(txid))   // if txid does not exist
        txns[txid] = base_array.slice();
      

      if (!statusOrienter.hasOwnProperty(stat)) 
        txns[txid][4] = 1;

      if ( statusOrienter.hasOwnProperty(stat) ) {
        stat_pos = statusOrienter[stat];     // checking th epositio of that status in status orienter
        if (txns[txid][stat_pos] !== 1) {
          txns[txid][stat_pos] = 1;
        } else {
          txns[txid][5] = 1;
        }
      }

      txns[txid].push(object);
      cnt++;
    }
  }

  // console.log("txns " , txns)
  // console.log(" cnt " , cnt);
  // console.log("txnTable " , txnTable);
  // console.log("startEpoch" , startEpoch);
  // console.log("endEpoch" , endEpoch)
  // console.log("stage" , stage);

  return txns;
}



/*

what we want is to make 

[ 0 , 0 , 0 , 0 , 0 , 0 ]

so first we make sure every txid exist

then we check if that state is in given four or not

if it is not we assign the the 5th 0 as 1 

if it is in given 4 we assign whatever pos as 1 but if it is already 1 we assign 6th one as one

*/