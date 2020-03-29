'use strict';
const proxyURL = ""
const request = require('request');

/**
 * Use this command to launch the handler from console:
 *
 * node_modules/.bin/serverless invoke local -f lambda -d '{"httpMethod":"GET","queryStringParameters":{"url":"http://github.com"}}'
 *
 *  or from browser
 *
 * http://localhost:3000/?url=https://github.com
 */
module.exports.corsProxy = (event, context, callback) => {
    let params = event.queryStringParameters;

    console.log(event);
    console.log(`Got request with params:`, params);

    return new Promise((resolve, reject) => {
        let originalRequestBody = event.body;
        request({
            url: proxyURL,
            method: event.httpMethod,
            timeout: 20000,
            json: event.httpMethod === 'POST' ? JSON.parse(originalRequestBody) : null,
        }, (err, originalResponse, body) => {
            if (err) {
                console.log(`Got error`, err);

                callback(err);

                reject(err);

                return;
            }

            console.log(`Got response from ${proxyURL} ---> {statusCode: ${originalResponse.statusCode}}`);
            const proxyBody = originalRequestBody ? JSON.stringify(body) : originalResponse.body;

            const proxyResponse = {
                statusCode: originalResponse.statusCode,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
                    "content-type": originalResponse.headers['content-type']
                },
                body: proxyBody
            };

            callback(null, proxyResponse);

            resolve(proxyResponse);
        });
    });
};
