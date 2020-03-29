# CORS proxy

Simple AWS Lambda based proxy server for making CORS requests from browser to any HTTP server.  The code was originally an open proxy but was modified to proxy to a specific destination. 

### Run locally

#### 1. Install
```
npm install
```
#### 2 Modify URL
In handler.js change the URL to point to your server

#### 3. Run
```
node_modules/.bin/serverless offline
```
#### 4. Use
Open your browser and go to `http://localhost:3000`. For example:
```
http://localhost:3000/?url=https://github.com/
```
### Run on AWS

#### 0. Requirements
You need AWS account first.
Also you need your IAM to have access for serverless deployment.  This resource can be useful if you are new to serverless:

https://serverless.com/blog/abcs-of-iam-permissions/

#### 1. Install
```
npm install
```
#### 2. Deploy
```
node_modules/.bin/serverless config credentials --provider aws --key <aws_key> --secret <aws_secret>
node_modules/.bin/serverless deploy --region <aws_region>
```
You will see such console response:
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (16.08 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: cors-proxy
stage: dev
region: eu-central-1
stack: cors-proxy-dev
api keys:
  None
endpoints:
  GET - https://blablabla.execute-api.eu-central-1.amazonaws.com/dev/
functions:
  lambda: cors-proxy-dev-lambda
```
#### 3. Use
Open your browser and use `endpoint` field from previous console response as base address. For example:
```
https://blablabla.execute-api.eu-central-1.amazonaws.com/dev/
```
