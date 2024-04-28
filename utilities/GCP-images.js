const { Storage } = require("@google-cloud/storage");
const { makeError } = require("./errors");
const { BAD_REQUEST } = require("./server-statuses");

const storage = new Storage({
  keyFilename: "database/pointnul-7b1daa175a2e.json",
  projectId: process.env.GCP_PROJECT_ID,
});

const uploadImageToGCP = async (files) => {
  const bucketName = process.env.GCP_BUCKET_NAME;

  if (!files || files.length === 0) {
    throw makeError("No files uploaded", BAD_REQUEST);
  }

  const uploadPromises = files.map(async (file) => {
    const fileName = `${Date.now()}-${file.originalname}`;

    const fileOptions = {
      metadata: {
        contentType: file.mimetype,
      },
    };

    const fileStream = storage
      .bucket(bucketName)
      .file(fileName)
      .createWriteStream(fileOptions);

    return new Promise((resolve, reject) => {
      fileStream.on("error", (error) => {
        reject(error);
      });

      fileStream.on("finish", () => {
        resolve(fileName);
      });

      fileStream.end(file.buffer);
    });
  });

  const uploadedFiles = await Promise.all(uploadPromises);

  return uploadedFiles;
};

const deleteImageFromGCP = (fileName) =>
  storage.bucket(process.env.GCP_BUCKET_NAME).file(fileName).delete();

module.exports = { uploadImageToGCP, deleteImageFromGCP };
