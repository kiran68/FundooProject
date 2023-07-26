import Note from '../models/note.model';

export const createNewNote = async (body) => {
  try {
    const data = await Note.create(body);
    return data;
  } catch (error) {
    throw new Error(`Failed to create the note: ${error.message}`);
  }
};



// export const getAllNotes = async () => {
//   try {
//     const data = await Note.find();
//     return data;
//   } catch (error) {
//     throw new Error(`Failed to fetch notes: ${error.message}`);
//   }
// };
// noteService.js


export const getAllNotes = async (userId) => {
  try {
    const data = await Note.find({ createdBy: userId });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch notes: ${error.message}`);
  }
};


export const getNoteById = async (id, createdBy) => {
  try {
    const data = await Note.findOne({ _id:id, createdBy: createdBy });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch note: ${error.message}`);
  }
};


// export const noteUpdateById = async (_id, body) => {
//   const updatedData = await Note.findByIdAndUpdate(_id, body);
//   if (!updatedData) {
//     throw new Error('Note does not exist');
//   }
//   return updatedData;
// };

export const noteUpdateById = async (id, body, createdBy) => {
  const updatedData = await Note.findOneAndUpdate({ _id: id, createdBy: createdBy }, body ,{new: true});
  console.log(updatedData);
  if (!updatedData) {
    throw new Error('Note does not exist');
  }
  return updatedData;
};





export const deleteNote = async (id, createdBy) => {
  const data = await Note.deleteOne({ _id: id, createdBy: createdBy });
  if (!data) {
    //if note is already deleted
    throw new Error('This Note does not exist ');
  }
  return 'note deleted succesfully';
};




// export const isArchiveNote = async (id,) => {
//   const note = await Note.findById(id);
//   if (!note) {
//     throw new Error('Provided invalid note id');
//   }
//   note.isArchive = !note.isArchive;
//   const updatedNote = await note.save();

//   return updatedNote;
// };

export const isArchiveNote = async (id, createdBy, isArchiveValue) => {
  const filter = { _id: id, createdBy: createdBy };
  const update = { isArchive: isArchiveValue };

  const updatedNote = await Note.findOneAndUpdate(filter, update, { new: true });

  if (!updatedNote) {
    throw new Error('Note does not exist or does not belong to the specified user');
  }

  return updatedNote;
};


export const isTrashNote = async (id, createdBy) => {
  const note = await Note.findOne({ _id: id, createdBy: createdBy });
  if (!note) {
    throw new Error('Note does not exist or does not belong to the specified user');
  }

  note.isTrash = !note.isTrash;
  const updatedNote = await note.save();

  return updatedNote;
};






