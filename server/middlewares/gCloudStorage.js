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
  next();
  return
 } 
 const bucketName = "solatdulu"
 const bucket = storage.bucket(bucketName);
 console.log(req.file, '------ req.file')
 const gcsFileName = `${Date.now()}-${req.file.originalName}`;
 const file = bucket.file(gcsFileName);

file.save(req.file.buffer, {
  metadata: {
    contentType: req.file.mimetype
  }
})
.then(data => {
  console.log('pusiing')
  console.log(data)
  req.file.cloudStorageObject = gcsFileName;
  return file.makePublic()
})
.then(() => {
  console.log('malu aku malu pada semut merah')
  req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
  next();
 })
.catch(err => {
  console.log('lalalayeyeye')
  console.log(err)
})


//  const stream = file.createWriteStream({
//   metadata: {
//    contentType: req.file.mimetype,
//   },
//  });
//  stream.on('error', (err) => {
//   req.file.cloudStorageError = err;
//   console.log(req.file.cloudStorageError)
//   next();
//  });
//  stream.on('finish', () => {
//    console.log(req.file.cloudStorageObject,"========================")
//   req.file.cloudStorageObject = gcsFileName;
//   return file.makePublic()
//    .then(() => {
//     req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
//     next();
//    })
//    .catch(err => {
//      console.log(err.message)
//    })
//  });
//  stream.end(req.file.buffer);
};