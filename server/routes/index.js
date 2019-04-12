  const router = require('express').Router()
  const gcsMiddlewares = require('../middlewares/gCloudStorage')
  const saveToLocal = require('../middlewares/saveToLocal')
  
  const Multer = require('multer');
  const axios = require('axios');
  
  const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });


  router.post(
    '/upload',saveToLocal,
    // multer.single('image'),
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
      console.log(req.file)
      if (req.file && req.file.gcsUrl) {
        return res.send(req.file.gcsUrl);
      }
      return res.status(500).send('Unable to upload');
    },
  );

  router.post('/jadwal', (req, res) => {
      // console.log(req.body)
      axios
          .get(`https://muslimsalat.com/${req.body.city}.json?key=ac470c5c643ca3d98105e6ff8acc1df3`)
          .then((data) => {
              console.log(data.data)
              res.status(200).json({
                  kota: data.data.state,
                  jadwal: data.data.items
              })
          })
          .catch(err => {
              res.status(500).json({
                  message: err.message
              })
          })
  })

  module.exports = router