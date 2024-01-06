import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import {getAllFiles } from "../controllers/fileController.js"
import { protect, admin, limiter } from '../middleware/authMiddleware.js'

router.route('/').post(getAllFiles).get(limiter, getUsers)
router.post('/list', getAllFiles)
router
  .route('/list')
  .post(protect, getAllFiles)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
