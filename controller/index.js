const authController = require('./auth/auth.controller')
const noteController = require('./note/note.controller')

module.exports = {
  signup: authController.signup,
  main: authController.main,
  login: authController.login,
  logout: authController.logout,
  refreshAndVerifyToken: authController.refreshAndVerifyToken,
  forgotPassword: authController.forgotPassword,
  resetPassword: authController.resetPassword,
  listNotes: noteController.listNotes,
  createNote: noteController.createNote,
  deleteNote: noteController.deleteNote,
  updateNote: noteController.updateNote,
  noteSearch: noteController.NoteSearch,
  readNote: noteController.readNote,
  trash: noteController.trash,
  deleteFromTrash: noteController.deleteFromTrash,
  restoreTrash: noteController.restoreTrash,
  emptyTrash: noteController.emptyTrash,
  storage: noteController.storage
}
