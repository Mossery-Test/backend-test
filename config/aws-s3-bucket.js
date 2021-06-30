const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET,
});

module.exports = {
  uploadItems: (params) => {
    s3.upload(params, async (err, data) => {
      try {
        if (err) throw err;
        if (data) {
          console.log(`File uploaded successfully at ${data.Location}`);
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  deleteItems: (params) => {
    s3.deleteObject(params, async (err, data) => {
      if (err) throw err;
      if (data) {
        console.log(`File deleted successfully`);
      }
    });
  },
};
