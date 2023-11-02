const model = require('../../model/index')
const cloudinary = require('cloudinary').v2
const { Op } = require('sequelize')
const notes = model.note
require('dotenv').config()
const config = require('../../config/index')
const storage = config.cloudinaryConfig

const createNote = async (req, res) => {
  try {
    const userID = req.user_id
    const { title, note } = req.body
    const image = req.files.image ? req.files.image[0] : null
    const audio = req.files.audio ? req.files.audio[0] : null
    if (image && audio) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: 'auto'
      })
      const audioUpload = await cloudinary.uploader.upload(audio.path, {
        resource_type: 'auto'
      })
      const noteCreation = await notes.create({
        title,
        note,
        image: imageUpload.secure_url,
        audio_note: audioUpload.secure_url,
        created_at: new Date(),
        user_id: userID
      })
      return res.status(201).json({
        success: true,
        message: 'note created succesfully',
        note: noteCreation
      })
    } else if (image) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: 'auto'
      })
      const noteCreation = await notes.create({
        title,
        note,
        image: imageUpload.secure_url,
        audio_note: null,
        created_at: new Date(),
        user_id: userID
      })
      return res.status(201).json({
        success: true,
        message: 'note created succesfully',
        note: noteCreation
      })
    } else if (audio) {
      const audioUpload = await cloudinary.uploader.upload(audio.path, {
        resource_type: 'auto'
      })
      const noteCreation = await notes.create({
        title,
        note,
        image: null,
        audio_note: audioUpload.secure_url,
        created_at: new Date(),
        user_id: userID
      })
      return res.status(201).json({
        success: true,
        message: 'note created succesfully',
        note: noteCreation
      })
    } else {
      const noteCreation = await notes.create({
        title,
        note,
        image: null,
        audio_note: null,
        created_at: new Date(),
        user_id: userID
      })
      return res.status(201).json({
        success: true,
        message: 'note created succesfully',
        note: noteCreation
      })
    }
  } catch (err) {
    console.error('Error creating Note ', err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}



const listNotes = async (req, res) => {
  const userID = req.user_id

  try {
    const Notes = await notes.findAll({ where: { user_id: userID } })
    if (Notes.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'you do not have any note',
        notes: Notes
      })
    }
    return res.status(200).json({
      success: true,
      message: 'notes succesfully retrieved',
      notes: Notes
    })
  } catch (err) {
    console.error('Error fetching Note ', err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}



const NoteSearch = async (req, res) => {
  const userID = req.user_id
  const { searchQuery } = req.query
  if (!searchQuery) {
    return res
      .status(400)
      .json({ success: false, message: 'supply search query' })
  }
  try {
    const searchForNotes = await notes.findAll({
      where: { user_id: userID, title: { [Op.like]: `%${searchQuery}%` } }
    })
    if (searchForNotes.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'no note  found',
        note: searchForNotes
      })
    }
    return res.status(200).json({
      success: true,
      message: 'note sucesfully retrieved',
      note: searchForNotes
    })
  } catch (err) {
    console.error('Error fetching Note ', err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}



const readNote = async (req, res) => {
  const userID = req.user_id
  const bookId = parseInt(req.params.noteId)
  if (!bookId) {
    return res
      .status(400)
      .json({ success: false, message: 'please supply an id' })
  }

  try {
    const findnote = await notes.findAll({
      where: { note_id: bookId, user_id: userID }
    })
    if (findnote.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: 'you do not have any note', note: findnote })
    }
    return res.status(200).json({
      success: true,
      message: 'note retrieved succesfully',
      note: findnote
    })
  } catch (err) {
    console.error('Error fetching Note ', err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}

const updateNote = async (req, res) => {
  const userID = req.user_id
  const noteId = req.params.noteId 
  const { title, note } = req.body

  try {
    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, message: 'make sure you supply an id' })
    }
    const Notes = await notes.update(
      { title, note },
      { where: { note_id: noteId, user_id: userID } }
    )
    if (!Notes) {
      return res.status(400).json({ success: false, message: 'note not updated' })

    } else {
      res.status(200).json({ success: 'true', message: 'note successfully updated' })
    }
    return res.status(400).json({
      success: false,
      message: 'please set the fields you would like to update'
    })
  } catch (err) {
    console.error('Error updating Note ', err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}



// Delete Note
const deleteNote = async (req, res) => {
  const userID = req.user_id
  const noteId = parseInt(req.params.noteId)

  try {
    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, message: 'make sure you supply an id' })
    }
    const Notes = await notes.destroy({
      where: { note_id: noteId, user_id: userID }
    })

    if (Notes) {
      return res.status(200).json({
        success: true,
        message: 'note succesfuly deleted'
      })
    } else {
      return res.status(404).json({ success: false, message: 'no note found' })
    }
  } catch (err) {
    console.error(err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}


// User Trash
const trash = async (req, res) => {
  const userID = req.user_id
  try {
    const userTrash = await notes.findAll({
      where: { user_id: userID, destroyTime: { [Op.not]: null } },
      paranoid: false
    }) // Filter only soft Deleted rows
    if (userTrash.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'your trash is empty',
        notes: userTrash
      })
    }
    return res.status(200).json({
      success: true,
      message: 'trash notes succesfully retrieved',
      notes: userTrash
    })
  } catch (err) {
    console.error(err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}

// deleteFromTrash
const deleteFromTrash = async (req, res) => {
  const userID = req.user_id
  const noteId = parseInt(req.params.noteId)
  try {
    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, message: 'make sure you supply an id' })
    }
    const deleteItem = await notes.destroy({
      where: { note_id: noteId, user_id: userID },
      force: true
    })
    if (deleteItem) {
      return res
        .status(200)
        .json({ success: true, message: 'item deleted from trash' })
    }
    return res.status(404).json({ success: true, message: 'note not found' })
  } catch (err) {
    console.log(err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}

// Restore Trash
const restoreTrash = async (req, res) => {
  const userID = req.user_id
  const noteId = parseInt(req.params.noteId)
  try {
    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, message: 'make sure you supply an id' })
    }
    const restoreItemFromTrash = await notes.restore({
      where: { note_id: noteId, user_id: userID }
    })
    if (restoreItemFromTrash) {
      res.status(200).json({ success: true, message: 'deleted item restored' })
    }
    return res.status(200).json({ success: true, message: 'note not found' })
  } catch (err) {
    console.log(err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}

const emptyTrash = async (req, res) => {
  const userID = req.user_id
  try {
    const deleteItem = await notes.destroy({
      where: { user_id: userID, destroyTime: { [Op.not]: null } },
      force: true
    })
    if (deleteItem) {
      return res
        .status(200)
        .json({ success: true, message: 'trash emptied successfully' })
    }
    return res.status(200).json({ success: true, message: 'nothing in trash' })
  } catch (err) {
    console.log(err)
    return (
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    )
  }
}

module.exports = {
  createNote,
  listNotes,
  deleteNote,
  updateNote,
  NoteSearch,
  readNote,
  trash,
  deleteFromTrash,
  restoreTrash,
  emptyTrash,
  storage
}
