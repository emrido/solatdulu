const googleStorage  = require('@google-cloud/storage')
const gcsHelpers = require('../helpers/google-cloud-storage')
const GOOGLE_CLOUD_PROJECT_ID = 'totemic-effort-237310' // Replace with your project ID

const storage = new googleStorage.Storage({
 projectId: GOOGLE_CLOUD_PROJECT_ID,
 keyFilename: 'keyfile.json',
})
exports.sendUploadToGCS = (req, res, next) => {
  console.log('masusdususu')
 if (!req.file) {
  return next();
 }
 const bucketName = "solatdulu"
 const bucket = storage.bucket(bucketName);
 const gcsFileName = `${Date.now()}-${req.file.originalname}`;
 const file = bucket.file(gcsFileName);
 const stream = file.createWriteStream({
  metadata: {
   contentType: req.file.mimetype,
  },
 });
 stream.on('error', (err) => {
  req.file.cloudStorageError = err;
  console.log(req.file.cloudStorageError)
  next(err);
 });
 stream.on('finish', () => {
  req.file.cloudStorageObject = gcsFileName;
  return file.makePublic()
   .then(() => {
    req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
    next();
   })
   .catch(err => {
     console.log(err.message)
   })
 });
 stream.end(req.file.buffer);
};