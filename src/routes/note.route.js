import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';



const router = express.Router();

//create new notes
router.post('', noteValidator,userAuth,noteController.createNewNote);
// get  All Notes
router.get('',userAuth,noteController.getAllNotes);
// get note  by id 
router.get('/:id',userAuth, noteController.getNoteById);
// update note by id 
router.put('/:id', userAuth,noteController.noteUpdateById);
// delete note
router.delete('/:id', userAuth, noteController.deleteNote);
// //Archive Note by id
router.put('/:id/archive', userAuth, noteController.isArchiveNote);
// // Trash note by id 
router.put('/:id/trash', userAuth, noteController.isTrashNote);
// // //Archive Note by id
// router.put('/:id/unarchive', userAuth, noteController.isUnarchiveNote);
// // // Trash note by id 
// router.put('/:id/untrash', userAuth, noteController.isUntrashNote);








export default router;