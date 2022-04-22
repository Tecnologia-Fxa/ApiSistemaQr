//snsClient
const  { SNSClient } = require("@aws-sdk/client-sns");
const REGION = "us-east-1"; 
const snsClient = new SNSClient({ region: REGION })
module.exports = {
    snsClient
}