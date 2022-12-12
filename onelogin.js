const express = require("express");
const axios = require("axios");

const app = express();

const client_id = "17e41d8fc0168d60b308466ee30bc3d07c26c91d2453778e284572e4b3d2ec48"
const client_secret = "759d6292316bfcc86c7cba0ddd3877e480cdba1f72b1b61bbdfca8b1efa93d50"

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
let aToken;
request(options, function(error, response, body){
  console.log(body);
  aToken = body.access_token;
  console.log("Access Token >> "+aToken);
})

app.get('/', (req, res) => {
    var config = {
        method: 'get',
        url: 'https://saaden-bits-2o.onelogin.com/api/2/apps',
        headers: { 
          'Authorization': 'bearer '+aToken 
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

app.listen("4000", () => console.log("Onelogin Server started"))