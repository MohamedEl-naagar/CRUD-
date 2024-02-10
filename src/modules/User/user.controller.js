import userModel from '../../../DB/models/user.model.js';
import { Op } from 'sequelize';


//============== GET All Users ================
export const getAllUsers= async(req,res,next)=>{
    const users = await userModel.findAll()
    if(users.length === 0){
      return res.json({msg:"No users found"})
  }
  return res.json({users})
  
  }
//============== SignUP ================
export const SignUP =async(req,res,next)=>{
    const{name,email,password,age} = req.body
    
    try{
        const newUser = await userModel.create({name,email,password,age})
        return res.json({msg:'added',user:newUser})
    }catch(error){
        if (error.original?.errno == 1062) {
            return res.status(400).json({ msg: 'Email already exists!' });
        }
        return res.status(500).json({ msg: 'Internal Server Error' ,error,errorMessage:error.message, stack: error.stack});

    }
}

//============== SigIn ================
export const signIN =async (req, res) => {
    const { name,  password } = req.body;
  
    try {
      const exist = await userModel.findOne({ where: { name, password } });
  
      if (exist) {
        res.json(`Hello ${name}, make sure you have a great day!`);
        console.log({ msg: 'Hello', name });
      } else {
        return res.status(404).json({ msg: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
    }
  };

//============== Update ================
export  const Update =async (req, res) => {
    const { id, name, email, password, age } = req.body;
  
    try {
      const exist = await userModel.findOne({ where: { id } });
      console.log(exist);
      if (exist) {
        await userModel.update(
          { name, email, password, age },
          { where: { id } } // Correct usage of where clause
        );
        res.send('Update done....');
      } else {
        res.status(404).send('User not found');
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
  export const Delete = async (req, res) => {
    const { id} = req.params;
  
    try {
      const exist = await userModel.findOne({ where: { id} });
      if (exist) {
       const test = await userModel.destroy({where: {id}})

          res.send(`Delete done....`)
        } else {res.status(404).send(`User not found..`); }
        } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
    }
  };

//============== start with "a" and age less than 30 ================
  export const searchA =async (req, res) => {
    // const { id} = req.body;
  
    try {
      const exist = await userModel.findOne( {where: {
        name: {[Op.like]: 'a%'},
        age: {[Op.lt]: 30}
      }
    })
    if (exist) {
      res.send('User found....')
    } else {res.status(404).send('User not found'); }
  
  } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
    }
  };

  //============== between 20,30 ================
  export const searchB =async (req, res) => {

    try {
      const users = await userModel.findOne({ where: {
        age: {[Op.between]: [20, 30] }
      }
      });
      
      if (users.length > 0) {
      res.send('Users found...');
      } else {
      res.status(404).send('No users found');
      }
      
  
  } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
    }
  };


  //============== 3 oldest users ================
  export const searchC = async (req, res) => {

    try {
      const oldestUsers = await userModel.findAll({
        order: [['age', 'DESC']], // Order by age in descending order
        limit: 3 // Limit the result to 3 users
      });
    
      if (oldestUsers.length > 0) {
        res.json(oldestUsers);
      } else {
        res.status(404).send('No users found');
      }    
  
  } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
    }
  };
  
  //============== Search By IDS ================
  export const searchUsersByIds =async (req, res) => {
  
    try {
      const userIds = [38]; 
  
      const users = await userModel.findAll({
        where: {
          id: {
            [Op.in]: userIds // Using Sequelize's in operator
          }
        }
      });
  
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(404).send('No users found');
      }}catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error', error: error.message, stack: error.stack });
      }
    };