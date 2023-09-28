const model = require('../model/index');
const notes = model.note;


const addNote = async (req, res, next) => {
    const userID = req.user_id;
    const { title, note, image, audio_note } = req.body;

    try {
        await notes.create({
            title: title,
            note: note,
            image: image,
            audio_note: audio_note,
            created_at: new Date(),
            user_id: userID
        })

        return res.status(201).json({
            success: true,
            message: "note created succesfully"
        })

    } catch (err) {
        console.error("Error creating Note ", err)
        return (res.status(500).json({
            success: false,
            message: "Internal Server Error"
        }), next(err))
    }

}


const getAllNotes = async (req, res, next) => {
    const userID = req.user_id;
    try {
        const Notes = await notes.findAll({ where: { user_id: userID } });
        if (!Notes) {
            return res.status(404).json({
                success: false,
                message: "you do not have any note"
            })
        }

        return res.status(200).json({
            success: true,
            message: "notes succesfully retrieved",
            notes: Notes
        })



    } catch (err) {
        console.error("Error fetching Note ", err)
        return (res.status(500).json({
            success: false,
            message: "Internal Server Error"
        }), next(err))
    }
}



const updateNote = async (req, res, next) => {
    const userID = req.user_id;
    const noteId = parseInt(req.params.noteId);
    const { title, note, image, } = req.body;
    try {
        if (!noteId) {
            return res.status(404).json({
                success: false,
                message: "make sure you supply an id"
            })
        }

        const Notes = await notes.update({ title: title, note: note, image: image }, { where: { note_id: noteId, user_id: userID } });
        const updatedNotes = await notes.findAll({ where: { user_id: userID } });
        if (!Notes) {
            return res.status(400).json({
                success: false,
                message: "note was not updated"
            })
        }

        return res.status(200).json({
            success: true,
            message: "note succesfully updated",
            notes: updatedNotes
        })
    } catch (err) {
        console.error("Error updating Note ", err)
        return (res.status(500).json({
            success: false,
            message: "Internal Server Error"
        }), next(err))

    }

}



const deleteNote = async (req, res, next) => {
    const userID = req.user_id;
    const noteId = parseInt(req.params.noteId);
    try {
        if (!noteId) {
            return res.status(404).json({
                success: false,
                message: "make sure you supply an id"
            })
        }

        const Notes = notes.destroy({ where: { note_id: noteId, user_id: userID } })
        if (!Notes) {
            res.status(404).json({
                success: false,
                message: "no note found"
            })
        }

        const resultAfterDeletetion = await notes.findAll({ where: { user_id: userID } });
        if (!resultAfterDeletetion) {
            res.status(404).json({
                success: false,
                message: "no note available"
            })

        }
        return res.status(200).json({
            success: true,
            message: "note succesfuly deleted",
            notes: resultAfterDeletetion
        })
    } catch (err) {
        console.error(err);
        return(res.status(500).json({
            success: false,
            message: "Internal Server Error"
        }),next(err)) 
    }

}



module.exports = {
    addNote,
    getAllNotes,
    deleteNote,
    updateNote
}