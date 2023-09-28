const authController = require('./auth.controller');
const noteController = require('./note.controller');

module.exports = {
    signup: authController.signup,
    main: authController.main,
    login: authController.login,
    logout: authController.logout,
    refreshAndVerifyToken: authController.refreshAndVerifyToken,
    getAllNote: noteController.getAllNotes,
    addNote: noteController.addNote,
    deleteNote : noteController.deleteNote,
    updateNote : noteController.updateNote

}