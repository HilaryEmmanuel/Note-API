const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require('../middleware/index')
const controller = require('../controller/index');
const storage = controller.storage
const upload = multer({ storage })

router.post('/users/addnotes/notes', middleware.authJwt, middleware.invalidateTokens, upload.fields([{ name : 'image', maxCount: 1}, {name: "audio", maxCount: 1}]), controller.addNote);

router.get('/users/getnotes/notes', middleware.authJwt, middleware.invalidateTokens, controller.getAllNote);

router.get('/users/notes/search', middleware.authJwt, middleware.invalidateTokens, controller.noteSearch)

router.put('/users/updatenotes/:noteId', middleware.authJwt, middleware.invalidateTokens, controller.updateNote);

router.delete('/users/deletenotes/notes/:noteId', middleware.authJwt, middleware.invalidateTokens, controller.deleteNote);


module.exports = router;