import * as FileSaver from "file-saver";

export function csvMaker(array , type){
    let data = [];

    if(type === "reasons"){
        let arr = ["txid" , "statesEntered" , "statesNotEntered" ];
        data.push(arr);

        for(let i = 0 ; i < array.length; i++){

            let obj = array[i];
            let row = [];

            for(let j=0; j<arr.length; j++) {
                const property = arr[j];
                if( obj[property] !== undefined && obj[property] !== null ) {
                    row.push(obj[property]);
                } else {
                    row.push(" ");
                }
            }
            
            data.push(row);
        }
    }
    else{
        let arr = ["txId" , "status" , "createdAt" , "address" , "failure_code" , "bank_transaction_id" , "failure_desc" ,  "exchange_rate" , "fiat_amount" , "fiat_symbol" , "source_id" , "userId" , "account_no" , "crypto_amount" , "crypto_symbol" , "transaction_type" , "txn_hash" ];
        data.push(arr);
        for(let i = 0 ; i < array.length; i++){
            let obj = array[i];
            let row = [];

            for(let j=0; j<arr.length; j++) {
                const property = arr[j];
                if( obj[property] !== undefined && obj[property] !== null ) {
                    row.push(obj[property]);
                } else {
                    row.push(" ");
                }
            }
            
            data.push(row);
        }
    }

    let csvContent = data.map((e) => e.join(",")).join("\n"); // rows is the name of array.
    let file =  new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    if (type === "unsuccesfull")
        FileSaver.saveAs(file, "UnSuccessfullTransactions.csv"); // The file name can be changed here
    else if (type === "succesfull")
        FileSaver.saveAs(file, "SuccessfullTransactions.csv"); // The file name can be changed here
    else if (type === "reasons")
        FileSaver.saveAs(file, "reasons_for_UnSuccessfullTransactions.csv"); // The file name can be changed here
}