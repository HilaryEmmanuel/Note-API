const authController = require('./auth.controller');
const noteController = require('./note.controller');

module.exports = {
    signup: authController.signup,
    main: authController.main,
    login: authController.login,
    logout: authController.logout,
    refreshAndVerifyToken: authController.refreshAndVerifyToken,
    forgotPassword : authController.forgotPassword,
    resetPassword : authController.resetPassword,
    getAllNote: noteController.getAllNotes,
    addNote: noteController.addNote,
    deleteNote : noteController.deleteNote,
    updateNote : noteController.updateNote,
    noteSearch : noteController.NoteSearch,
    storage : noteController.storage

}