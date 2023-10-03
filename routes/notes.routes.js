const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require('../middleware/index')
const controller = require('../controller/index');
const storage = controller.storage
const upload = multer({ storage })

router.post('/users/notes/creat-note', middleware.authJwt, middleware.invalidateTokens, upload.fields([{ name : 'image', maxCount: 1}, {name: "audio", maxCount: 1}]), controller.createNote);

router.get('/users/notes/list-notes', middleware.authJwt, middleware.invalidateTokens, controller.listNotes);

router.get('/users/notes/search', middleware.authJwt, middleware.invalidateTokens, controller.noteSearch)

router.get('/users/notes/readnote/:noteId', middleware.authJwt, middleware.invalidateTokens, controller.readNote)

router.put('/users/notes/updatenotes/:noteId', middleware.authJwt, middleware.invalidateTokens, controller.updateNote);

router.delete('/users/notes/deletenotes/:noteId', middleware.authJwt, middleware.invalidateTokens, controller.deleteNote);


module.exports = router;