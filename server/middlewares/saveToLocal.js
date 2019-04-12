module.exports = function (req, res, next) {
    const fs = require('fs')
    console.log('masuk sacetolocal')
    let image = req.body.image
    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    console.log(base64Data,"aaaaaa")
    const newFilename = Date.now() + '.png'
    // const newFile = 'uploads/' + newFilename;
    // req.file = newFile
    // console.log(newFile,"in==========================")

    
    // req.file = {}
    // req.file.buffer = fs.readFileSync('uploads/tes.png')
    // req.file.originalName = Date.now() + 'tes.png'
    // req.file.mimetype = 'image/png'
    // next()

    fs.writeFile(newFilename, base64Data, 'base64', function (err) {
        if (err) {
            console.log('masuk error 1')
            console.log(err);
            res.status(500).json({
                msg: 'Internal server Error',
            });
        } else {
            // res.status(200).json({
            //     msg: 'Uploaded'
            // });
            // req.file = fs.readFileSync(newFile)
            // console.log('savetolocal', req.file)
            req.file = {}
            req.file.buffer = fs.readFileSync(newFilename)
            req.file.originalName = Date.now() + newFilename
            req.file.mimetype = 'image/png'
            next()
        }
    });
}