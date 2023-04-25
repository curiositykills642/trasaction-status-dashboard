
export async function fetchDynamoDb(stage) {
  let txnTable;

  // if stage = pre-prod use that api otherwise use prof api.

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let link = stage === "pre-prod" ? "https://x5uz0eflbd.execute-api.ap-south-1.amazonaws.com/QA-Stage/qadashboard" : "http://localhost:4000/prod_api" ;

  console.log("link : " , link);
  // await fetch(link, requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     txnTable = data;
  //     // console.log("txnTable length" ,txnTable.length)
  //   })
  //   .catch((error) => console.log("error", error));

  // return txnTable;

  const response = await fetch(link, requestOptions);
  const jsonData = await response.json();
  // console.log(jsonData.body);
  // console.log("//////555555---"); 
  
  // console.log("//////22222: " + JSON.stringify(response));

  return jsonData.body;
}


// api : https://x5uz0eflbd.execute-api.ap-south-1.amazonaws.com/QA-Stage/qadashboard


/*
return {
      statusCode: 200,
      headers,
      body: JSON.stringify(items),
    };
    */