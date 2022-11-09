const fs = require("fs")

const express = require("express");
const axios = require("axios");
const { once } = require("events");

const app = express();

let accessToken;

async function getAccessToken(code) {
   let client_id="1000.4J9KAXGQTPKEAF04GNP07JEBCPDR5P";
   let client_secret="d1d5233f5cf7c7e1152f5bb3e9de8e165ea5f17cc7";
   let redirect_uri="http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect";
   let grant_type="authorization_code"

    // const res = await fetch(`https://accounts.zoho.com/oauth/v2/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=${grant_type}`)
    
    const res = await axios({
        url: `https://accounts.zoho.in/oauth/v2/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=${grant_type}`,
        method: "POST",
        // body: {
        //     code,
        //     client_id,
        //     client_secret,
        //     redirect_uri,
        //     grant_type
        //     }
    } )
    console.log(res.data);

    accessToken = res.data.access_token;

    // fs.writeFileSync('error.html', data, "utf-8");
}

app.get('/', (req, res) => {
    let indexHtml = fs.readFileSync("./index.html")
    res.setHeader("Content-Type", "text/html")
    res.send(indexHtml);
})

app.get('/auth/redirect', async (req, res) => {
    await getAccessToken( req.query.code)
    res.redirect('/data');
})

app.get('/data', (req, res) => {
    var config = {
        method: 'get',
        url: 'https://expense.zoho.in/api/v1/reports/expensedetails',
        headers: { 
          'Authorization': 'Zoho-oauthtoken '+accessToken, 
          'X-com-zoho-expense-organizationid': '60017656360', 
          'Cookie': 'BuildCookie_UserLevel_60017656360_60017056602=1; JSESSIONID=7BFC6F46323EC34C78812C648DF37205; _zcsr_tmp=c399c521-48e5-4a61-a122-3cc11a986c91; a18c55dce9=dd440d0857167461b48bf19155dafee1; zecscook=c399c521-48e5-4a61-a122-3cc11a986c91'
        }
      };
      
      axios(config)
      .then(function (response) {
        res.send(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
})






// =========================================================================================================

// One login API


// =========================================================================================================



const client_id = "17e41d8fc0168d60b308466ee30bc3d07c26c91d2453778e284572e4b3d2ec48"
const client_secret = "759d6292316bfcc86c7cba0ddd3877e480cdba1f72b1b61bbdfca8b1efa93d50"

// let oneConfig = {
//   method: 'post',
//   url: 'https://saaden-bits-2o.onelogin.com/auth/oauth2/v2/token',
//   headers: { 
//     'Authorization': new Buffer(`Basic ${client_id}:${client_secret}`).toString('base64'), 
//     "Content-Type":"application/json"
//   },
//   body: JSON.stringify({
//     grant_type: "client_credentials"
//  })
// };
// fetch(oneConfig.url,oneConfig).then(res => {
//   res.json().then(console.log)
// }).catch(err => {
//   console.log(err);
// })


const request = require("request")

let options = {
  method: 'POST',
  uri: 'https://saaden-bits-2o.onelogin.com/auth/oauth2/v2/token',
  auth: {
    user: client_id,
    pass: client_secret
  },
  json: {
    grant_type: 'client_credentials'
  }
}

request(options, function(error, response, body){
  console.log(body);
  let aToken = body.access_token;
  console.log("Access Token >> "+aToken);
})
      

app.listen("3000", () => console.log("Server started"))