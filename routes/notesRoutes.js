const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index')
const controller = require('../controller/index');
const getAllNote = controller.getAllNote;
const deleteNote = controller.deleteNote
const addNote = controller.addNote
const updateNote = controller.updateNote
const  authJwt = middleware.authJwt;
const invalidateToken = middleware.invalidateTokens

router.post('/users/addnotes/notes', authJwt, invalidateToken, addNote)
router.get('/users/getnotes/notes', authJwt, invalidateToken, getAllNote);
router.put('/users/updatenotes/:noteId', authJwt, invalidateToken, updateNote)
router.delete('/users/deletenotes/notes/:noteId', authJwt, invalidateToken, deleteNote),


module.exports = router;