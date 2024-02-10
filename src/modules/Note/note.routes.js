import Router from "express";
const router = Router();

import{addNote,deleteNote,getAllNotes,getNotesWithOwners} from './note.controller.js'

router.post('/addNote',addNote)
router.delete('/deleteNote',deleteNote)
// router.put('/update',updateNote)
router.get('/show',getAllNotes)
router.get('/include',getNotesWithOwners)

export default router