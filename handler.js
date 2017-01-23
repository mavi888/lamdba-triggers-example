'use strict';

const snsPublisher = require('./snsPublisher');

module.exports.apiGatewayTriggered = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'API Gateway Triggered executed successfully',
      input: event,
    }),
  };
  callback(null, response);
};

module.exports.s3UploadTriggered = (event, context, callback) => {
  var bucket = event.Records[0].s3.bucket.name;
  var fileName = event.Records[0].s3.object.key;
  callback(null, { message: 'A new file named: ' + fileName + ' was uploaded to the bucket ' + bucket, event });
};

module.exports.dynamoDBStreamTriggered = (event, context, callback) => {
  var key = event.Records[0].dynamodb.Keys.id;
  callback(null, { message: 'Dynamodb item was modified with key: '+ key + '!', event });
};

module.exports.snsLambdaPublisher = (event, context, callback) => {
  snsPublisher.snsPublisher();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SNS Publisher executed successfully',
      input: event,
    }),
  };
  callback(null, response);
};

module.exports.snsLamdbaTriggered = (event, context, callback) => {
  var topic = event.Records[0].Sns.TopicArn;
  var message = event.Records[0].Sns.Message;
  console.log(topic + '  ' + message);
  callback(null, { message: 'SNS lamdba was triggered from the topic ' + topic + ' with message ' + message , event });
};
