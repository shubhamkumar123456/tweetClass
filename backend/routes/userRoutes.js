const express = require('express');
const router = express.Router();

const {  updateUser, deleteUser, loginUser, register, getUserDetails, forgetPassword, getTokenMail, finalResetPassword, getUserByName, followUser, getUserbyId } = require('../controllers/userController');
const checkToken = require('../middleware/checkToken');

router.post('/create',register)
router.put('/update/:_id',checkToken,updateUser);
router.delete('/delete/:_id',checkToken,deleteUser);
router.post('/login',loginUser);
router.get('/getInfo',checkToken,getUserDetails);
router.post('/forget-password',forgetPassword);
router.get('/resetToken/:token',getTokenMail)
router.post('/resetToken/:token',finalResetPassword)
router.post('/searchFriend',getUserByName)
router.post('/follow/:friendId',checkToken,followUser)
router.get('/getUserById/:userId',getUserbyId)

module.exports = router;