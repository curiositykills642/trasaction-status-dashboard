import React, { useEffect, useState } from "react";
import { FetchTransactionDetail } from "./fetchTransactionDetail";


function accountStates( fl0 , fl1 , fl2 , fl3 , fl5){    

    let statesNotEntered = " ";
    if(!fl0){
        statesNotEntered = statesNotEntered + "CRYPTO_INIT , ";
    }
    if(!fl1){
        statesNotEntered = statesNotEntered + ("CRYPTO_COMPLETED , ");
    }
    if(!fl2){
        statesNotEntered = statesNotEntered + ("FIAT_INIT , ");
    }
    if(!fl3){
        statesNotEntered = statesNotEntered + ("FIAT_COMPLETED , ");
    }
    if(fl5){
        statesNotEntered = statesNotEntered + ("Duplicate Right States , ");
    }

    return statesNotEntered.substring(0 , statesNotEntered.length-3); // -3 to remove " , " in the last returning "CRYPTO_INIT , CRYPTO_COMPLETED"

}

function statesEntered_toString(data){
    let statesEntered = " ";

    for (let key in data ){
        statesEntered = statesEntered + key;
        statesEntered = statesEntered + " : ";
        statesEntered = statesEntered + data[key];
        statesEntered = statesEntered + " , ";
    }
    
    return statesEntered.substring(0 , statesEntered.length-3);
}

export async function getAllDetails(startEpoch , endEpoch , stage){

    let txnDetail = await FetchTransactionDetail( startEpoch , endEpoch , stage);

    let successfullTxnTable = [];
    let unSuccessfullTxnTable = [];
    let unSuccessfullTxnCount = 0;
    let successfullTxnCount = 0;
    let reasons = []; // this is the array of unsuccessfull txn { txid and reason for failure and states}.    

    for (let txid in txnDetail ) {

        let flag = txnDetail[txid][0] + txnDetail[txid][1] + txnDetail[txid][2] + txnDetail[txid][3] ; // to check if it went through all 4 states or not

        if( (flag === 4 && txnDetail[txid][4] === 0 &&  txnDetail[txid][4] === 0) || txnDetail[txid][3] === 1){

            successfullTxnCount++;
            for(let i = 6 ; i < txnDetail[txid].length ; i++){
                successfullTxnTable.push(txnDetail[txid][i]);
            }
        }else{

            unSuccessfullTxnCount++;

            let unSuccesfullTxn = {};      // this would be pushed to reasons . 
            let statesEntered = {};  // a dictionary to recd states entered and how many times by a unsuccessfull txid.

            unSuccesfullTxn["txid"] = txid;
            unSuccesfullTxn["statesNotEntered"] = accountStates(txnDetail[txid][0] , txnDetail[txid][1] , txnDetail[txid][2] , txnDetail[txid][3] , txnDetail[txid][5]); // pushing states not entered

            for(let i = 6; i < txnDetail[txid].length ; i++){
                unSuccessfullTxnTable.push(txnDetail[txid][i]);

                let txnStatus = txnDetail[txid][i].status;

                if( !statesEntered.hasOwnProperty(txnStatus) ){
                    statesEntered[txnStatus] = 1;
                }else{
                    statesEntered[txnStatus] = statesEntered[txnStatus] + 1;
                }
            }

            unSuccesfullTxn["statesEntered"] = statesEntered_toString(statesEntered) ; 

            reasons.push(unSuccesfullTxn);
        }
    }
    let array = [];
    array.push(successfullTxnCount);
    array.push(successfullTxnTable);
    array.push(unSuccessfullTxnCount);
    array.push(unSuccessfullTxnTable);
    array.push(reasons);

    // console.log("txn detail " , txnDetail);
    // console.log("reasons " , reasons);
    // console.log("unSuccessfull Txn Table " , unSuccessfullTxnTable)
    // console.log("successfull Txn Table" , successfullTxnTable)
    // console.log("unSuccessfull Txn Count " , unSuccessfullTxnCount);
    // console.log("successfull Txn Count" , successfullTxnCount);

    return array;
}




/*  this is code for getting data in first format.
    for (let txid in txnDetail ) {
        let flag = txnDetail[txid][0] + txnDetail[txid][1] + txnDetail[txid][2] + txnDetail[txid][3] ;
        let arr = [];
        arr.push(txid);
        if( flag === 4 && txnDetail[txid][4] === 0 ){
            for(let i = 5; i < txnDetail[txid].length ; i++){
                arr.push(txnDetail[txid][i]);
            }
            successfullTxnTable.push(arr);
        }else{
            for(let i = 5; i < txnDetail[txid].length ; i++){
                arr.push(txnDetail[txid][i]);
            }
            unSuccessfullTxnTable.push(arr);
        }
    }
*/


/*

    reasons = [ unSuccesfullTxn1 , unSuccesfullTxn2 , unSuccesfullTxn3, unSuccesfullTxn4 , ....... ]

    unSuccesfullTxn = {
        txid : "txid",
        statesEntered : { "pending " : 10 ,  "init" : 1, ...... },
        statesNotEntered : [ state1 , state2 , .... ],
    }

    states = {
        "pending " : 10.
        "init" : 1,
        .
        .
        .
    }

*/