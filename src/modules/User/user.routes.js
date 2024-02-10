import { Router } from 'express';
import { getAllUsers,SignUP,signIN, Update,Delete,searchA,searchB,searchC,searchUsersByIds} from './user.controller.js'; 
const router = Router();

//============== GET All Users ================
router.get('/show',getAllUsers)
//============== SignUP =======================
router.post('/signup',SignUP)
//============== SigIn ========================
router.post('/signin', signIN)
//============== Update =======================
router.put('/update', Update)
//============== Delete =======================
router.delete('/deleteUser/:id',Delete)
//== start with "a" and age less than 30 ======
router.get('/searchA', searchA)
//============== between 20,30 ================
router.get('/searchB',searchB )
//============== 3 oldest users ===============
router.get('/searchC', searchC)
//============== Search By IDS ================
router.get('/searchUsersByIds', searchUsersByIds)

export default router