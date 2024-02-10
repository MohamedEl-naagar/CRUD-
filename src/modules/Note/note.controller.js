// import dbConn from '../../../DB/connection.js';
import noteModel from '../../../DB/models/note.model.js';
import userModel from '../../../DB/models/user.model.js';



//============== GET All Notes ================
export const getAllNotes= async(req,res,next)=>{
    const notes = await noteModel.findAll()
    if(notes.length === 0){
      return res.json({msg:"No notes found"})
  }
  return res.json({notes: notes})
  
  }
//============== addNote ================
export const addNote =async(req,res,next)=>{
    const{titile,content} = req.body
    
    try{
        const newNote = await noteModel.create({titile,content})
        return res.json({msg:'added',newNote})
    }catch(error){
        if (error.original?.errno == 1062) {
            return res.status(400).json({ msg: 'Nore already exists!' });
        }
        return res.status(500).json({ msg: 'Internal Server Error' ,error,errorMessage:error.message, stack: error.stack});

    }
}

//============== Update ================
export  const Update =async (req, res) => {
    const { id,titile,content } = req.body;
  
    try {
      const exist = await noteModel.findOne({ where: { id } });
      console.log(exist);
      if (exist) {
        await noteModel.update(
          { titile,content },
          { where: { id } } // Correct usage of where clause
        );
        res.send('Update done....');
      } else {
        res.status(404).send('Note not found');
      }
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal Server Error',
        error: error.message,
        stack: error.stack
      });
    }
  };


//============== Delete ================
  export const deleteNote = async (req, res) => {
    const { id} = req.params;
  
    try {
      const exist = await noteModel.findOne({ where: { id} });
      if (exist) {
       const test = await noteModel.destroy({where: {id}})

          res.send(`Delete done....`)
        } else {res.status(404).send(`Note not found..`); }
        } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
    }
  };

//============== Notes & Owners ================
export const getNotesWithOwners = async (req, res, next) => {
  try {
    const notesWithOwners = await noteModel.findAll({
      include: [
        {
          model: userModel,
          attributes: ['name', 'email', 'age'],
        },
      ],
    });

    if (notesWithOwners.length === 0) {
      return res.json({ msg: "No notes found" });
    }

    return res.json({ notesWithOwners });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal Server Error',
      error: error.message,
      stack: error.stack,
    });
  }
};