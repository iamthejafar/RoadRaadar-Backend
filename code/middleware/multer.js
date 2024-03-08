const { S3Client } = require("@aws-sdk/client-s3")

const path = require("path");
const multer = require("multer")
const multerS3 = require("multer-s3")


const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const s3 = new S3Client({
    region : "ap-south-1",
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY,
        secretAccessKey : process.env.AWS_SECRET_KEY
    }
});


const uploadMultiple = (folderPath, fieldName, maxImage) => {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          // Generate a unique key for the file within the specified folder
          const uniqueKey = `${folderPath}/${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
          cb(null, uniqueKey);
        },
      }),
    }).fields([{name:fieldName, maxCount: maxImage}]); // The second parameter is the maximum number of files allowed
  };

  const uploadSingle = (folderPath, fieldName) => {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          // Generate a unique key for the file within the specified folder
          const uniqueKey = `${folderPathOnS3}/${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
          cb(null, uniqueKey);
        },
      }),
    }).single(fieldName); // The second parameter is the maximum number of files allowed
  };



async function deleteObject(key) {
    try {
        const params = {
            Bucket: process.env.Bucket,
            Key: key,
        };

        const deleteCommand = new DeleteObjectCommand(params);
        const response = await s3.send(deleteCommand);

        console.log(`Object deleted successfully.`, response);
        return response;
    } catch (error) {
        console.error(`Error deleting object.`, error);
        throw error;
    }
}

module.exports = { uploadMultiple, uploadSingle , deleteObject };