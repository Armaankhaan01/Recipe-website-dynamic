require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;
const SessionToken = process.env.AWS_SESSION_TOKEN;

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  sessionToken: SessionToken,
});

// upload a file to s3

function uploadFile(file) {
  const filestream = fs.readFileSync(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: filestream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

function downloadFile(filename) {
  const downloadParams = {
    Bucket: bucketName,
    Key: filename
  };

  return s3.getObject(downloadParams, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      // Process the retrieved data
      const objectData = data.Body.toString();
      // Display the data on your web app or perform any desired actions
      console.log(objectData);
    }
  }).createReadStream();
}

function checkObject(filename){
    const params = {
        Bucket: bucketName,
        Key: filename
      };
      
      s3.headObject(params, function(err, data) {
        if (err && err.code === 'NotFound') {
          console.log('Object not found');
        } else if (err) {
          console.log('Error retrieving object:', err);
        } else {
          console.log('Object exists');
        }
      });
}
exports.uploadFile = uploadFile;
exports.downloadFile = downloadFile;
exports.checkObject = checkObject;
