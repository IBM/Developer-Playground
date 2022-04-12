
AWS.config.update({
    region: Region
})

const s3 = new AWS.S3();
const kinesis = new AWS.Kinesis();

exports.handler = async (event) => {
   console.log(JSON.stringify(event));
   const bucketName = event.Records[0].s3.bucket.name;
   const keyName = event.Records[0].s3.object.key;
   const params = {
       Bucket: bucketName,
       Key: keyName
   }
   
   await s3.getObject(params).promise().then(async (data) => {
       const dataString = data.Body.toString();
       const payload = {
           data: dataString
       }
       
       await sendToKinesis(payload, keyName);
   }, error => {
       console.log(error);
   })
};

const sendToKinesis = async (payload, partitionKey) => {
    const params = {
        Data: JSON.stringify(payload),
        PartitionKey: partitionKey,
        StreamName: KinesisStreamsName
    }
    
    await kinesis.putRecord(params).promise().then(response => {
        console.log(response);
    }, error => {
        console.log(error);
    })
};