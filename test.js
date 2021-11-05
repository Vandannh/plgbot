const axios = require('axios');

let ap = "KLAX";
let f;
const options = {
    headers: {
        'Authorization': 'ZOU1hW49udPsua96Vw7NJUCUCbRe1cFMtcTrHJtPFnM',
    },
    //url: `avwx.rest/api/metar/${ap}`,
    method: 'GET'
};

axios.get(`https://avwx.rest/api/metar/${ap}`, options)
    .then(function (response) {
        //f = JSON.parse(response).sanitized;
        console.log(response.data.sanitized);
    })
    .catch(function(err) {
        console.error(err);
    });