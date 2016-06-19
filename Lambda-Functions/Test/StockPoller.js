'use strict';

let http = require('http');

//The url we want is: 'http://finance.yahoo.com/webservice/v1/symbols/YHOO,AAPL/quote?format=json&view=detail'
var options = {
  host: 'finance.yahoo.com',
  path: '/webservice/v1/symbols/YHOO,AAPL/quote?format=json&view=detail'
};

exports.handler = (event, context, callback) => {
	const req = http.request(options, (response) => {
        let body = '';
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => {
            console.log('Successfully processed HTTP response');
            // If we know it's JSON, parse it
            console.log('Response:', body);
            if (response.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            callback(null, body);
        });
    });
    req.on('error', callback);
    //req.write(JSON.stringify(event.data));
    req.end();
};