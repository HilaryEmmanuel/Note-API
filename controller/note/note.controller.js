const model = require('../../model/index');
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize');
const notes = model.note;
require('dotenv').config();
const config = require('../../config/index');
const storage = config.cloudinaryConfig;

const createNote = async (req, res, next) => {
    try {

        const userID = req.user_id;
        const { title, note } = req.body;
        const image = req.files['image'] ? req.files['image'][0] : null;
        const audio = req.files['audio'] ? req.files['audio'][0] : null;
        if (image && audio) {
            const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: "auto" });
            const audioUpload = await cloudinary.uploader.upload(audio.path, { resource_type: "auto" });
            const noteCreation = await notes.create({ title: title, note: note, image: imageUpload.secure_url, audio_note: audioUpload.secure_url, created_at: new Date(), user_id: userID })
            return res.status(201).json({ success: true, message: "note created succesfully", note: noteCreation })

        } else if (image) {
            const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: "auto" });
            const noteCreation = await notes.create({ title: title, note: note, image: imageUpload.secure_url, audio_note: null, created_at: new Date(), user_id: userID })
            return res.status(201).json({ success: true, message: "note created succesfully", note: noteCreation })

        } else if (audio) {
            const audioUpload = await cloudinary.uploader.upload(audio.path, { resource_type: "auto" });
            const noteCreation = await notes.create({ title: title, note: note, image: null, audio_note: audioUpload.secure_url, created_at: new Date(), user_id: userID })
            return res.status(201).json({ success: true, message: "note created succesfully", note: noteCreation })
        } else {
            const noteCreation = await notes.create({ title: title, note: note, image: null, audio_note: null, created_at: new Date(), user_id: userID })
            return res.status(201).json({ success: true, message: "note created succesfully", note: noteCreation })
        }
    } catch (err) {
        console.error("Error creating Note ", err)
        return (res.status(500).json({ success: false, message: "Internal Server Error" }), next(err))
    }
}


const listNotes = async (req, res, next) => {
    const userID = req.user_id;

    try {
        const Notes = await notes.findAll({ where: { user_id: userID } });
        if (Notes=='') { return res.status(404).json({ success: false, message: "you do not have any note", notes : Notes }) }
        return res.status(200).json({ success: true, message: "notes succesfully retrieved", notes: Notes })

    } catch (err) {
        console.error("Error fetching Note ", err)
        return (res.status(500).json({ success: false, message: "Internal Server Error" }), next(err))
    }
}


const NoteSearch = async (req, res, next) => {
    const userID = req.user_id;
    const { searchQuery } = req.query
    if (!searchQuery) { return res.status(400).json({ success: false, message: "supply search query" }) }
    try {
        const searchForNotes = await notes.findAll({ where: { user_id: userID, title: { [Op.like]: `%${searchQuery}%` } } })
        if (searchForNotes == '') { return res.status(404).json({ success: false, message: "no note  found", note: searchForNotes }) }
        return res.status(200).json({ success: true, message: "note sucesfully retrieved", note: searchForNotes })
    } catch (err) {
        console.error("Error fetching Note ", err)
        return (res.status(500).json({ success: false, message: "Internal Server Error" }), next(err));
    }
}

const readNote = async(req, res)=>{
    const userID = req.user_id;
    const  bookId  = parseInt(req.params.noteId);
    if(!bookId){ return res.status(400).json({ success : false, message : "please supply an id"})}

    try{
        const findnote = await notes.findAll({ where : { note_id : bookId, user_id : userID}})
        if(findnote==''){ return res.status(404).json({ success : false, message : "no note found", note : findnote})}
        return res.status(200).json({ success : true, message : "note retrieved succesfully", note : findnote})

    }catch(err){
        console.error("Error fetching Note ", err)
        return (res.status(500).json({ success: false, message: "Internal Server Error" }), next(err));
    }

}

const updateNote = async (req, res, next) => {
    const userID = req.user_id;
    const noteId = parseInt(req.params.noteId);
    const { title, note, image, } = req.body;

    try {
        if (!noteId) { return res.status(404).json({ success: false, message: "make sure you supply an id" }) }
        if(title && note && image){
            const Notes = await notes.update({ title: title, note: note, image: image }, { where: { note_id: noteId, user_id: userID } });
            const updatedNotes = await notes.findAll({ where: { user_id: userID } });
            if (!Notes) { return res.status(400).json({ success: false, message: "note was not updated" }) }
            return res.status(200).json({ success: true, message: "note succesfully updated", notes: updatedNotes })

        }else if(title && note){
            const Notes = await notes.update({ title: title, note: note}, { where: { note_id: noteId, user_id: userID } });
            const updatedNotes = await notes.findAll({ where: { user_id: userID } });
            if (!Notes) { return res.status(400).json({ success: false, message: "note was not updated" }) }
            return res.status(200).json({ success: true, message: "note succesfully updated", notes: updatedNotes })

        }else if(title){
            const Notes = await notes.update({ title: title}, { where: { note_id: noteId, user_id: userID } });
            const updatedNotes = await notes.findAll({ where: { user_id: userID } });
            if (!Notes) { return res.status(400).json({ success: false, message: "note was not updated" }) }
            return res.status(200).json({ success: true, message: "note succesfully updated", notes: updatedNotes })

        }else if(note){
            const Notes = await notes.update({ note: note }, { where: { note_id: noteId, user_id: userID } });
            const updatedNotes = await notes.findAll({ where: { user_id: userID } });
            if (!Notes) { return res.status(400).json({ success: false, message: "note was not updated" }) }
            return res.status(200).json({ success: true, message: "note succesfully updated", notes: updatedNotes });

        }else if(image){
            const Notes = await notes.update({ note: note }, { where: { note_id: noteId, user_id: userID } });
            const updatedNotes = await notes.findAll({ where: { user_id: userID } });
            if (!Notes) { return res.status(400).json({ success: false, message: "note was not updated" }) }
            return res.status(200).json({ success: true, message: "note succesfully updated", notes: updatedNotes });
            

        }
        return res.status(400).json({ success: false, message: "place set the row you would like to update" }) 

    } catch (err) {
        console.error("Error updating Note ", err)
        return (res.status(500).json({ success: false, message: "Internal Server Error" }), next(err))
    }
}

const deleteNote = async (req, res, next) => {
    const userID = req.user_id;
    const noteId = parseInt(req.params.noteId);

    try {
        if (!noteId) { return res.status(404).json({ success: false, message: "make sure you supply an id" }) }
        const Notes = notes.destroy({ where: { note_id: noteId, user_id: userID } })
        if (!Notes) { res.status(404).json({ success: false, message: "no note found" }) }
        const resultAfterDeletetion = await notes.findAll({ where: { user_id: userID } });
        if (!resultAfterDeletetion) { res.status(404).json({ success: false, message: "no note available" }) }
        return res.status(200).json({ success: true, message: "note succesfuly deleted", notes: resultAfterDeletetion });

    } catch (err) {
        console.error(err);
        return (res.status(500).json({ success: false, message: "Internal Server Error" }), next(err))
    }
}

module.exports = { createNote, listNotes, deleteNote, updateNote, NoteSearch, readNote, storage }